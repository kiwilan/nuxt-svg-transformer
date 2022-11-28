import { fileURLToPath } from 'url'
import { addComponent, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import { Icons } from './icons'
import type { ModuleOptions } from './types'

const DEFAULTS: ModuleOptions = {
  root: false,
  assets: 'assets/icons',
  componentName: 'SvgIcon',
  lazy: true,
  reactive: false,
  autoTitle: true,
  fallback: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  log: true,
}

const parseIcons = async (options: ModuleOptions) => {
  let root = process.cwd()
  if (options.root)
    root += `/${options.root}`

  return await Icons.make({
    assets: `${root}/${options.assets}`,
    cache: `${root}/.nuxt/icons`,
    components: `${root}/.nuxt/icons/components.ts`,
  })
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'svgTransformer',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const icons = await parseIcons(options)

    nuxt.hook('builder:watch', async (event, path) => {
      if (path.startsWith(options.assets))
        await parseIcons(options)
    })

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addComponent({
      name: options.componentName,
      filePath: resolve(runtimeDir, 'component.vue'),
    })

    const list = {
      ...options,
      components: icons.getComponents(),
    }

    nuxt.options.alias['#svg-transformer-options'] = addTemplate({
      filename: 'svg-transformer-options.mjs',
      getContents: () => Object.entries(list).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    }).dst
  },
})

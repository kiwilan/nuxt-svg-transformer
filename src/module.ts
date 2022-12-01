import { fileURLToPath } from 'url'
import { existsSync, mkdirSync, rm, rmdirSync, writeFileSync } from 'fs'
import { addComponent, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import { Icons } from './tools/icons'
import { Utils } from './tools/utils'
import type { ModuleOptions, NuxtSvgTransformerModule } from './types'

const DEFAULTS: ModuleOptions = {
  assetsDir: 'assets/icons',
  autoTitle: true,
  componentName: 'SvgIcon',
  classDefault: undefined,
  clearClasses: false,
  clearSize: true,
  clearStyles: false,
  fallback: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: inherit; height: inherit;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  lazy: true,
  log: true,
  reactive: false,
  sizeInherit: false,
  styleDefault: undefined,
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
    const root = nuxt.options.rootDir

    const assetsPath = `${root}/${options.assetsDir}`
    const typeFile = 'svg-transformer.d.ts'
    const indexFile = 'svg-transformer-list.ts'
    const indexPath = `${nuxt.options.dir.assets}/${indexFile}`
    const opts: NuxtSvgTransformerModule = {
      ...options,
      root,
      assetsPath,
      svgPath: `${assetsPath}/svg`,
      cachePath: `${assetsPath}/cache`,
      typePath: `${nuxt.options.buildDir}/${typeFile}`,
      indexPath: `${root}/${indexPath}`,
      typeFile: `${typeFile}`,
      indexFile: `${indexFile}`,
      gitignores: [
        `${options.assetsDir}/cache`,
        `${indexPath}`,
      ],
    }

    if (!existsSync(opts.typePath)) {
      mkdirSync(nuxt.options.buildDir, { recursive: true })
      writeFileSync(opts.typePath, '')
    }

    await Icons.make(opts)
    const utils = Utils.make(opts)
    utils.ignoreFiles()

    nuxt.hook('builder:watch', async (event, path) => {
      if (path.startsWith(`${opts.assetsDir}/svg`))
        await Icons.make(opts)
    })

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addComponent({
      name: options.componentName,
      filePath: resolve(runtimeDir, 'component.vue'),
    })

    nuxt.options.alias['#svg-transformer-options'] = addTemplate({
      filename: 'svg-transformer-options.mjs',
      getContents: () => Object.entries(opts)
        .map(([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)}`)
        .join('\n'),
    }).dst
  },
})

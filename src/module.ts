import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { addComponent, addTemplate, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import { name, version } from '../package.json'
import { Icons } from './tools/icons'
import { Utils } from './tools/utils'
import type { Display, NuxtSvgTransformerModule } from './types'

const DEFAULTS: ModuleOptions = {
  assetsDir: 'assets/icons',
  componentName: 'SvgIcon',
  classDefault: undefined,
  clearClass: 'none',
  clearSize: 'none',
  clearStyle: 'none',
  display: 'inline-block',
  fallback: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: inherit; height: inherit;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  lazy: true,
  log: true,
  reactive: false,
  sizeInherit: false,
  styleDefault: undefined,
  title: false,
}

export interface ModuleOptions {
  /**
   * The path to the directory where SVG are stored. If directory is not found, it will be created.
   *
   * @default 'assets/icons'
   */
  assetsDir: string
  /**
   * Add default classes to all SVGs.
   *
   * @default undefined
   */
  classDefault?: string
  /**
   * Clear all classes from SVGs (can be just all, just parent or none).
   *
   * @default 'none'
   */
  clearClass: 'all' | 'parent' | 'none'
  /**
   * Clear native `width` and `height` attributes from SVGs (can be just all, just parent or none).
   *
   * @default 'none'
   */
  clearSize: 'all' | 'parent' | 'none'
  /**
   * Clear all native styles from SVGs (can be just all, just parent or none).
   *
   * @default 'none'
   */
  clearStyle: 'all' | 'parent' | 'none'
  /**
   * Name of the component to use in your application
   *
   * ```vue
   * <template>
   *  <SvgIcon name="github" />
   * </template>
   * ```
   *
   * @default 'SvgIcon'
   */
  componentName: string
  /**
   * Add `display` CSS to component.
   *
   * @default 'inline-block'
   */
  display: Display | false
  /**
   * Global options to toggle fallback icon.
   *
   * @default '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>'
   */
  fallback: string | false
  /**
   * Global option to toggle lazy icons, if disabled, hot reloading can have some issues.
   *
   * @default true
   */
  lazy: boolean
  /**
   * Global options to toggle logging if SVG not found.
   *
   * @default true
   */
  log: boolean
  /**
   * Global options to toggle reactive icons.
   *
   * @default false
   */
  reactive: boolean
  /**
   * Global options to toggle size inheritance, inline `style` `height: inherit; width: inherit;`.
   *
   * @default false
   */
  sizeInherit: boolean
  /**
   * Add default styles to all SVGs.
   *
   * @default undefined
   */
  styleDefault?: string
  /**
   * Global options to toggle title attribute on icon based on SVG filename. If you set `title` on any `SvgIcon` component, it will override this option.
   *
   * @default false
   */
  title: boolean
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
    const root = nuxt.options.srcDir

    const assetsPath = `${root}/${options.assetsDir}`
    const typeFile = 'svg-transformer.d.ts'
    const indexFile = 'svg-transformer-list.ts'
    const indexPath = `${nuxt.options.dir.assets}/${indexFile}`
    // const indexPath = `${indexFile}`

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

    const resolver = createResolver(import.meta.url)

    addComponent({
      name: options.componentName,
      filePath: resolver.resolve('./runtime/component.vue'),
    })

    nuxt.options.alias['#svg-transformer-options'] = addTemplate({
      filename: 'svg-transformer-options.mjs',
      getContents: () => Object.entries(opts)
        .map(([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)}`)
        .join('\n'),
    }).dst

    extendViteConfig((config) => {
      config.server = config.server || {}
      config.server.fs = config.server.fs || {}
      config.server.fs.allow = config.server.fs.allow || []
      config.server.fs.allow.push('..')
      config.server.fs.allow.push('../..')
    })
  },
})

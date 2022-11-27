import { fileURLToPath } from 'url'
import { addComponent, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import { Icons } from './icons'

export interface ModuleOptions {
  /**
   * The root of application. Use `false` if your nuxt app is in the root of your project.
   *
   * @default false
   * @example 'playground'
   */
  root: string | false
  /**
   * Customizable paths for icons.
   */
  paths: {
    /**
     * The path to the directory where SVG are stored. If directory is not found, it will be created.
     *
     * @default 'assets/icons'
     */
    assets: string
    /**
     * The path to the directory where generated icon components are stored. If directory is not found, it will be created. You could ignore this directory from version control.
     *
     * @default 'components/icons'
     */
    cache: string
    // /**
    //  * The path to the directory where types will be injected. If directory is not found, it will be created.
    //  *
    //  * @default '.nuxt/icons/index.d.ts'
    //  */
    // type: string
  }
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
  // /**
  //  * Global option to toggle lazy icons.
  //  *
  //  * @default true
  //  */
  // lazy: boolean
  /**
   * Global options to toggle reactive icons.
   *
   * @default false
   */
  reactive: boolean
  /**
   * Global options to toggle auto-title attribute from SVG filename. If you set `title` on any `SvgIcon` component, it will override this option.
   *
   * @default true
   */
  autoTitle: boolean
  /**
   * Global options to toggle fallback icon.
   *
   * @default '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>'
   */
  fallback: string | false
  /**
   * Global options to toggle logging if SVG not found.
   *
   * @default true
   */
  log: boolean
}

const DEFAULTS: ModuleOptions = {
  root: false,
  paths: {
    assets: 'assets/icons',
    cache: 'components/icons',
    // type: '.nuxt/icons/index.d.ts',
  },
  componentName: 'SvgIcon',
  // lazy: true,
  reactive: false,
  autoTitle: true,
  fallback: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  log: true,
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
  setup(options, nuxt) {
    let root = process.cwd()
    if (options.root)
      root += `/${options.root}`

    const icons = Icons.make({
      assets: `${root}/${options.paths.assets}`,
      cache: `${root}/${options.paths.cache}`,
      type: `${root}/.nuxt/icons/index.d.ts`,
      components: `${root}/.nuxt/icons/components.ts`,
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
      lazy: true,
      components: icons.components,
    }

    nuxt.options.alias['#svg-transformer-options'] = addTemplate({
      filename: 'svg-transformer-options.mjs',
      getContents: () => Object.entries(list).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    }).dst
  },
})

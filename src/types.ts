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
  clearClasses: 'all' | 'parent' | 'none'
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
  clearStyles: 'all' | 'parent' | 'none'
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
   * Global options to toggle fallback icon.
   *
   * @default '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>'
   */
  fallback: string | false
  /**
   * Add `display: inline-block` to component.
   *
   * @default true
   */
  inlineBlock: boolean
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

export interface Paths {
  assetsDir: string
  cacheDir: string
  appDir: string
  cacheFile: string
  gitignore: string
}

export interface NuxtSvgTransformerModule extends ModuleOptions {
  root: string
  assetsPath: string
  svgPath: string
  cachePath: string
  typePath: string
  indexPath: string
  typeFile: string
  indexFile: string
  gitignores: string[]
  config?: any
}


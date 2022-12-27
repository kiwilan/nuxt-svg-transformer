import type { ModuleOptions } from './module'

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

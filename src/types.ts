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

export type Display = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'flow-root' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset' | 'table' | 'table-row' | 'list-item'

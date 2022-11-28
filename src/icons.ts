import { createWriteStream, existsSync, mkdirSync, readFileSync, rmSync } from 'fs'
import type { File } from './reader'
import Reader from './reader'
import Svg from './svg'
import type { ModuleOptions } from './types'

interface Paths {
  assets: string
  cache: string
  components: string
}

/**
 * Parse SVG to convert to TS files and generate type.
 */
export class Icons {
  private paths: Paths
  private options: ModuleOptions
  private files: File[] = []
  private types = 'export type IconType = '
  private components: string[] = []

  private constructor(paths: Paths, options: ModuleOptions) {
    this.paths = paths
    this.options = options
  }

  public getComponents(): string[] {
    return this.components
  }

  /**
   * Create a new instance of `Icons`.
   */
  public static async make(options: ModuleOptions): Promise<Icons> {
    let root = process.cwd()
    if (options.root)
      root += `/${options.root}`
    const paths: Paths = {
      assets: `${root}/${options.assets}`,
      cache: `${root}/.nuxt/icons`,
      components: `${root}/.nuxt/icons/components.ts`,
    }
    const icons = new Icons(paths, options)

    icons.createPaths()
    icons.files = await icons.sync()

    icons.types = icons.setTypes()
    icons.convertSvg()

    return icons
  }

  /**
   * Read all SVG recursively into `paths.assets` and return a list of files.
   */
  private async sync(): Promise<File[]> {
    const reader = await Reader.make(this.paths.assets, 'svg')
    return reader.getFilesList()
  }

  /**
   * Convert SVG to TS files.
   */
  private convertSvg(): void {
    this.files.forEach((file) => {
      const stream = createWriteStream(`${this.paths.cache}/${file.filename}.ts`)
      stream.once('open', () => {
        const svg = Svg.make(this.options, file.path)
        stream.write(`const ${file.camelCase} = '${svg.getContent()}'\n`)
        stream.write(`export default ${file.camelCase}\n`)
        stream.end()
      })
    })
  }

  /**
   * Prepare type `IconType` for TS file.
   */
  private setTypes(): string {
    let types = this.types
    this.files.forEach((file) => {
      types += `'${file.name}' | `
    })
    types = types.slice(0, -3)

    const stream = createWriteStream(this.paths.components)
    stream.once('open', () => {
      // Write type `IconType` to TS file.
      stream.write(`${this.types}\n\n`)
      // Write all SVG to TS file.
      stream.write('export const IconList: Record<IconType,Promise<{default: string}>> = {\n')
      this.files.forEach((file) => {
        stream.write(`  '${file.name}': import('./${file.filename}'),\n`)
      })
      stream.write('}\n')
      stream.end()
    })

    return types
  }

  /**
   * Create paths if not exists, delete cache to refresh SVG.
   */
  private createPaths(): void {
    if (!existsSync(this.paths.assets))
      mkdirSync(this.paths.assets, { recursive: true })

    if (existsSync(this.paths.cache))
      rmSync(this.paths.cache, { force: true, recursive: true })

    mkdirSync(this.paths.cache, { recursive: true })
  }
}

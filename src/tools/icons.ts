import { appendFile, createWriteStream, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import type { NuxtSvgTransformerModule } from '../types'
import type { File } from './reader'
import Reader from './reader'
import Svg from './svg'

/**
 * Parse SVG to convert to TS files and generate type.
 */
export class Icons {
  private options: NuxtSvgTransformerModule
  private files: File[] = []
  private types = ''
  private config: string[] = []

  private constructor(options: NuxtSvgTransformerModule) {
    this.options = options
  }

  public getFiles(): File[] {
    return this.files
  }

  public getConfig(): string[] {
    return this.config
  }

  public getTypes(): string {
    return this.types
  }

  /**
   * Create a new instance of `Icons`.
   */
  public static async make(options: NuxtSvgTransformerModule): Promise<Icons> {
    const icons = new Icons(options)

    icons.createPaths()
    icons.files = await icons.sync()
    icons.convertSvg()
    icons.setTypes()

    return icons
  }

  /**
   * Read all SVG recursively into `paths.assetsDir` and return a list of files.
   */
  private async sync(): Promise<File[]> {
    const reader = await Reader.make(this.options.absolutePaths.assetsDir, 'svg')
    return reader.getFilesList()
  }

  /**
   * Convert SVG to TS files.
   */
  private convertSvg(): void {
    this.files.forEach((file) => {
      const stream = createWriteStream(`${this.options.relativePaths.cacheDir}/${file.slug}.ts`)
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
  public setTypes(): string {
    let types = this.types
    this.files.forEach((file) => {
      types += `'${file.typed}' | `
    })
    types = types.slice(0, -3)
    this.types = types

    const stream = createWriteStream(this.options.relativePaths.cacheFile)
    stream.once('open', () => {
      stream.write(`export type IconType = ${types}\n`)
      stream.write('\n')
      stream.write('export const IconList: Record<IconType,Promise<{default:string}>> = {\n')
      this.files.forEach((file) => {
        stream.write(`  '${file.typed}': import('./${this.options.paths.cacheDir}/${file.slug}'),\n`)
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
    if (!existsSync(this.options.paths.assetsDir))
      mkdirSync(this.options.paths.assetsDir, { recursive: true })

    if (existsSync(this.options.relativePaths.cacheDir))
      rmSync(this.options.relativePaths.cacheDir, { force: true, recursive: true })

    mkdirSync(this.options.relativePaths.cacheDir, { recursive: true })
  }
}

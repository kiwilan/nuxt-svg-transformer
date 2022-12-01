import { createWriteStream, existsSync, mkdirSync, rm, rmdirSync } from 'fs'
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
    await icons.convertSvg()
    icons.setTypes()

    return icons
  }

  /**
   * Read all SVG recursively into `paths.assetsDir` and return a list of files.
   */
  private async sync(): Promise<File[]> {
    const reader = await Reader.make(`${this.options.svgPath}`, 'svg')
    return reader.getFilesList()
  }

  /**
   * Convert SVG to TS files.
   */
  private async convertSvg(): Promise<void> {
    mkdirSync(this.options.cachePath, { recursive: true })
    this.files.forEach((file) => {
      const stream = createWriteStream(`${this.options.cachePath}/${file.slug}.ts`)
      stream.once('open', () => {
        const svg = Svg.make(this.options, file.path)
        stream.write(`const ${file.camelCase} = '${svg.getContent()}'\n`)
        stream.write(`export default ${file.camelCase}\n`)
        stream.end()
      })
    })

    const cacheFiles = await Reader.make(this.options.cachePath, 'ts')
    const files = this.files.map(file => file.filename)
    cacheFiles.getFilesList().forEach((file) => {
      if (!files.includes(file.filename))
        rm(`${this.options.cachePath}/${file.slug}.ts`, () => {})
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
    if (!types) {
      // eslint-disable-next-line @typescript-eslint/quotes
      types = "'no-svg'"
    }
    this.types = types

    const streamType = createWriteStream(`${this.options.typePath}`)
    streamType.once('open', () => {
      streamType.write(`export type IconType = ${types}\n`)
      streamType.write('\n')
      streamType.end()
    })

    const streamList = createWriteStream(`${this.options.indexPath}`)
    streamList.once('open', () => {
      const typeFile = this.options.typeFile.replace('.d.ts', '')
      streamList.write(`import type { IconType } from '~~/.nuxt/${typeFile}'\n`)
      streamList.write('export const IconList: Record<IconType,Promise<{default:string}>> = {\n')
      this.files.forEach((file) => {
        streamList.write(`  '${file.typed}': import('../${this.options.assetsDir}/cache/${file.slug}'),\n`)
      })
      streamList.write('}\n')
      streamList.end()
    })

    return types
  }

  /**
   * Create paths if not exists, delete cache to refresh SVG.
   */
  private createPaths(): void {
    const assets = `${this.options.root}/assets`
    if (!existsSync(assets))
      mkdirSync(assets, { recursive: true })

    if (!existsSync(this.options.assetsPath))
      mkdirSync(this.options.assetsPath, { recursive: true })

    if (!existsSync(this.options.svgPath))
      mkdirSync(this.options.svgPath, { recursive: true })

    if (!existsSync(this.options.cachePath))
      mkdirSync(this.options.cachePath, { recursive: true })
  }
}

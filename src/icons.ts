import { createWriteStream, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'fs'
import type { File } from './reader'
import Reader from './reader'

interface Paths {
  assets: string
  // cache: string
  // type: string
  components: string
}

export class Icons {
  public paths: Paths
  public files: File[] = []
  public types = 'export type IconType = '
  public components: string[] = []

  constructor(paths: Paths) {
    this.paths = paths
  }

  public static async make(paths: Paths): Promise<Icons> {
    const icons = new Icons(paths)
    icons.setPaths()
    await icons.sync()
    icons.convert()

    return icons
  }

  public async sync() {
    const reader = await Reader.make(this.paths.assets, 'svg')
    this.files = reader.getFilesList()
  }

  public convert(): void {
    this.setTypes()

    const stream = createWriteStream(this.paths.components)
    stream.once('open', () => {
      stream.write(`${this.types}\n\n`)
      stream.write('export const IconList: Record<IconType,string> = {\n')
      this.files.forEach((file) => {
        const content = readFileSync(file.path, 'utf8')
        let svg = content.replace(/^ +/gm, '')
        svg = svg.replace(/[\r\n]/gm, ' ')
        stream.write(`  '${file.slug}': '${svg}',\n`)
      })
      stream.write('}\n')
      stream.end()
    })
  }

  private setTypes(): void {
    this.files.forEach((file) => {
      this.types += `'${file.slug}' | `
    })
    this.types = this.types.slice(0, -3)
  }

  private setPaths(): void {
    const componentsPaths = this.paths.components.split('/')
    componentsPaths.pop()
    const componentsPath = componentsPaths.join('/')

    if (!existsSync(this.paths.assets))
      mkdirSync(this.paths.assets, { recursive: true })

    if (existsSync(componentsPath))
      rmSync(componentsPath, { force: true, recursive: true })

    mkdirSync(componentsPath, { recursive: true })
  }
}

import { createWriteStream, existsSync, mkdirSync, readFileSync, readdirSync } from 'fs'

interface Paths {
  assets: string
  // cache: string
  // type: string
  components: string
}
interface File {
  name: string
  path: string
}

export class Icons {
  public paths: Paths
  public files: File[] = []
  public types = 'export type IconType = '
  public components: string[] = []

  constructor(paths: Paths) {
    this.paths = paths
  }

  public static make(paths: Paths): Icons {
    const icons = new Icons(paths)
    icons.setPaths()
    icons.sync()
    icons.convert()

    return icons
  }

  public sync(): void {
    readdirSync(`${this.paths.assets}`).forEach((file) => {
      const extension = file.split('.').pop()
      if (extension === 'svg') {
        this.files.push({
          name: file.split('.').slice(0, -1).join('.'),
          path: `${this.paths.assets}/${file}`,
        })
      }
    })
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
        stream.write(`  ${file.name}: '${svg}',\n`)
      })
      stream.write('}\n')
      stream.end()
    })
  }

  private setTypes(): void {
    this.files.forEach((file) => {
      this.types += `'${file.name}' | `
    })
    this.types = this.types.slice(0, -3)
  }

  private setPaths(): void {
    mkdirSync(this.paths.assets, { recursive: true })
    mkdirSync(this.paths.components, { recursive: true })
  }
}

import { createWriteStream, existsSync, mkdirSync, readFileSync, readdirSync } from 'fs'

interface Paths {
  assets: string
  cache: string
  type: string
}
interface File {
  name: string
  path: string
}

export class Icons {
  public paths: Paths
  public files: File[] = []
  public types = 'export type Icon = '

  constructor(paths: Paths) {
    this.paths = paths
  }

  public static make(paths: Paths): void {
    const icons = new Icons(paths)
    icons.setPaths()
    icons.sync()
    icons.convert()
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
    this.files.forEach((file) => {
      this.types += `'${file.name}' | `
      const stream = createWriteStream(`${this.paths.cache}/${file.name}.vue`)
      stream.once('open', () => {
        const content = readFileSync(file.path, 'utf8')
        stream.write('<template>\n')
        stream.write(content)
        stream.write('</template>\n')
        stream.end()
      })
    })

    this.types = this.types.slice(0, -3)
    const stream = createWriteStream(this.paths.type)
    stream.once('open', () => {
      stream.write(this.types)
      stream.end()
    })
  }

  private setPaths(): void {
    mkdirSync(this.paths.assets, { recursive: true })
    mkdirSync(this.paths.cache, { recursive: true })
  }
}

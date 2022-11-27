import { resolve } from 'path'
import { readdir } from 'fs/promises'

export interface File {
  name: string
  slug: string
  path: string
}

export default class Reader {
  private directory: string
  private extension: string
  private files: string[] = []
  private filesList: File[] = []

  constructor(directory: string, extension: string) {
    this.directory = directory
    this.extension = extension
  }

  public static async make(dir: string, ext: string): Promise<Reader> {
    const reader = new Reader(dir, ext)
    reader.files = await reader.getFiles(reader.directory)

    return reader
  }

  public getFilesList(): File[] {
    this.files.forEach((file) => {
      const extension = file.split('.').pop()
      if (extension === this.extension) {
        let current = file.replace(this.directory, '')
        current = current.substring(1)

        let fullName = current.replace('/', '-')
        fullName = fullName.replace(`.${this.extension}`, '')

        this.filesList.push({
          name: fullName,
          slug: this.slugify(fullName),
          path: file,
        })
      }
    })

    return this.filesList
  }

  private slugify(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  private async getFiles(dir: string): Promise<string[]> {
    const dirents = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? this.getFiles(res) : res
    }))
    return Array.prototype.concat(...files)
  }
}

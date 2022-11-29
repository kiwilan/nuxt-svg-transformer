import { resolve } from 'path'
import { readdir } from 'fs/promises'

export interface File {
  name: string
  filename: string
  typed: string
  slug: string
  camelCase: string
  path: string
}

/**
 * Read all files recursively into `dir` and return a list of files.
 */
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
    reader.filesList = reader.setFilesList()

    return reader
  }

  /**
   * Return `File[]`.
   */
  public getFilesList(): File[] {
    return this.filesList
  }

  private setFilesList(): File[] {
    const filesList: File[] = []
    this.files.forEach((file) => {
      const extension = file.split('.').pop()
      if (extension === this.extension) {
        let current = file.replace(this.directory, '')
        current = current.substring(1)

        let fullName = current.replace('/', '-')
        fullName = current.replace(`.${this.extension}`, '')

        filesList.push({
          name: fullName,
          filename: fullName.replace('/', '-'),
          typed: fullName.replace(' ', '-'),
          slug: this.slugify(fullName),
          camelCase: this.camalize(fullName),
          path: file,
        })
      }
    })

    return filesList
  }

  /**
   * Camelcase a string.
   */
  private camalize(str: string): string {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  }

  /**
   * Slugify a string.
   */
  private slugify(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '-')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '-')
  }

  /**
   * Read all files recursively into `dir`.
   */
  private async getFiles(dir: string): Promise<string[]> {
    const dirents = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? this.getFiles(res) : res
    }))
    return Array.prototype.concat(...files)
  }
}

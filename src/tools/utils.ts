import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs'
import type { NuxtSvgTransformerModule } from '../types'

export class Utils {
  private constructor(
    private options: NuxtSvgTransformerModule,
    private cacheFile = '',
  ) {
    this.cacheFile = `${this.options.cacheFile}.ts`
  }

  public static make(options: NuxtSvgTransformerModule): Utils {
    const utils = new Utils(options)

    return utils
  }

  public ignoreFiles() {
    if (!existsSync(this.options.paths.gitignore))
      writeFileSync(this.options.paths.gitignore, '')

    this.addToFile(this.options.relativePaths.gitignore, `\n${this.options.paths.cacheDir}\n`)

    const cacheFile = this.options.paths.appDir
      ? `${this.options.paths.appDir}/${this.cacheFile}`
      : this.cacheFile
    this.addToFile(this.options.relativePaths.gitignore, `\n${cacheFile}\n`)
  }

  private addToFile(path: string, content: string): void {
    const inputData = readFileSync(path).toString()
    if (!inputData.includes(content))
      appendFileSync(path, content)
  }
}

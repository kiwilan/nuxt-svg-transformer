import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs'
import type { NuxtSvgTransformerModule } from '../types'

export class Utils {
  private constructor(
    private options: NuxtSvgTransformerModule,
  ) {
  }

  public static make(options: NuxtSvgTransformerModule): Utils {
    const utils = new Utils(options)

    return utils
  }

  public ignoreFiles() {
    const gitignorePath = `${this.options.root}/.gitignore`
    if (!existsSync(gitignorePath))
      writeFileSync(gitignorePath, '')

    this.options.gitignores.forEach((element) => {
      this.addToFile(gitignorePath, `\n${element}\n`)
    })
  }

  private addToFile(path: string, content: string): void {
    const inputData = readFileSync(path).toString()
    if (!inputData.includes(content))
      appendFileSync(path, content)
  }
}

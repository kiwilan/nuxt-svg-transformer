import { readFileSync } from 'fs'
import type { ModuleOptions } from './types'

type Attribute = 'style' | 'class' | 'width' | 'height'

export default class Svg {
  private options: ModuleOptions
  private path: string
  private content = ''

  private constructor(options: ModuleOptions, path: string) {
    this.options = options
    this.path = path
  }

  public getContent(): string {
    return this.content
  }

  public static make(options: ModuleOptions, path: string): Svg {
    const svg = new Svg(options, path)
    svg.content = svg.setSvg(path)

    return svg
  }

  private setSvg(path: string): string {
    const content = readFileSync(path, 'utf8')
    let svg = content.replace(/^ +/gm, '')
    svg = svg.replace(/[\r\n]/gm, ' ')

    const currentStyle = this.extractAttribute(svg, 'style')
    const currentClass = this.extractAttribute(svg, 'class')

    let style = ''
    let classes = ''

    svg = this.clearAttribute(svg, 'style')
    svg = this.clearAttribute(svg, 'class')
    if (this.options.clearSize) {
      svg = this.clearAttribute(svg, 'width')
      svg = this.clearAttribute(svg, 'height')
    }

    if (this.options.sizeInherit)
      style += 'height: inherit; width: inherit;'

    if (this.options.styleDefault)
      style += `${this.options.styleDefault}`

    if (this.options.classDefault)
      classes += `${this.options.classDefault} `

    if (!this.options.clearStyles)
      style += `${currentStyle}`

    if (!this.options.clearClasses)
      classes += `${currentClass} `

    svg = svg.replace('<svg', `<svg style="${style}" class="${classes}"`)

    return svg
  }

  private extractAttribute(svg: string, type: Attribute): string {
    let regExp: RegExp | undefined

    switch (type) {
      case 'class':
        regExp = /class=["']?([a-zA-Z0-9 :\-#()._;',\s\n\r&]+);?["']/g
        break

      case 'style':
        regExp = /style=["']?([a-zA-Z0-9 :\-#()._;',\s\n\r&]+);?["']/g
        break

      case 'width':
        regExp = /width=["']?([a-zA-Z0-9 :\-#()._;',\s\n\r&]+);?["']/g
        break

      case 'height':
        regExp = /height=["']?([a-zA-Z0-9 :\-#()._;',\s\n\r&]+);?["']/g
        break

      default:
        break
    }

    if (!regExp)
      return ''

    const matches = svg.match(regExp)
    if (matches) {
      let current = matches[0]
      current = current.replace(`${type}="`, '')
      current = current.substring(0, current.length - 1)
      return current.trim()
    }

    return ''
  }

  private clearAttribute(svg: string, type: Attribute): string {
    let regExp: RegExp | undefined

    switch (type) {
      case 'class':
        regExp = /(class=\"[^\"]*\")/g
        break

      case 'style':
        regExp = /(style=\"[^\"]*\")/g
        break

      case 'width':
        regExp = /(width=\"[^\"]*\")/g
        break

      case 'height':
        regExp = /(height=\"[^\"]*\")/g
        break

      default:
        break
    }

    if (!regExp)
      return svg

    return svg.replace(regExp, '')
  }
}

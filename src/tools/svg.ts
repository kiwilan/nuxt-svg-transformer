import { readFileSync } from 'fs'
import type { ModuleOptions } from '../types'

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

    const matches = svg.match(/(<[^>]+>|[^<]+)/g)
    let filter: string[] = []
    if (matches)
      filter = matches.filter(n => n !== ' ')
    else
      filter = [svg]

    const currentStyle = this.extractAttribute(svg, 'style')
    const currentClass = this.extractAttribute(svg, 'class')

    let style = ''
    let classes = ''

    let svgRender = this.clearAttributeOption(filter, this.options.clearSize, 'width')
    svgRender = this.clearAttributeOption(svgRender, this.options.clearSize, 'height')
    svgRender = this.clearAttributeOption(svgRender, this.options.clearClass, 'class')
    svgRender = this.clearAttributeOption(svgRender, this.options.clearStyle, 'style')

    svgRender = this.clearStyleAndClassParent(svgRender)

    svg = svgRender.join('')

    // Set `width` and `height` `inherit` attributes
    if (this.options.sizeInherit)
      style += 'height: inherit; width: inherit;'

    // Set default global style from options
    if (this.options.styleDefault)
      style += `${this.options.styleDefault}`

    // Set default global class from options
    if (this.options.classDefault)
      classes += `${this.options.classDefault} `

    // If option `clearStyles` if `none` then set current style
    if (this.options.clearStyle === 'none')
      style += `${currentStyle}`

    // If option `clearClasses` if `none` then set current class
    if (this.options.clearClass === 'none')
      classes += `${currentClass} `

    svg = svg.replace('<svg', `<svg style="${style}" class="${classes}"`)
    svg = svg.replace(' " ', '" ') // Remove space before `"`
    svg = svg.replace(/\s{2,}/g, ' ') // Remove double spaces
    svg = svg.replace('> <', '><') // Remove space between `>` and `<`

    return svg
  }

  private clearStyleAndClassParent(filter: string[]): string[] {
    let parent = filter[0]

    parent = this.clearAttribute(parent, 'class')
    filter[0] = parent

    parent = this.clearAttribute(parent, 'style')
    filter[0] = parent

    return filter
  }

  private clearAttributeOption(filter: string[], option: 'all' | 'parent' | 'none', attr: Attribute): string[] {
    const svgRender: string[] = []

    if (option === 'all') {
      filter.forEach((element) => {
        svgRender.push(this.clearAttribute(element, attr))
      })
      filter = svgRender
    }

    if (option === 'parent') {
      let parent = filter[0]
      parent = this.clearAttribute(parent, attr)

      filter[0] = parent
    }

    return filter
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
        regExp = /( class=\"[^\"]*\")/g
        break

      case 'style':
        regExp = /( style=\"[^\"]*\")/g
        break

      case 'width':
        regExp = /( width=\"[^\"]*\")/g
        break

      case 'height':
        regExp = /( height=\"[^\"]*\")/g
        break

      default:
        break
    }

    if (!regExp)
      return svg

    return svg.replace(regExp, '')
  }
}

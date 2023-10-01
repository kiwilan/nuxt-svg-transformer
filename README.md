# Nuxt SVG transformer

> [!IMPORTANT]
>
> This repository is now deprecated in favor of [`unplugin-svg-transformer`](https://github.com/kiwilan/unplugin-svg-transformer), the successor of `nuxt-svg-transformer`. Please consider to use `unplugin-svg-transformer` instead.

A **Nuxt 3** module to manage SVG as icons, transform SVG to inject dynamically into Vue component, type included.

- [📖 &nbsp;Read the documentation](https://github.com/kiwilan/unplugin-svg-transformer#readme)

## Features

- [**Nuxt 3**](https://nuxt.com) support
- 🔎 Vue component ready with `SvgIcon`
- 🔥 Hot reloading when SVG updated
- 🤙🏻 Reactivity option
- 🗂 Seperated index SVG files
- 📦 No import needed, SVG directly injected
- 🎨 Options to add or clear `style` and `class` global attributes
- 🦾 SVG typed, validate by `name` prop (`typescript` required)

## Migration to `unplugin-svg-transformer`

Breaking changes:

- Cache directory is now hidden by default
- Works with `unplugin`
- Options:
  - `fallback` option is now `string`
  - `componentName` removed (`SvgIcon` is now the default for Vue/Nuxt/React components)
  - `assetsDir` is now `svgDir` and should contains only your SVG files
  - `lazy` removed
  - `log` is now `warning`
  - `display` removed, use `svg` group `inlineStyleDefault` instead
  - `reactive` removed, use `reactive` prop on Vue/Nuxt component instead (React component is always reactive)
  - New option `svg` group `classDefault`, `clearClass`, `clearSize`, `clearStyle`, `sizeInherit`, `inlineStyleDefault`, `title`, `currentColor`
  - `styleDefault` is now `inlineStyle` into `svg` group
  - `inlineStyle` is now `inlineStyleDefault`
  - `classDefault` and `inlineStyleDefault` are now `string[]`

## Usage

This documentation offer to install [`unplugin-svg-transformer`](https://github.com/kiwilan/unplugin-svg-transformer) instead `nuxt-svg-transformer` (deprecated), you can use the same options.

```bash
npm i unplugin-svg-transformer --save-dev
# or
yarn add unplugin-svg-transformer --dev
# or
pnpm add unplugin-svg-transformer -D
```

Add it to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    "unplugin-svg-transformer/nuxt", // https://github.com/kiwilan/unplugin-svg-transformer
  ],
  svgTransformer: {
    // Options
  },
});
```

See [documentation](https://github.com/kiwilan/unplugin-svg-transformer#readme).

## License

[MIT](./LICENSE) - Made with 💚

[<img src="https://user-images.githubusercontent.com/48261459/201463225-0a5a084e-df15-4b11-b1d2-40fafd3555cf.svg" height="120rem" width="100%" />](https://github.com/kiwilan)

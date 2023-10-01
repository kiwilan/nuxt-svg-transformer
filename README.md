# Nuxt SVG transformer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-version-src]][nuxt-version-href]

> [!IMPORTANT]
>
> This repository is now a drone of [`unplugin-svg-transformer`](https://github.com/kiwilan/unplugin-svg-transformer), the successor of `nuxt-svg-transformer`. To avoid too many changements for users, the `nuxt-svg-transformer` will receive only Nuxt version of `unplugin-svg-transformer` and will be deprecated in the future. Please consider to use `unplugin-svg-transformer` instead.

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

## Usage

> **Warning**
>
> This configuration will be deprecated in the future. Please consider to use [`unplugin-svg-transformer`](https://github.com/kiwilan/unplugin-svg-transformer) instead.

Install the module:

```bash
npm i nuxt-svg-transformer --save-dev
# or
yarn add nuxt-svg-transformer --dev
# or
pnpm add nuxt-svg-transformer -D
```

Add it to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    "nuxt-svg-transformer", // https://github.com/kiwilan/nuxt-svg-transformer
  ],
  svgTransformer: {
    // Options
  },
});
```

### unplugin

```bash
npm i unplugin-svg-transformer --save-dev
# or
yarn add unplugin-svg-transformer --dev
# or
pnpm add unplugin-svg-transformer -D
```

If you use [`unplugin-svg-transformer`](https://github.com/kiwilan/unplugin-svg-transformer) instead, you can use the same options.

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

[nuxt-version-src]: https://img.shields.io/static/v1?label=Nuxt&message=v3&color=28cf8d&logo=nuxt.js&logoColor=ffffff&labelColor=18181b
[nuxt-version-href]: https://npmjs.com/package/nuxt-svg-transformer
[npm-version-src]: https://img.shields.io/npm/v/nuxt-svg-transformer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-svg-transformer
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-svg-transformer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-svg-transformer
[license-src]: https://img.shields.io/github/license/kiwilan/nuxt-svg-transformer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/kiwilan/nuxt-svg-transformer/blob/main/LICENSE

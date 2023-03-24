[![nuxt-svg-transformer](./docs/public/cover.jpg "nuxt-svg-transformer")](./docs/public/cover.jpg)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-version-src]][nuxt-version-href]

![ci](https://github.com/kiwilan/nuxt-svg-transformer/actions/workflows/ci.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bfdc4eb4-5a04-42ef-8fc8-f57a38317746/deploy-status)](https://app.netlify.com/sites/frabjous-sherbet-a6e961/deploys)

# Nuxt SVG transformer

A **Nuxt 3** module to manage SVG as icons, transform SVG to inject dynamically into Vue component, type included.

- [📖 &nbsp;Read the documentation](https://nuxt-svg-transformer.netlify.app)
- [👾 &nbsp;Playground](https://stackblitz.com/edit/nuxt-starter-vvr4qn)

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

```bash
npm i nuxt-svg-transformer --save-dev
```

```bash
yarn add nuxt-svg-transformer --dev
```

```bash
pnpm add nuxt-svg-transformer --save-dev
```

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

See [documentation](https://nuxt-svg-transformer.netlify.app/get-started).

## Local

### Installation

- Clone repository
- Install dependencies using `pnpm i`
- Prepare using `pnpm dev:prepare`
- Try playground using `pnpm dev`

### Testing

Create a `tgz`.

```bash
rm -f ~/nuxt-svg-transformer-*.tgz && npm pack && mv nuxt-svg-transformer-*.tgz ~/
```

Add it to your Nuxt app.

```json
{
  "devDependencies": {
    "nuxt-svg-transformer": "file:~/nuxt-svg-transformer-0.0.9.tgz"
  }
}
```

## More typescript in your app?

Try [nuxt-typed-link](https://github.com/kiwilan/nuxt-typed-link) to get typed link into your app.

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

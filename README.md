# nuxt-svg-transformer

[![npm](https://img.shields.io/npm/v/nuxt-svg-transformer.svg?style=flat-square&color=CB3837&logo=npm&logoColor=ffffff&label=npm)](https://www.npmjs.com/package/nuxt-svg-transformer)
[![nuxt](https://img.shields.io/static/v1?label=Nuxt&message=3&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxt.com/)
[![publish](https://img.shields.io/github/workflow/status/kiwilan/nuxt-svg-transformer/publish?style=flat-square&logo=github&logoColor=ffffff&label=publish)](https://github.com/kiwilan/nuxt-svg-transformer/actions)

A **Nuxt 3** module to manage SVG as icons.

## Installation

With `NPM`

```bash
npm install nuxt-svg-transformer -D
```

Or `pnpm`

```bash
pnpm add nuxt-svg-transformer -D
```

## Features

- 🔎 Vue component ready: `SvgIcon`
- 🔥 Use `Suspense` to load SVG
- 🤙🏻 Reactivity option
- 📦 No import needed: SVG directly injected
- 🦾 TypeScript: SVG typed, validate by `name` prop

## Usage

```ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    'nuxt-svg-transformer',
  ],
  svgTransformer: {
    root: false,
    assets: 'assets/icons',
    componentName: 'SvgIcon',
    reactive: false,
    autoTitle: true,
    fallback: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" style="width: 1.5rem; height: 1.5rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
    log: true,
  },
})
```

Put your SVG into `assets` path from config, default is `assets/icons`.

```bash
assets
  icons
    home.svg
    about.svg
    contact.svg
app.vue
```

In any Vue component.

```vue
<template>
  <div>
    <svg-icon name="home" />
  </div>
</template>
```

## 💻 Development

- Clone repository
- Install dependencies using `pnpm i`
- Prepare using `pnpm dev:prepare`
- Try playground using `pnpm dev`

### Local module

Create a `tgz`.

```bash
rm -f ~/nuxt-svg-transformer-0.0.11.tgz && npm pack && mv nuxt-svg-transformer-0.0.11.tgz ~/
```

Add it to your Nuxt app.

```json
{
  "devDependencies": {
    "nuxt-svg-transformer": "file:~/nuxt-svg-transformer-0.0.11.tgz"
  }
}
```

## License

[MIT](./LICENSE)

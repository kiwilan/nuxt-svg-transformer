# nuxt-svg-transformer

[![npm](https://img.shields.io/npm/v/nuxt-svg-transformer.svg?style=flat-square&color=CB3837&logo=npm&logoColor=ffffff&label=npm)](https://www.npmjs.com/package/nuxt-svg-transformer)
[![nuxt](https://img.shields.io/static/v1?label=Nuxt&message=3&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxt.com/)
[![publish](https://img.shields.io/github/workflow/status/kiwilan/nuxt-svg-transformer/publish?style=flat-square&logo=github&logoColor=ffffff&label=publish)](https://github.com/kiwilan/nuxt-svg-transformer/actions)

A **Nuxt 3** module to manage SVG as icons.

## Why

You can find some other SVG modules for Nuxt 3, `nuxt-svg-transformer` have a behavior similar to [gitFoxCode/nuxt-icons](https://github.com/gitFoxCode/nuxt-icons), but with some differences in current module: `svg` aren't directly load from original file but from cache files, `name` is typed to avoid errors, keep native SVG with `fill`/`width`/`height` and you have some options to manage your SVG. Try [gitFoxCode/nuxt-icons](https://github.com/gitFoxCode/nuxt-icons) to know if it's better for you.

Another module [nuxt-modules/icon](https://github.com/nuxt-modules/icon) can manage SVG as icons, but the aim of this module is to refer to libraries or to support custom SVG as Vue component. If you want only use SVG from a library, try this module!

`nuxt-svg-transformer` is a module useful if you want to manage your SVG as icons, without using a library, and without using a custom loader.

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

- 🔎 Vue component ready with `SvgIcon`
- 🔥 Hot reloading when SVG updated
- 🤙🏻 Reactivity option
- 🗂 Seperated index SVG files
- 📦 No import needed, SVG directly injected
- 🎨 Options to add or clear `style` and `class` global attributes
- 🦾 SVG typed, validate by `name` prop (`typescript` required)

## Demo

Available on [StackBlitz](https://stackblitz.com/edit/nuxt-starter-vvr4qn).

## Usage

```ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    'nuxt-svg-transformer',
  ],
  svgTransformer: {
    // ...
  },
})
```

| **Option**      | **Type**            | **Default**       | **Description**                                                                                        |
| --------------- | ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| `assets`        | `string`            | `assets/icons`    | Path where original SVG stored.                                                                        |
| `autoTitle`     | `boolean`           | `true`            | Each SVG will have a `title` based on SVG filename.                                                    |
| `cacheDir`      | `string`            | `assets/cache`    | The path to the directory where cached file are stored. If directory is not found, it will be created. |
| `cacheFile`     | `string`            | `svg-transformer` | The name of the file where the types are stored, at the root of app.                                   |
| `classDefault`  | `?string`           | `undefined`       | Add default classes to all SVGs.                                                                       |
| `clearClasses`  | `boolean`           | `false`           | Clear all classes from SVGs.                                                                           |
| `clearSize`     | `boolean`           | `false`           | Clear `width` and `height` attributes from SVGs.                                                       |
| `clearStyles`   | `boolean`           | `false`           | Clear all native styles from SVGs.                                                                     |
| `componentName` | `string`            | `SvgIcon`         | Name of component.                                                                                     |
| `fallback`      | `string` or `false` | `<svg ...></svg>` | Fallback SVG if error, can be set to `false` to have no render.                                        |
| `lazy`          | `boolean`           | `true`            | Global option to toggle lazy icons, if disabled, hot reloading can have some issues.                   |
| `log`           | `boolean`           | `true`            | Log to alert if errors, can be override with prop.                                                     |
| `reactive`      | `boolean`           | `false`           | Enable reactivity to allow `name` prop to be switched, can be override with prop.                      |
| `root`          | `string` or `false` | `false`           | If your Nuxt app isn't on root project, set path of app like `playground`.                             |
| `sizeInherit`   | `boolean`           | `false`           | Global options to toggle size inheritance, inline `style` `height: inherit; width: inherit;`.          |
| `styleDefault`  | `?string`           | `undefined`       | Add default styles to all SVGs.                                                                        |
| `tagName`       | `string`            | `div`             | Tag name to use for SVGs.                                                                              |

Put your SVG into `assets` path from config, default is `assets/icons`.

```bash
assets/
  icons/
    nest-dir/
      arrow.svg
    home.svg
    about.svg
    contact.svg
app.vue
```

In any Vue component.

```vue
<template>
  <div>
    <svg-icon name="home" /> <!-- inject home.svg -->
    <svg-icon name="abut" /> <!-- Type error! -->
    <svg-icon name="nest-dir/arrow" /> <!-- inject nest-dir/arrow.svg -->
  </div>
</template>
```

## `SvgIcon` Props

| **Prop**   | **Type**   | **Required** | **Default** | **Description**                                                                             |
| ---------- | ---------- | ------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `name`     | `IconType` | `true`       | `undefined` | Name of SVG.                                                                                |
| `lazy`     | `boolean`  | `false`      | `undefined` | Lazy loading of SVG, default from config.                                                   |
| `log`      | `boolean`  | `false`      | `undefined` | Log to warn if errors, default from config.                                                 |
| `title`    | `string`   | `false`      | `undefined` | Set `title` attribute, default `title` will be SVG name if `autoTitle` is enable in config. |
| `reactive` | `boolean`  | `false`      | `undefined` | Allow reactivity `name` from `ref()`, default from config.                                  |

## 💻 Development

- Clone repository
- Install dependencies using `pnpm i`
- Prepare using `pnpm dev:prepare`
- Try playground using `pnpm dev`

### Local module

Create a `tgz`.

```bash
rm -f ~/nuxt-svg-transforme-*.tgz && npm pack && mv nuxt-svg-transforme-*.tgz ~/
```

Add it to your Nuxt app.

```json
{
  "devDependencies": {
    "nuxt-svg-transformer": "file:~/nuxt-svg-transformer-0.0.3.tgz"
  }
}
```

## License

[MIT](./LICENSE)

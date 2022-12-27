## 0.1.2

Fix: `display` prop to `SvgIcon` component.

* Fix: `display` prop to `SvgIcon` component (776184c)
* 0.1.1 changelog (688a23d)

## 0.1.1

Config option `inlineBlock` to `display`, add `display` prop to component to override.

* Config option `inlineBlock` to `display`, add `display` prop to component to override (339ca5b)
* 0.1.0 changelog (d703457)

## 0.1.0

Export ModuleOptions fixed.

* ModuleOptions export fix (139def3)
* docs (7397195)
* playground opts (8c8de6b)
* docs improve (33b48ff)
* readme fix (e139821)
* readme docs (41736b7)
* actions name (7cb26c2)
* docs (0cfd35a)
* netlify deploy (6e6b5b1)
* netlify fix (01ee3b9)
* netlify (288a313)
* docs cleaning (cf65c31)
* docs clean (faf6c7b)
* add docs (7b95537)
* docs fix (1026055)
* tasks fix (df1f2c6)
* change cover (0a618ea)
* actions fix name (67ec0fc)
* changelog for 0.0.9 (f698cf7)

## 0.0.9

Issue #4 fixed by extended Vite config from <https://github.com/nuxt-modules/strapi/pull/232>.

* clean (fa89227)
* task fix (ae86746)
* up deps (1f17386)
* issue #4 fixed (a04fb42)
* actions clean, tasks update (8994bef)
* add release (765ca91)
* task fix (e0247a8)
* add task post deploy (49567e6)
* add task pre deploy (3099171)
* changelog 0.0.8 (181215c)
* Merge branch 'main' into develop (6f2b245)
* Merge branch 'main' into develop (31291e9)
* title option fix (db9a81f)
* improve docs (fdbdf87)
* module infos (8b2e644)

## 0.0.8

* `title` option bug fix.

## 0.0.7

* issue #3: add Windows support for SVG path with same API as Unix.

## 0.0.6

* issue #2: update options `clearClasses`, `clearSize` and `clearStyle` to `clearClass`, `clearSize` and `clearStyle` (singular)

## 0.0.51

* Improve docs
* Add cover image
* Add icon

## 0.0.5

* issue #1: Add global option `inlineBlock` to add `display: inline-block;` to `SvgIcon`, default is `true`. Thanks to FarhanShares!
* issue #2: Change `clearClasses`, `clearSize`, `clearStyles` with granular options: `all` | `parent` | `none` (default). You can clear all attributes, only parent attributes or none (`clearSize` is about `width` and `height` attributes). Thanks to FarhanShares!

## 0.0.44

* `title` component option bug fix
* issue #1: style `scoped` now available

## 0.0.43

* Option `autoTitle` is now `title` and the default is `false` to disable *title* generation.

## 0.0.42

* Hot reload fixed
  * blocked cause by path watch
  * improved when delete a SVG file
* improve docs

## 0.0.41

* Remove `root` and `tagName` options, not relevant anymore.
* `SvgIcon` fix `Suspense` error.
* `fallback` set size to `inherit` by default.

## 0.0.4

* Remove `cacheDir` and `cacheFile` options, merged into `assetsDir` options: now, cached files are generated in `assetsDir/cache` directory and SVG are stored in `assetsDir/svg` directory.
* Index file will be stored into `assets` directory without option path because component have to refer to it (type has removed from this file).
* New type file will be stored into `.nuxt` without option path because it's only type file.
* All paths rebuilt with `nuxt.options`.
* API more stable.

## 0.0.31

* Fix: relative paths

## 0.0.3

* Refactoring to fix production bug
  * Cached files are stored into `cacheDir` with `cacheFile` file at the root of app (added to `.gitignore`)

## 0.0.25

* Add `clearSize` option to remove native size attributes from SVGs

## 0.0.24

* Add global options `classDefault`, `clearClasses`, `clearStyles`, `sizeInherit`, `styleDefault` to manage default classes and styles and `tagName` to change tag name of SVGs.
* Refactoring `icons`, add `svg` class
  * Inject paths into `icons`
* Some improvement to playground

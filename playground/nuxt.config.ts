import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/css/app.css'],
  modules: [
    // 'nuxt-svg-transformer',
    '../src/module',
  ],
  svgTransformer: {
    assetsDir: 'assets/icons',
    componentName: 'SvgIcon',
    display: 'inline-block',
    reactive: false,
    title: false,
    lazy: true,
    log: true,
    clearClass: 'all',
    clearStyle: 'all',
    sizeInherit: true,
    clearSize: 'all',
    // styleDefault: 'display: flex;',
    // classDefault: 'w-5 h-5',
  },
  postcss: {
    plugins: {
      tailwindcss: './tailwind.config.cjs',
      autoprefixer: {},
    },
  },
})

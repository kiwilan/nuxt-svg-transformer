import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/css/app.css'],
  modules: [
    'nuxt-svg-transformer',
  ],
  svgTransformer: {
    root: 'playground',
    assets: 'assets/icons',
    componentName: 'SvgIcon',
    reactive: false,
    title: true,
    lazy: true,
    log: true,
    clearClasses: false,
    clearStyles: false,
    sizeInherit: false,
    // styleDefault: 'display: flex;',
    classDefault: 'w-5 h-5',
  },
  postcss: {
    plugins: {
      tailwindcss: './tailwind.config.cjs',
      autoprefixer: {},
    },
  },
})

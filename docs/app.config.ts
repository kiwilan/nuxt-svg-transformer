import { defineAppConfig } from '#app'

export default defineAppConfig({
  docus: {
    title: 'Nuxt SVG transformer',
    description: 'Transform SVG to inject dynamically into Vue component, type included. ',
    image: '/cover.jpg',
    socials: {
      twitter: 'ewilanriviere',
      github: 'kiwilan/nuxt-svg-transformer',
      nuxt: {
        href: 'https://nuxt.com',
        icon: 'simple-icons:nuxtdotjs',
        label: 'Nuxt',
      },
    },
    aside: {
      level: 0,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
    },
    footer: {
      credits: {
        text: 'Powered by Docus, made with ❤️ by Kiwilan',
        href: 'https://github.com/kiwilan/nuxt-svg-transformer',
      },
    },
  },
})

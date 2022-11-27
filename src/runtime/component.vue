<script lang="ts" setup>
import { computed, defineAsyncComponent, h, onMounted, ref, shallowRef, useAttrs, watch } from 'vue'
import type { Icon } from '@/.nuxt/icons'
// @ts-expect-error type error
import { autoTitle, fallback, lazy, log, reactive, root } from '#svg-transformer-options'

interface Props {
  name: Icon
  title?: string
  lazy?: boolean
  reactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  lazy: undefined,
  reactive: undefined,
})

const options = {
  root: root as string,
  lazy: lazy as boolean,
  reactive: reactive as boolean,
  autoTitle: autoTitle as boolean,
  fallback: fallback as string,
  log: log as boolean,
}

const config = {
  lazy: props.lazy ?? options.lazy,
  reactive: props.reactive ?? options.reactive,
  autoTitle: options.autoTitle,
  fallback: options.fallback,
  log: options.log,
}

const svgTitle = ref()

const setTitle = () => {
  if (!config.autoTitle)
    svgTitle.value = props.name

  if (props.title)
    svgTitle.value = props.title
}
setTitle()

const component = shallowRef(h('span'))

const loadComponent = async () => defineAsyncComponent({
  loader: async () => {
    // return import(`./playground/.nuxt/icons/${props.name}.vue`)
    return import(options.root
      ? `../../${options.root}/.nuxt/icons/${props.name}.vue`
      : `../../.nuxt/icons/${props.name}.vue`)
      .then((module) => {
        return h(module.default)
      })
      .catch(() => {
        if (config.log)
          console.warn(`SVG icon not found: ${props.name}`)
        return h('div', {
          innerHTML: config.fallback
            ? config.fallback
            : '',
        })
      })
  },
  loadingComponent: {
    template: '<span></span>',
  },
  errorComponent: {
    template: '<span>error</span>',
  },
  delay: 200,
  timeout: 3000,
  suspensible: true,
  // onError: (error) => {
  //   console.error('SVG not found', error)
  //   return h('div', {
  //     innerHTML: config.fallback,
  //   })
  // },
})

const attrs = useAttrs()

if (config.lazy) {
  onMounted(async () => {
    component.value = await loadComponent()
  })
}
else {
  component.value = await loadComponent()
}

if (config.reactive) {
  watch(
    () => props.name,
    async () => {
      component.value = await loadComponent()
    },
  )
}
</script>

<template>
  <span :title="svgTitle">
    <Suspense>
      <component :is="component" v-bind="attrs" />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </span>
</template>

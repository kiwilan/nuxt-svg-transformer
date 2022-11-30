<script lang="ts" setup>
import { onMounted, ref, useAttrs, watch } from 'vue'
import type { NuxtSvgTransformerModule } from '../types'
// @ts-expect-error type error
import * as options from '#svg-transformer-options'
import type { IconType } from '~~/.nuxt/svg-transformer'
import { IconList } from '~~/assets/svg-transformer-list'

interface Props {
  name: IconType
  title?: string
  lazy?: boolean
  reactive?: boolean
  log?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  lazy: undefined,
  reactive: undefined,
  log: undefined,
})

const opts: NuxtSvgTransformerModule = options
const config = {
  lazy: props.lazy ?? opts.lazy,
  reactive: props.reactive ?? opts.reactive,
  autoTitle: opts.autoTitle,
  fallback: opts.fallback,
  log: props.log ?? opts.log,
}

const svgTitle = ref()

const setTitle = () => {
  if (!config.autoTitle)
    svgTitle.value = props.name

  if (props.title)
    svgTitle.value = props.title
}
setTitle()

const attrs = useAttrs()
const svg = ref<string>('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem;"></svg>')

const setSvg = async () => {
  const value = await IconList[props.name]

  if (value) {
    svg.value = value.default
  }
  else {
    if (config.log)
      console.warn(`[nuxt-svg-transformer] SVG "${props.name}" not found`)
    if (typeof opts.fallback === 'string')
      svg.value = opts.fallback
  }
}

if (config.lazy) {
  onMounted(async () => {
    await setSvg()
  })
}
else {
  await setSvg()
}

if (config.reactive) {
  watch(
    () => props.name,
    async () => {
      await setSvg()
    },
  )
}
</script>

<template>
  <Suspense>
    <component :is="opts.tagName" v-bind="attrs" :title="svgTitle">
      <span v-html="svg" />
    </component>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

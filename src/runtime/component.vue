<script lang="ts" setup>
import { onMounted, ref, useAttrs, watch } from 'vue'
import type { IconType } from '@/.nuxt/icons/components'
import { IconList } from '@/.nuxt/icons/components'
// @ts-expect-error type error
import { autoTitle, components, fallback, lazy, log, reactive, root } from '#svg-transformer-options'

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
})

const options = {
  root: root as string,
  lazy: lazy as boolean,
  reactive: reactive as boolean,
  autoTitle: autoTitle as boolean,
  fallback: fallback as string | boolean,
  log: log as boolean,
  components: components as string[],
}

const config = {
  lazy: props.lazy ?? options.lazy,
  reactive: props.reactive ?? options.reactive,
  autoTitle: options.autoTitle,
  fallback: options.fallback,
  log: props.log ?? options.log,
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
    if (typeof options.fallback === 'string')
      svg.value = options.fallback
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
    <span v-bind="attrs" :title="svgTitle" v-html="svg" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

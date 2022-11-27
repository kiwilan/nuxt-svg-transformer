<script lang="ts" setup>
import { ref, useAttrs, watch } from 'vue'
import type { IconType } from '@/.nuxt/icons/components'
import { IconList } from '@/.nuxt/icons/components'
// @ts-expect-error type error
import { autoTitle, components, fallback, lazy, log, paths, reactive, root } from '#svg-transformer-options'

interface Props {
  name: IconType
  title?: string
  // lazy?: boolean
  reactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  lazy: undefined,
  reactive: undefined,
})

const options = {
  root: root as string,
  // lazy: lazy as boolean,
  reactive: reactive as boolean,
  autoTitle: autoTitle as boolean,
  fallback: fallback as string,
  log: log as boolean,
  components: components as string[],
}

const config = {
  // lazy: options.lazy,
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

const attrs = useAttrs()
const svg = ref<string>()

const setSvg = () => {
  svg.value = IconList[props.name] ?? options.fallback
}

setSvg()

if (config.reactive) {
  watch(
    () => props.name,
    () => {
      setSvg()
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

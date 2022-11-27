<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Icon } from './.nuxt/icons'

const current = ref<Icon>('heart')

onMounted(() => {
  setTimeout(() => {
    current.value = 'star'
  }, 2500)
})
</script>

<template>
  <div>
    <SvgIcon name="settings" class="w-6 h-6" />
    <SvgIcon name="setting" />
    <SvgIcon :name="current" reactive />
    Nuxt module playground!
  </div>
</template>

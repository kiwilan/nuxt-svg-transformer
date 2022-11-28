<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { IconType } from './.nuxt/icons/components'

const current = ref<IconType>('heart')

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
    <SvgIcon name="download/direct" />
    <SvgIcon name="server-logo/server-icon" />
    <SvgIcon :name="current" reactive />
    Nuxt module playground!
  </div>
</template>

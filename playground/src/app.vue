<script setup lang="ts">
import { ref } from 'vue'
import type { IconType } from '~~/.nuxt/svg-transformer'

const like = ref<IconType>('heart')
</script>

<template>
  <div class="max-w-7xl container mx-auto px-8 py-6">
    <div>
      <SvgIcon :name="like" reactive class="w-6 h-6 text-blue-600" />
      <button
        class="bg-purple-500 text-white p-2 rounded-md"
        @click="() => like === 'heart'
          ? like = 'star'
          : like = 'heart'"
      >
        Change
      </button>
    </div>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <SvgIcon name="settings" class="w-6 h-6" />
    </ul>

    <SvgIcon name="setting" class="w-20 h-20" />
    <SvgIcon name="download/direct" class="w-10 h-10" />
    <SvgIcon name="server-logo/server-icon" class="blue" />
    <SvgIcon name="github" class="w-10 h-10" display="block" />
    <SvgIcon name="github" class="w-10 h-10" :display="false" />
  </div>
</template>

<style lang="css" scoped>
.blue {
  height: 1.5rem;
  color: blue;
}
</style>

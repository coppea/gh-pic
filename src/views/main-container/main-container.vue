<script setup lang="ts">
import { onMounted } from 'vue'
import HeaderContent from '@/components/header-content/header-content.vue'
import NavContent from '@/components/nav-content/nav-content.vue'
import { store } from '@/stores'
import themeModeHandle from '@/utils/set-theme-mode'

onMounted(() => {
  themeModeHandle()
})
</script>

<template>
  <main class="main-container">
    <div class="top-container border-box">
      <HeaderContent />
    </div>
    <div class="bottom-container border-box">
      <div
        class="bottom-left-box border-box"
        :class="{ folded: store.getters.getGlobalSettings.folded }"
      >
        <NavContent />
      </div>
      <div class="bottom-right-box border-box">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped lang="stylus">
@import "./main-container.styl"
</style>

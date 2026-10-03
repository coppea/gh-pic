<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import { computed, onMounted, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElementPlusSizeEnum } from '@/common/model'
import { useCloudSettingsSync } from '@/composables/use-cloud-settings-sync'
import router from '@/router'
import { useStore } from '@/stores'
import { setWindowTitle, throttle } from '@/utils'
import setThemeMode from '@/utils/set-theme-mode'
import MainContainer from '@/views/main-container/main-container.vue'
import { initGithubAuthorize } from '@/views/picx-login/picx-login.util'

const { locale } = useI18n()
const store = useStore()
// 图床设置后台静默云同步（登录后拉取云端 .settings，本地修改后自动推送）
useCloudSettingsSync()
const globalSettings = computed(() => store.getters.getGlobalSettings).value
const elementPlusSize = shallowRef<ElementPlusSizeEnum>(ElementPlusSizeEnum.default)
const elementPlusLocale = shallowRef(zhCN)

const elementPlusSizeHandle = (width: number) => {
  if (width <= 700) {
    store?.dispatch('SET_GLOBAL_SETTINGS', {
      elementPlusSize: ElementPlusSizeEnum.small,
      folded: true,
    })
    elementPlusSize.value = ElementPlusSizeEnum.small
  }
  else if (width <= 1000) {
    store?.dispatch('SET_GLOBAL_SETTINGS', {
      elementPlusSize: ElementPlusSizeEnum.default,
      folded: false,
    })
    elementPlusSize.value = ElementPlusSizeEnum.default
  }
  else {
    store?.dispatch('SET_GLOBAL_SETTINGS', {
      elementPlusSize: ElementPlusSizeEnum.large,
      folded: false,
    })
    elementPlusSize.value = ElementPlusSizeEnum.large
  }
}

const setLanguage = () => {
  locale.value = 'zh-CN'
  elementPlusLocale.value = zhCN // 设置 Element Plus 组件库语言
  window.pluginWebUpdateNotice_?.setLocale('zh_CN')
  setWindowTitle(router.currentRoute.value.meta.title as string)
}

const init = () => {
  elementPlusSizeHandle(window.innerWidth)
  window.addEventListener(
    'resize',
    throttle((e: any) => {
      elementPlusSizeHandle(e.target.innerWidth)
    }, 600),
  )

  setThemeMode()
  setLanguage()
  initGithubAuthorize()
}

onMounted(() => {
  init()
})
</script>

<template>
  <ElConfigProvider :size="elementPlusSize" :z-index="3000" :locale="elementPlusLocale">
    <MainContainer />
  </ElConfigProvider>
</template>

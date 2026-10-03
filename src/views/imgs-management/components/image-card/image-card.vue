<script setup lang="ts">
import type { UploadedImageModel } from '@/common/model'
import { computed, ref } from 'vue'
import { ContextmenuEnum } from '@/common/directive/types'
import { store } from '@/stores'
import { copyImageLink, generateImageLink } from '@/utils'

const props = defineProps({
  imageObj: {
    type: Object as () => UploadedImageModel,
    default: () => ({}),
  },
  isUploaded: {
    type: Boolean,
    default: false,
  },
})

const imgUrl = computed(() => generateImageLink(props.imageObj) ?? undefined)

// 图片链接不可访问（分发渠道尚未生效）时禁用复制链接并给出提示
const imgUnavailable = computed(() => props.imageObj.deployed === false)

const isShowOperateBtn = ref<boolean>(false)

const togglePick = (imageObj: UploadedImageModel) => {
  imageObj.checked = !imageObj.checked
  store.commit('IMAGE_CARD', { imageObj })
}

const onShiftClick = (imageObj: UploadedImageModel) => {
  togglePick(imageObj)
}

const setImgAvailableStatus = (status: boolean) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.imageObj.deployed = status
}
</script>

<template>
  <div
    v-loading="imageObj.deleting"
    v-contextmenu="{ type: ContextmenuEnum.img, img: imageObj }"
    class="image-card border-box"
    :class="{ checked: imageObj.checked, active: imageObj.active }"
    :element-loading-text="$t('management_page.loadingTxt3')"
    @mouseenter="isShowOperateBtn = true"
    @mouseleave="isShowOperateBtn = false"
    @click.shift="onShiftClick(imageObj)"
  >
    <!-- 图片 -->
    <div class="image-card-top border-box">
      <el-image
        :src="imgUrl"
        fit="cover"
        loading="lazy"
        lazy
        :hide-on-click-modal="true"
        :preview-src-list="
          store.getters.getUploadAreaState.pressShiftKey || !imgUrl ? [] : [imgUrl]
        "
        @error="setImgAvailableStatus(false)"
        @load="setImgAvailableStatus(true)"
      />
    </div>

    <!-- 图片名称 & 复制链接 -->
    <div class="image-card-bottom border-box">
      <!-- 文件名 -->
      <div class="filename text-ellipsis border-box">
        {{ imageObj.name }}
      </div>

      <!-- 复制图片链接 -->
      <div
        class="copy-link text-ellipsis border-box"
        :class="{ disabled: imgUnavailable }"
        @click="copyImageLink(imageObj)"
      >
        {{ $t('copy_link') }}
      </div>
    </div>

    <!-- 选择框 -->
    <div
      v-show="isShowOperateBtn || imageObj.checked"
      class="checked-box flex-center"
      @click="togglePick(imageObj)"
    >
      <el-icon v-if="imageObj.checked" :size="14">
        <IEpSelect />
      </el-icon>
    </div>

    <!-- 图片链接不可访问状态 -->
    <div v-if="imgUnavailable" class="img-status-box">
      <el-tag type="danger" disable-transitions>
        {{ $t('management_page.img_unavailable') }}
      </el-tag>
    </div>
  </div>
</template>

<style scoped lang="stylus">
@import 'image-card.styl'
</style>

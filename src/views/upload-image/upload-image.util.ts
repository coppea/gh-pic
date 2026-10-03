import type { UploadImageModel } from '@/common/model'
import { computed } from 'vue'
import { store } from '@/stores'
import { createUploadImageObject } from '@/utils'

const userSettings = computed(() => store.getters.getUserSettings).value

export const generateUploadImageObject = (obj: {
  uuid: string
  file: File
  base64: string
}): UploadImageModel => {
  const tmp: UploadImageModel = createUploadImageObject()
  tmp.uuid = obj.uuid
  tmp.base64.originalBase64 = obj.base64
  tmp.fileInfo.originalFile = obj.file

  const { imageName } = userSettings

  const hash = obj.uuid

  // 处理文件名，去除空格字符
  const nameHandled = obj.file.name.trim().replaceAll(' ', '-')

  const tmpIdx = nameHandled.lastIndexOf('.')
  const name = nameHandled.slice(0, tmpIdx)
  const suffix = nameHandled.slice(tmpIdx + 1)

  tmp.filename.initName = name
  tmp.filename.name = imageName.addPrefix.enable ? `${imageName.addPrefix.prefix}${name}` : name
  tmp.filename.prefix = imageName.addPrefix.prefix
  tmp.filename.hash = hash
  tmp.filename.suffix = suffix
  // 开启哈希后直接用哈希值作为文件名，避免生成带前导点的名称
  tmp.filename.final = imageName.enableHash
    ? `${hash}.${suffix}`
    : `${tmp.filename.name}.${suffix}`
  tmp.filename.isAddHash = imageName.enableHash
  tmp.filename.isAddPrefix = imageName.addPrefix.enable
  return tmp
}

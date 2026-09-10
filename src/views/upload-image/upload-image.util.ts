import { UploadImageModel, UserSettingsModel } from '@/common/model'
import { starredRepo } from '@/common/api'
import { store } from '@/stores'
import {
  createUploadImageObject,
  getFilename,
  getFileSuffix,
  getRandomStr,
  updateFilename
} from '@/utils'

export const starred = async (userSettings: UserSettingsModel) => {
  const { starred } = userSettings
  if (!starred) {
    const res = await starredRepo()
    if (res) {
      await store.dispatch('SET_USER_SETTINGS', {
        starred: true
      })
    }
  }
}

export const generateUploadImageObject = (obj: {
  uuid: string
  file: File
  base64: string
}): UploadImageModel => {
  const tmp: UploadImageModel = createUploadImageObject()
  tmp.uuid = obj.uuid
  tmp.base64.originalBase64 = obj.base64
  tmp.fileInfo.originalFile = obj.file

  const { imageName } = store.getters.getUserSettings

  // 处理文件名，去除空格字符
  const initName = getFilename(obj.file.name)

  // 获取文件后缀
  const suffix = getFileSuffix(obj.file.name)

  // 生成 6 位随机字符（由大小写英文字母和数字组成）
  const randomStr = getRandomStr(6)

  tmp.filename.initName = initName
  tmp.filename.name = initName
  tmp.filename.newName = ''
  tmp.filename.suffix = suffix
  tmp.filename.hash = obj.uuid
  tmp.filename.randomStr = randomStr
  tmp.filename.prefix = imageName.addPrefix.prefix
  tmp.filename.isRename = false
  tmp.filename.isAddHash = imageName.enableHash
  tmp.filename.isAddPrefix = imageName.addPrefix.enable
  tmp.filename.isAddRandom = imageName.enableRandom

  // 计算最终文件名
  updateFilename(tmp.filename)
  return tmp
}

import { UploadImageModel, UserSettingsModel } from '@/common/model'
import {
  addWatermarkToImage,
  compressImage,
  getFileSuffix,
  imgFileToBase64,
  isNeedWatermark,
  updateFilename
} from '@/utils'

/**
 * 初始化图片设置（是否添加水印，是否压缩等）
 * @param imgObj
 * @param userSettings
 */
export const initImgSettings = async (
  imgObj: UploadImageModel,
  userSettings: UserSettingsModel
) => {
  const { watermark, compress } = userSettings
  let file: File = imgObj.fileInfo.originalFile!

  // 添加水印
  if (watermark.enable && watermark.text && !imgObj.fileInfo.watermarkFile) {
    imgObj.beforeUploadStatus.watermarking = true
    imgObj.fileInfo.watermarkFile = isNeedWatermark(imgObj.fileInfo.originalFile!.type)
      ? await addWatermarkToImage(imgObj.fileInfo.originalFile!, watermark)
      : imgObj.fileInfo.originalFile
    file = imgObj.fileInfo.watermarkFile!
    imgObj.base64.watermarkBase64 = await imgFileToBase64(file)
    imgObj.beforeUploadStatus.watermarking = false
  }

  // 压缩图片
  if (compress.enable && !imgObj.fileInfo.compressFile) {
    imgObj.beforeUploadStatus.compressing = true
    imgObj.fileInfo.compressFile = await compressImage(file, compress.encoder)
    file = imgObj.fileInfo.compressFile!
    imgObj.base64.compressBase64 = await imgFileToBase64(file)
    // 压缩后文件后缀可能改变，需要重新计算最终文件名
    imgObj.filename.suffix = getFileSuffix(file.name)
    updateFilename(imgObj.filename)
    imgObj.beforeUploadStatus.compressing = false
  }
}

/**
 * 哈希化：是否在文件名中增加哈希值
 * @param isAddHash
 * @param imgObj
 */
export const addHashHandle = (isAddHash: boolean, imgObj: UploadImageModel) => {
  imgObj.filename.isAddHash = isAddHash
  updateFilename(imgObj.filename)
}

/**
 * 添加前缀：是否在文件名前增加前缀
 * @param isAddPrefix
 * @param imgObj
 */
export const addPrefixHandle = (isAddPrefix: boolean, imgObj: UploadImageModel) => {
  imgObj.filename.isAddPrefix = isAddPrefix
  updateFilename(imgObj.filename)
}

/**
 * 随机字符：是否使用 6 位随机字符作为文件名
 * @param isAddRandom
 * @param imgObj
 */
export const addRandomHandle = (isAddRandom: boolean, imgObj: UploadImageModel) => {
  imgObj.filename.isAddRandom = isAddRandom
  updateFilename(imgObj.filename)
}

/**
 * 重命名：是否使用自定义名称作为文件名
 * @param isRename
 * @param imgObj
 */
export const rename = (isRename: boolean, imgObj: UploadImageModel) => {
  imgObj.filename.isRename = isRename
  updateFilename(imgObj.filename)
}

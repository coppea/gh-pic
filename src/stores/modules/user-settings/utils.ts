import type { ImageLinkRuleModel } from '@/common/model'
import i18n from '@/plugins/vue/i18n'
import { ImgLinkRuleActionsEnum } from '@/stores/modules/user-settings/types'

export const imgLinkRuleVerification = (
  rule: ImageLinkRuleModel,
  type: ImgLinkRuleActionsEnum,
  callback: any,
) => {
  const typeTxt
    = type === ImgLinkRuleActionsEnum.add
      ? i18n.global.t('settings_page.link_rule.add')
      : i18n.global.t('settings_page.link_rule.edit')

  if (!rule.rule.includes('{{path}}')) {
    ElMessage.error(
      i18n.global.t('settings_page.link_rule.error_msg_2', { action: typeTxt, path: '{{path}}' }),
    )
    callback(false)
    return
  }

  callback(true)
}

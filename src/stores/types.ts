import DirImageListStateTypes from './modules/dir-image-list/types'
import UserConfigInfoStateTypes from './modules/user-config-info/types'
import UploadAreaStateTypes from '@/stores/modules/upload-area/types'
import ToolboxImageListStateTypes from './modules/toolbox-image-list/types'
import UploadImageListStateTypes from './modules/upload-image-list/types'
import GitHubAuthorizeStateTypes from './modules/github-authorize/types'

export default interface RootStateTypes {
  rootName: string
}

export interface AllStateTypes extends RootStateTypes {
  dirImageListModule: DirImageListStateTypes
  userConfigInfoModule: UserConfigInfoStateTypes
  uploadAreaModule: UploadAreaStateTypes
  toolboxImageListModule: ToolboxImageListStateTypes
  uploadImageListModule: UploadImageListStateTypes
  githubAuthorizeModule: GitHubAuthorizeStateTypes
}

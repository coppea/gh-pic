import type DirImageListStateTypes from './modules/dir-image-list/types'
import type GitHubAuthorizeStateTypes from './modules/github-authorize/types'
import type UploadImageListStateTypes from './modules/upload-image-list/types'
import type UserConfigInfoStateTypes from './modules/user-config-info/types'
import type UploadAreaStateTypes from '@/stores/modules/upload-area/types'

export default interface RootStateTypes {
  rootName: string
}

export interface AllStateTypes extends RootStateTypes {
  dirImageListModule: DirImageListStateTypes
  userConfigInfoModule: UserConfigInfoStateTypes
  uploadAreaModule: UploadAreaStateTypes
  uploadImageListModule: UploadImageListStateTypes
  githubAuthorizeModule: GitHubAuthorizeStateTypes
}

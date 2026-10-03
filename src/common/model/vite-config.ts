export declare type Recordable<T = any> = Record<string, T>

export declare interface ViteEnv {
  VITE_CLIENT_ID?: string // PicX GitHub APP Client ID
  VITE_REDIRECT_URI?: string // PicX GitHub APP Callback URL
  VITE_AUTHORIZE_URI?: string // GitHub Authorize URI
  VITE_INSTALL_URL?: string
  VITE_INSTALL_URL_USER?: string
}

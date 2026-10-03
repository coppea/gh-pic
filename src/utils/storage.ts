/**
 * 获取 localStorage 值
 * @param key
 */
export const getLocal = (key: string) => {
  const temp = window.localStorage.getItem(key)
  if (!temp) {
    return null
  }

  try {
    return JSON.parse(temp)
  }
  catch {
    window.localStorage.removeItem(key)
    return null
  }
}

/**
 * 设置 localStorage
 * @param key
 * @param value
 */
export const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取 sessionStorage 的值
 * @param key
 */
export const getSession = (key: string) => {
  const temp = window.sessionStorage.getItem(key)
  if (!temp) {
    return null
  }

  try {
    return JSON.parse(temp)
  }
  catch {
    window.sessionStorage.removeItem(key)
    return null
  }
}

/**
 * 设置 sessionStorage
 * @param key
 * @param value
 */
export const setSession = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

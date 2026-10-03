import request from '@/utils/request'

/**
 * 获取分支信息
 * @param owner
 * @param repo
 * @param branch
 */
export const getBranchInfo = (owner: string, repo: string, branch: string) => {
  return request({
    url: `/repos/${owner}/${repo}/branches/${branch}`,
    method: 'GET',
    noCache: true,
  })
}

/**
 * 获取分支信息列表
 * @param owner
 * @param repo
 */
export const getBranchInfoList = (
  owner: string,
  repo: string,
): Promise<{ value: string, label: string }[]> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const tmpList: any[] = await request({
      url: `/repos/${owner}/${repo}/branches`,
      method: 'GET',
      noCache: true,
    })

    if (tmpList && tmpList.length) {
      resolve(
        tmpList
          .filter(x => !x.protected)
          .map(v => ({
            value: v.name,
            label: v.name,
          }))
          .reverse(),
      )
    }
    else {
      resolve([])
    }
  })
}

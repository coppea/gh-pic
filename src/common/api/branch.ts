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
    noCache: true
  })
}

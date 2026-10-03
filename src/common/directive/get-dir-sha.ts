import type { UserConfigInfoModel } from '@/common/model'
import request from '@/utils/request'

export async function getDirSha(userConfigInfo: UserConfigInfoModel, path: string) {
  const { owner, repo, branch } = userConfigInfo
  try {
    const pathArr = path.split('/')

    if (pathArr.length > 1) {
      pathArr.pop() // 删除数组最后一项
      const resList = await request({
        method: 'GET',
        url: `repos/${owner}/${repo}/contents/${pathArr.join('/')}`,
      })
      return {
        sha: resList.find((x: any) => x.path === path)?.sha || null,
      }
    }

    // 获取分支的引用
    const branchResponse = await request({
      method: 'GET',
      url: `repos/${owner}/${repo}/git/refs/heads/${branch}`,
    })

    const latestCommitSha = branchResponse.object.sha

    // 获取最新提交的树对象 SHA
    const commitResponse = await request({
      method: 'GET',
      url: `repos/${owner}/${repo}/git/commits/${latestCommitSha}`,
    })

    const treeSha = commitResponse.tree.sha

    // 获取树对象的信息
    const treeResponse = await request({
      method: 'GET',
      url: `repos/${owner}/${repo}/git/trees/${treeSha}`,
    })

    // 获取旧文件夹的信息
    const oldFolderInfo = treeResponse.tree.find((item: any) => item.path === path)

    return {
      sha: oldFolderInfo?.sha || null,
    }
  }
  catch (error: unknown) {
    console.error('Error:', error)
    return {
      sha: null,
    }
  }
}

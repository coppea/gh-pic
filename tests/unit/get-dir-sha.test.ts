import type { UserConfigInfoModel } from '@/common/model'
import { describe, expect, it, vi } from 'vitest'
import { getDirSha } from '@/common/directive/get-dir-sha'

const { requestMock } = vi.hoisted(() => ({ requestMock: vi.fn() }))

vi.mock('@/utils/request', () => ({ default: requestMock }))

const config = {
  owner: 'owner',
  repo: 'repo',
  branch: 'main',
} as UserConfigInfoModel

describe('getDirSha', () => {
  it('uses the authenticated request client for root directory lookups', async () => {
    requestMock
      .mockResolvedValueOnce({ object: { sha: 'commit-sha' } })
      .mockResolvedValueOnce({ tree: { sha: 'tree-sha' } })
      .mockResolvedValueOnce({ tree: [{ path: 'images', sha: 'directory-sha' }] })

    await expect(getDirSha(config, 'images')).resolves.toEqual({ sha: 'directory-sha' })
    expect(requestMock).toHaveBeenNthCalledWith(1, {
      method: 'GET',
      url: 'repos/owner/repo/git/refs/heads/main',
    })
    expect(requestMock).toHaveBeenNthCalledWith(2, {
      method: 'GET',
      url: 'repos/owner/repo/git/commits/commit-sha',
    })
    expect(requestMock).toHaveBeenNthCalledWith(3, {
      method: 'GET',
      url: 'repos/owner/repo/git/trees/tree-sha',
    })
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { getLocal, getSession, setLocal, setSession } from '@/utils/storage'

describe('storage helpers', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('returns values written to local and session storage', () => {
    setLocal('local-key', { enabled: true })
    setSession('session-key', 'secret')

    expect(getLocal('local-key')).toEqual({ enabled: true })
    expect(getSession('session-key')).toBe('secret')
  })

  it('clears malformed values instead of throwing', () => {
    localStorage.setItem('broken-local', '{')
    sessionStorage.setItem('broken-session', '{')

    expect(getLocal('broken-local')).toBeNull()
    expect(getSession('broken-session')).toBeNull()
    expect(localStorage.getItem('broken-local')).toBeNull()
    expect(sessionStorage.getItem('broken-session')).toBeNull()
  })
})

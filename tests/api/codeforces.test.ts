import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCodeforcesUsers } from '../../src/api/codeforces'

describe('getCodeforcesUsers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns an empty array when no handles are given', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')

    await expect(getCodeforcesUsers([])).resolves.toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns users when Codeforces responds successfully', async () => {
    const users = [
      { handle: 'tourist', rating: 3858 },
      { handle: 'Petr', rating: 3519 },
    ]

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 200,
      json: async () => ({
        status: 'OK',
        result: users,
      }),
    } as Response)

    await expect(
      getCodeforcesUsers(['tourist', 'Petr']),
    ).resolves.toEqual(users)

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('removes an invalid handle and retries', async () => {
    const users = [
      { handle: 'tourist', rating: 3858 },
      { handle: 'Petr', rating: 3519 },
    ]

    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        status: 400,
        json: async () => ({
          status: 'FAILED',
          comment: 'handles: User with handle invalid_user not found',
        }),
      } as Response)
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({
          status: 'OK',
          result: users,
        }),
      } as Response)

    await expect(
      getCodeforcesUsers(['tourist', 'invalid_user', 'Petr']),
    ).resolves.toEqual(users)

    expect(fetchMock).toHaveBeenCalledTimes(2)

    expect(fetchMock.mock.calls[0][0]).toContain(
      'tourist;invalid_user;Petr',
    )
    expect(fetchMock.mock.calls[1][0]).toContain(
      'tourist;Petr',
    )
  })

  it('removes multiple invalid handles and retries until successful', async () => {
    const users = [
        { handle: 'tourist', rating: 3858 },
        { handle: 'Petr', rating: 3519 },
    ]

    const fetchMock = vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce({
        status: 400,
        json: async () => ({
            status: 'FAILED',
            comment: 'handles: User with handle invalid_user_1 not found',
        }),
        } as Response)
        .mockResolvedValueOnce({
        status: 400,
        json: async () => ({
            status: 'FAILED',
            comment: 'handles: User with handle invalid_user_2 not found',
        }),
        } as Response)
        .mockResolvedValueOnce({
        status: 200,
        json: async () => ({
            status: 'OK',
            result: users,
        }),
        } as Response)

    await expect(
        getCodeforcesUsers([
        'tourist',
        'invalid_user_1',
        'Petr',
        'invalid_user_2',
        ]),
    ).resolves.toEqual(users)

    expect(fetchMock).toHaveBeenCalledTimes(3)

    expect(fetchMock.mock.calls[0][0]).toContain(
        'tourist;invalid_user_1;Petr;invalid_user_2',
    )
    expect(fetchMock.mock.calls[1][0]).toContain(
        'tourist;Petr;invalid_user_2',
    )
    expect(fetchMock.mock.calls[2][0]).toContain(
        'tourist;Petr',
    )
})

  it('removes invalid handles case-insensitively', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        status: 400,
        json: async () => ({
          status: 'FAILED',
          comment: 'handles: User with handle BADHANDLE not found',
        }),
      } as Response)
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({
          status: 'OK',
          result: [{ handle: 'tourist', rating: 3858 }],
        }),
      } as Response)

    await expect(
      getCodeforcesUsers(['tourist', 'badhandle']),
    ).resolves.toEqual([
      { handle: 'tourist', rating: 3858 },
    ])
  })

  it('returns an empty array if every handle is invalid', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        status: 400,
        json: async () => ({
          status: 'FAILED',
          comment: 'handles: User with handle bad1 not found',
        }),
      } as Response)
      .mockResolvedValueOnce({
        status: 400,
        json: async () => ({
          status: 'FAILED',
          comment: 'handles: User with handle bad2 not found',
        }),
      } as Response)

    await expect(
      getCodeforcesUsers(['bad1', 'bad2']),
    ).resolves.toEqual([])
  })

  it('throws when Codeforces returns an unrecognised failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 500,
      json: async () => ({
        status: 'FAILED',
        comment: 'Internal server error',
      }),
    } as Response)

    await expect(
      getCodeforcesUsers(['tourist']),
    ).rejects.toThrow('Internal server error')
  })

  it('throws when the response is not valid JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 502,
      json: async () => {
        throw new SyntaxError()
      },
    } as unknown as Response)

    await expect(
      getCodeforcesUsers(['tourist']),
    ).rejects.toThrow('Codeforces request failed: 502')
  })

  it('throws if Codeforces reports an invalid handle not in the request', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 400,
      json: async () => ({
        status: 'FAILED',
        comment: 'handles: User with handle someone_else not found',
      }),
    } as Response)

    await expect(
      getCodeforcesUsers(['tourist']),
    ).rejects.toThrow(
      'Codeforces reported unknown handle someone_else',
    )
  })
})
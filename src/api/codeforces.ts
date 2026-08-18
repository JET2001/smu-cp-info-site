import { CODEFORCES_USER_INFO_API_PATH } from "../constants"
export interface CodeforcesUser {
    handle: string
    rating?: number
};
interface CodeforcesResponse {
    status: 'OK' | 'FAILED'
    result?: CodeforcesUser[]
    comment?: string
};

export async function getCodeforcesUsers(
  handles: string[],
): Promise<CodeforcesUser[]> {
  let remainingHandles = [...handles]

  while (remainingHandles.length > 0) {
    const handlesParam = remainingHandles
      .map(encodeURIComponent)
      .join(';')

    const response = await fetch(
      `${CODEFORCES_USER_INFO_API_PATH}=${handlesParam}`,
    )

    let data: CodeforcesResponse

    try {
      data = await response.json() as CodeforcesResponse
    } catch {
      throw new Error(`Codeforces request failed: ${response.status}`)
    }

    if (data.status === 'OK' && data.result) {
      return data.result
    }

    const match = data.comment?.match(
      /User with handle (.+?) not found/,
    )

    if (!match) {
      throw new Error(
        data.comment ?? `Codeforces request failed: ${response.status}`,
      )
    }

    const invalidHandle = match[1]

    console.warn(`Invalid Codeforces handle: ${invalidHandle}`)

    const previousLength = remainingHandles.length

    remainingHandles = remainingHandles.filter(
      handle =>
        handle.toLowerCase() !== invalidHandle.toLowerCase(),
    )

    if (remainingHandles.length === previousLength) {
      throw new Error(
        `Codeforces reported unknown handle ${invalidHandle}`,
      )
    }
  }

  return []
}

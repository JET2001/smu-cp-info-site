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
    handles: string[]
): Promise<CodeforcesUser[]> {
    if (handles.length === 0) return [];
    
    const handlesParam = handles.map(encodeURIComponent).join(';')

    const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${handlesParam}`,
    )
    if (!response.ok){
        throw new Error('Codeforces request failed: ${response.status}')
    }
    const data = await response.json() as CodeforcesResponse
    if (data.status != 'OK' || !data.result) {
        throw new Error(data.comment ?? 'Codeforces API request failed')
    }
    return data.result
}
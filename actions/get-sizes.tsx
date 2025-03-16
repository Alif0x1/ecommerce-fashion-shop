import { Size } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`

export const getSizes = async (): Promise<Size[]> => {
  try {
    const res = await fetch(`${URL}`)
    if (!res.ok) {
      const message = `Failed to fetch sizes for id:. Status: ${res.status}`
      throw new Error(message)
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching sizes:', error instanceof Error ? error.message : error)
    return []
  }
}

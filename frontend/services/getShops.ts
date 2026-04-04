import { Shop } from '../types/types'

export async function getShops(): Promise<Shop[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/products/shops`,
      {
        cache: 'no-cache',
      },
    )
    if (res.ok) return res.json()
    return []
  } catch (error) {
    console.error('Failed to get shops list', error)
    return []
  }
}
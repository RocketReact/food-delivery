import { Shop } from '../types/types'

export async function getShops(rating?: string): Promise<Shop[]> {
  const params = new URLSearchParams()
  if (rating) params.set('rating', rating)
  const query = params.toString()
  const url = `${process.env.NEXT_PUBLIC_URL_SERVER}/products/shops${query ? `?${query}` : ''}`
  try {
    const res = await fetch(url, {
      cache: 'no-cache',
    })
    if (res.ok) return res.json()
    return []
  } catch (error) {
    console.error('Failed to get shops list', error)
    return []
  }
}

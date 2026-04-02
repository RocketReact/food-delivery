type Filters = {
  storeName?: string,
  category?: string,
}

export async function getProducts(filters?: Filters): Promise<string[]> {
  const params = new URLSearchParams()
  if (filters?.storeName) params.set('storeName', filters.storeName)
  if (filters?.category) params.set('category', filters.category)

  const query = params.toString()
  const url = `${process.env.NEXT_PUBLIC_URL_SERVER}/products?${query ? `?${query}` : ''}`

  try {
    const res = await fetch(url, { cache: 'no-cache' })
    if (res.ok) return res.json()
    console.error('Failed to fetch products', res.status)
    return []
  } catch (error) {
    console.error('Error fetching products', error)
    return []
  }
}

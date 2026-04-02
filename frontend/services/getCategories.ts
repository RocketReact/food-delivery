export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/products/categories`, { cache: 'no-cache' })
    if (res.ok) return res.json()
    return []
  } catch (error) {
    console.error('Failed to get category list', error)
    return []
  }
}
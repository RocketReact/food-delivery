export async function getShops(): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_SERVER}/products/shops`,
      {
        cache: 'no-store',
      },
    )
    if (res.ok) return res.json()
    return []
  } catch {
    return []
  }
}

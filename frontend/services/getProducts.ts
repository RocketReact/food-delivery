import { Filters, Product } from '../types/types'

export interface PaginatedProducts {
  data: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export async function getProducts(
  filters?: Filters,
): Promise<PaginatedProducts> {
  const params = new URLSearchParams()
  if (filters?.storeName) params.set('storeName', filters.storeName)
  if (filters?.category) params.set('category', filters.category)
  if (filters?.sort) params.set('sort', filters.sort)
  if (filters?.page) params.set('page', filters.page.toString())
  const query = params.toString()
  const url = `${process.env.NEXT_PUBLIC_URL_SERVER}/products${query ? `?${query}` : ''}`

  try {
    const res = await fetch(url, { cache: 'no-cache' })
    if (res.ok) return res.json()
    console.error('Failed to fetch products', res.status)
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }
  } catch (error) {
    console.error('Error fetching products', error)
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }
  }
}

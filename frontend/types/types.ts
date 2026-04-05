export type Shop = {
  _id: string
  name: string
  rating?: number
  deliveryTime?: string
}
export type FiltersProps = {
  storeName?: string
  shops?: Shop[]
  category?: string
  categories?: string[]
  sort?: string
  rating?: string
}

export type FiltersData = {
  shops: Shop[]
  categories: string[]
  storeName?: string
  category?: string
  sort?: string,
  rating?: string
}

export type Filters = {
  storeName?: string,
  category?: string,
  sort?: string,
  page?: number,
}
export type Product = {
  _id: string
  name: string
  price: number
  image?: string
}
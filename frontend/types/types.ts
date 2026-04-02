export type Shop = {
  _id: string
  name: string
  rating?: number
  deliveryTime?: string
}
export type FiltersProps = {
  storeName?: string
  category?: string
  categories?: string[]
  shops?: Shop[]
}

export type Filters = {
  storeName?: string,
  category?: string,
}
export type Product = {
  _id: string
  name: string
  price: number
  image?: string
}
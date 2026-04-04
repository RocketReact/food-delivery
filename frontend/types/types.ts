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
import Image from 'next/image'
import css from './page.module.css'
import Filters from '../components/Filters/Filters'
import ProductCard from '../components/AddToCard/AddToCard.client'

type Product = {
  _id: string
  name: string
  price: number
  image?: string
}

export default async function Home({
                                     searchParams,
                                   }: {
  searchParams: Promise<{ storeName?: string; category?: string }>
}) {
  const { storeName, category } = await searchParams

  const params = new URLSearchParams()
  if (storeName) params.set('storeName', storeName)
  if (category) params.set('category', category)

  const query = params.toString()
  const url = `${process.env.URL_SERVER}/products${query ? `?${query}` : ''}`

  let products: Product[] = []

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (res.ok) {
      products = await res.json()
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }

  return (
    <div className={css.mainHomeContainer}>
      <Filters variant="desktop" />

      <div className={css.grid}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={product._id} className={css.product}>
              <div className={css.imageWrapper}>
                <Image
                  src={product.image || '/placeholder.png'}
                  fill
                  sizes="(min-width: 768px) 50vw"
                  alt={product.name}
                  priority={index < 3}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <p>{product.name}</p>
              <p>{product.price}$</p>
              <ProductCard product={product} className={css.buyBtn} />{' '}
            </div>
          ))
        ) : (
          <p>Products not found</p>
        )}
      </div>
    </div>
  )
}

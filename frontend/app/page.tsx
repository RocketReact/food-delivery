import Image from 'next/image'
import css from './page.module.css'
import Filters from '../components/Filters/Filters'
import FiltersSync from '../components/Filters/FiltersSync'
import ProductCard from '../components/AddToCard/AddToCard.client'
import { getShops } from '../services/getShops'
import { getProducts } from '../services/getProducts'
import { getCategories } from '../services/getCategories'
import Pagination from '../components/Pagination/Pagination.client'
import AddToCard from '../components/AddToCard/AddToCard.client'

export default async function Home({
                                     searchParams,
                                   }: {
  searchParams: Promise<{ storeName?: string; category?: string; sort?: string; rating?: string; page?: string }>
}) {
  const { storeName, category, sort, rating, page } = await searchParams
  const shops = await getShops(rating)
  const { data: products, pagination } = await getProducts({
    storeName,
    category,
    sort,
    rating,
    page: page ? parseInt(page) : 1,
  })
  const categories = await getCategories()
  return (
    <div className={css.mainHomeContainer}>
      <FiltersSync
        shops={shops}
        categories={categories}
        storeName={storeName}
        category={category}
        sort={sort}
        rating={rating}
      />
      <Filters
        shops={shops}
        storeName={storeName}
        category={category}
        categories={categories}
        sort={sort}
        rating={rating}
      />

      <div className={css.gridPaginationContainer}>
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
                <p className={css.price}>{product.price}$</p>
                <AddToCard product={product} className={css.buyBtn} />{' '}
              </div>
            ))
          ) : (
            <p className={css.notFound}>Products not found</p>
          )}
        </div>
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={pagination.page}
        />
      </div>
    </div>
  )
}

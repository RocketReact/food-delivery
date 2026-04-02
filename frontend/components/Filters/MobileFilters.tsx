'use client'
import css from './Filters.module.css'
import Link from 'next/link'
import { useFilters } from '../../context/FiltersContext'

function buildHref(params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value)
    }
  }
  return `/?${searchParams.toString()}`
}

export default function MobileFilters() {
  const { data: { shops, categories, storeName, category } } = useFilters()

  return (
    <div className={css.mobileShops}>
      <p className={css.mobileTitle}>Shops:</p>
      <ul className={css.mobileShopsList}>
        {shops.map(shop => (
          <li key={shop._id}>
            <Link
              href={buildHref({ storeName: shop.name, category })}
              className={`${css.mobileShopLink} ${
                storeName === shop.name ? css.active : ''
              }`}
            >
              {shop.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
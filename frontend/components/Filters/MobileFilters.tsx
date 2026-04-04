'use client'
import css from './Filters.module.css'
import Link from 'next/link'
import { useFilters } from '../../context/FiltersContext'
import { buildHref } from '../../utils/buildHref'


export default function MobileFilters() {
  const { data: { shops, categories, storeName, category } } = useFilters()

  return (
    <div className={css.mobileShops}>
      <ul className={css.mobileShopsList}>
        <p className={css.mobileTitle}>Shops:</p>
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
        <p className={css.mobileTitle}>Categories:</p>
        {categories.map(cat => (
          <li key={cat}>
            <Link
              href={buildHref({ storeName, category: cat })}
              className={`${css.mobileShopLink} ${
                cat === category ? css.active : ''
              }`}
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
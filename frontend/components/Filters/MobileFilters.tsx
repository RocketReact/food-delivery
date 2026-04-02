'use client'
import css from './Filters.module.css'
import Link from 'next/link'
import { useFilters } from '../../context/FiltersContext'
import { buildHref } from '../../utils/buildHref'


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
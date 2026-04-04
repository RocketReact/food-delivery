import css from './Filters.module.css'
import Link from 'next/link'
import { FiltersProps } from '../../types/types'
import { buildHref } from '../../utils/buildHref'

export default function Filters({
                                  shops = [],
                                  storeName,
                                  category,
                                  categories = [],
                                }: FiltersProps) {
  return (
    <div className={css.sideShops}>
      <ul className={css.shopsList}>
        <p className={css.titleShops}>Shops:</p>
        {shops.map(shop => (
          <li key={shop._id}>
            <Link
              href={buildHref({ storeName: shop.name, category })}
              className={storeName === shop.name ? css.active : ''}
            >
              {shop.name}
            </Link>
          </li>
        ))}
        <p className={css.titleShops}>Categories:</p>
        {categories.map(cat => (
          <li key={cat}>
            <Link
              href={buildHref({ storeName, category: cat })}
              className={cat === category ? css.active : ''}
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
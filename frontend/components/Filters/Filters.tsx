import css from './Filters.module.css'
import Link from 'next/link'
import { FiltersProps } from '../../types/types'
import { buildHref } from '../../utils/buildHref'

export default function Filters({
                                  shops = [],
                                  storeName,
                                  category,
                                  categories,
                                }: FiltersProps) {
  return (
    <div className={css.sideShops}>
      <p className={css.titleShops}>Shops:</p>
      <ul className={css.shopsList}>
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
      </ul>
    </div>
  )
}
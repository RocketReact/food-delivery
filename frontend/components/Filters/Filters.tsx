import css from './Filters.module.css'
import Link from 'next/link'
import { getShops } from '../services/getShops'

type FiltersProps = {
  variant: 'desktop' | 'mobile'
}

export default async function Filters({ variant }: FiltersProps) {
  const shops = await getShops()

  if (variant === 'mobile') {
    return (
      <div className={css.mobileShops}>
        <p className={css.mobileTitle}>Shops:</p>
        <ul className={css.mobileShopsList}>
          {shops.map(shop => (
            <li key={shop}>
              <Link
                href={{ pathname: '/', query: { storeName: shop } }}
                className={css.mobileShopLink}
              >
                {shop}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className={css.sideShops}>
      <p className={css.titleShops}>Shops:</p>
      <ul className={css.shopsList}>
        {shops.map(shop => (
          <li key={shop}>
            <Link
              href={{ pathname: '/', query: { storeName: shop } }}
            >
              {shop}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
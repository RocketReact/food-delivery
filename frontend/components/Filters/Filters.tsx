import css from './Filters.module.css'
import Link from 'next/link'
import { getShops } from '../services/getShops'
import ShopsFilterDesktopClient from './ShopsFilterDesktop.client'

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
                className={css.mobileShopLink}
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
  return <ShopsFilterDesktopClient />
}
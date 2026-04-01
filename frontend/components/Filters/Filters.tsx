'use client'
import css from './Filters.module.css'
import { getShops } from '../services/getShops'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type FiltersProps = {
  variant: 'desktop' | 'mobile'
}

export default function Filters({ variant }: FiltersProps) {
  const [shops, setShops] = useState<string[]>([])
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const storeName = searchParams.get('storeName')
  const router = useRouter()
  useEffect(() => {
    getShops().then(data => setShops(data))
  }, [])

  if (variant === 'mobile') {
    return (
      <div className={css.mobileShops}>
        <p className={css.mobileTitle}>Shops:</p>
        <ul className={css.mobileShopsList}>
          {shops.map(shop => (
            <li
              key={shop}
              className={`${css.mobileShopLink} ${
                pathname === '/' && storeName === shop ? css.active : ''
              }`}
              onClick={() => {
                const params = new URLSearchParams({ storeName: shop })
                router.push(`/?${params.toString()}`)
              }}
            >
              {shop}
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
          <li
            key={shop}
            className={pathname === '/' && storeName === shop ? css.active : ''}
            onClick={() => {
              const params = new URLSearchParams({ storeName: shop })
              router.push(`/?${params.toString()}`)
            }}
          >
            {shop}
          </li>
        ))}
      </ul>
    </div>
  )
}
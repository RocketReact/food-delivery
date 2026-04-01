'use client'

import { useEffect, useState } from 'react'
import css from './Filters.module.css'
import { usePathname, useSearchParams } from 'next/navigation'
import { getShops } from '../services/getShops'
import { useRouter } from 'next/navigation'

export default function ShopsFilterDesktopClient() {
  const [shops, setShops] = useState<string[]>([])
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const storeName = searchParams.get('storeName')
  const router = useRouter()
  useEffect(() => {
    getShops().then(data => setShops(data))
  }, [])

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

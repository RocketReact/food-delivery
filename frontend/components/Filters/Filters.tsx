'use client'
import css from './Filters.module.css'
import Link from 'next/link'
import { FiltersProps } from '../../types/types'
import { buildHref } from '../../utils/buildHref'
import { FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'

export default function Filters({
                                  shops = [],
                                  storeName,
                                  category,
                                  categories = [],
                                }: FiltersProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={css.sideShops}>
      <ul className={css.categoriesInner}>
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
      </ul>
      <div className={css.titlePlusIcon}>
        <p className={css.titleShops}>Categories</p>
        <FiChevronDown
          onClick={() => setIsOpen(prev => !prev)}
          size={20}
          className={`${css.chevron} ${isOpen ? css.chevronOpen : ''}`}
        />
      </div>
      <div className={`${css.categoriesWrapper} ${isOpen ? css.open : ''}`}>
        <ul className={css.categoriesInner}>
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
    </div>
  )
}
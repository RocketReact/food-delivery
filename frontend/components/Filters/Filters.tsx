'use client'
import css from './Filters.module.css'
import Link from 'next/link'
import { FiltersProps } from '../../types/types'
import { buildHref } from '../../utils/buildHref'
import { FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Filters({
                                  shops = [],
                                  storeName,
                                  category,
                                  categories = [],
                                  sort,
                                }: FiltersProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false)
  const router = useRouter()
  return (
    <div className={css.sideShops}>
      <ul className={css.categoriesInner}>
        <p className={css.titleFilters}>Shops:</p>
        {shops.map(shop => (
          <li key={shop._id}>
            <Link
              href={buildHref({ storeName: shop.name, category, sort })}
              className={storeName === shop.name ? css.active : ''}
            >
              {shop.name}
            </Link>
          </li>
        ))}
      </ul>
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className={css.titlePlusIcon}
      >
        <p className={css.titleFilters}>Categories</p>
        <FiChevronDown
          size={20}
          className={`${css.chevron} ${isOpen ? css.chevronOpen : ''}`}
        />
      </div>
      <div className={`${css.categoriesWrapper} ${isOpen ? css.open : ''}`}>
        <ul className={`${css.categoriesInner} ${css.collapsible}`}>
          {categories.map(cat => (
            <li key={cat}>
              <Link
                href={buildHref({ storeName, category: cat, sort })}
                className={cat === category ? css.active : ''}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setIsOpenSort(prev => !prev)}
        className={css.titlePlusIcon}
      >
        <p className={css.titleFilters}>Sort By</p>
        <FiChevronDown
          size={20}
          className={`${css.chevron} ${isOpenSort ? css.chevronOpen : ''}`}
        />
      </div>
      <div className={`${css.categoriesWrapper} ${isOpenSort ? css.open : ''}`}>
        <div className={css.collapsible}>
          <label className={css.sortLabel}>
            <input
              className={css.radio}
              type="radio"
              name="sort"
              value="price_asc"
              checked={sort === 'price_asc'}
              onChange={() =>
                router.push(
                  buildHref({ storeName, category, sort: 'price_asc' }),
                )
              }
            />
            Price ↑
          </label>
          <label className={css.sortLabel}>
            <input
              className={css.radio}
              type="radio"
              name="sort"
              value="price_desc"
              checked={sort === 'price_desc'}
              onChange={() =>
                router.push(
                  buildHref({ storeName, category, sort: 'price_desc' }),
                )
              }
            />
            Price ↓
          </label>
          <label className={css.sortLabel}>
            <input
              className={css.radio}
              type="radio"
              name="sort"
              value="name_asc"
              checked={sort === 'name_asc'}
              onChange={() =>
                router.push(
                  buildHref({ storeName, category, sort: 'name_asc' }),
                )
              }
            />
            Name A→Z
          </label>
        </div>
      </div>
      <button
        onClick={() => router.push('/')}
        className={`${css.btnClear} ${css.btnClearDesktop}`}
      >
        Clear Filters
      </button>
    </div>
  )
}
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
                                  rating,
                                }: FiltersProps) {
  const [isOpenCategories, setIsOpenCategories] = useState<boolean>(false)
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false)
  const [isOpenRatingDesktopFilter, setIsOpenRatingDesktopFilter] =
    useState<boolean>(false)
  const router = useRouter()
  return (
    <div className={css.sideShops}>
      <ul className={css.categoriesInner}>
        <p className={css.titleFilters}>Shops:</p>
        {shops.map(shop => (
          <li key={shop._id}>
            <a
              onClick={() =>
                router.push(
                  buildHref({
                    storeName: storeName === shop.name ? undefined : shop.name,
                    category,
                    sort,
                    rating,
                  }),
                )
              }
              className={storeName === shop.name ? css.active : ''}
            >
              {shop.name}
            </a>
          </li>
        ))}
      </ul>
      <div
        onClick={() => setIsOpenRatingDesktopFilter(prev => !prev)}
        className={css.titlePlusIcon}
      >
        <p className={css.titleFilters}> Shops by rating</p>
        <FiChevronDown
          size={20}
          className={`${css.chevron} ${isOpenRatingDesktopFilter ? css.chevronOpen : ''}`}
        />
      </div>
      <div
        className={`${css.categoriesWrapper} ${isOpenRatingDesktopFilter ? css.open : ''}`}
      >
        <div className={css.collapsible}>
          <label className={css.sortLabel}>
            <input
              className={css.radio}
              type="radio"
              name="ratingDesktopFilter"
              value="4"
              checked={rating === '4'}
              readOnly
              onClick={() =>
                router.push(
                  buildHref({
                    storeName,
                    category,
                    sort,
                    rating: rating === '4' ? undefined : '4',
                  }),
                )
              }
            />
            4.0 - 5.0
          </label>
          <label className={css.sortLabel}>
            <input
              className={css.radio}
              type="radio"
              name="ratingDesktopFilter"
              value="3"
              checked={rating === '3'}
              readOnly
              onClick={() =>
                router.push(
                  buildHref({
                    storeName,
                    category,
                    sort,
                    rating: rating === '3' ? undefined : '3',
                  }),
                )
              }
            />
            3.0 - 4.0
          </label>
          <label className={css.sortLabel}>
            <input
              className={css.radio}
              type="radio"
              name="ratingDesktopFilter"
              value="2"
              checked={rating === '2'}
              readOnly
              onClick={() =>
                router.push(
                  buildHref({
                    storeName,
                    category,
                    sort,
                    rating: rating === '2' ? undefined : '2',
                  }),
                )
              }
            />
            2.0 - 3.0
          </label>
        </div>
      </div>
      <div
        onClick={() => setIsOpenCategories(prev => !prev)}
        className={css.titlePlusIcon}
      >
        <p className={css.titleFilters}>Categories</p>
        <FiChevronDown
          size={20}
          className={`${css.chevron} ${isOpenCategories ? css.chevronOpen : ''}`}
        />
      </div>
      <div
        className={`${css.categoriesWrapper} ${isOpenCategories ? css.open : ''}`}
      >
        <ul className={`${css.categoriesInner} ${css.collapsible}`}>
          {categories.map(cat => (
            <li key={cat}>
              <a
                onClick={() =>
                  router.push(
                    buildHref({
                      storeName,
                      category: category === cat ? undefined : cat,
                      sort,
                      rating,
                    }),
                  )
                }
                className={cat === category ? css.active : ''}
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setIsOpenSort(prev => !prev)}
        className={css.titlePlusIcon}
      >
        <p className={css.titleFilters}> Sort products by</p>
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
              readOnly
              onClick={() =>
                router.push(
                  buildHref({
                    storeName,
                    category,
                    rating,
                    sort: sort === 'price_asc' ? undefined : 'price_asc',
                  }),
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
              readOnly
              onClick={() =>
                router.push(
                  buildHref({
                    storeName,
                    category,
                    rating,
                    sort: sort === 'price_desc' ? undefined : 'price_desc',
                  }),
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
              readOnly
              onClick={() =>
                router.push(
                  buildHref({
                    storeName,
                    category,
                    rating,
                    sort: sort === 'name_asc' ? undefined : 'name_asc',
                  }),
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

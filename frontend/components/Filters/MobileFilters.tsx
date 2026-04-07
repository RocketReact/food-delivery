'use client'
import css from './Filters.module.css'

import { useFilters } from '../../context/FiltersContext'
import { buildHref } from '../../utils/buildHref'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Mobile filter panel — local state applied on "Apply Filters" click
export default function MobileFilters({
                                        onCloseAction,
                                      }: {
  onCloseAction?: () => void
}) {
  const {
    data: { shops, categories, storeName, category, sort, rating },
  } = useFilters()

  // Collapsible section toggles
  const [isOpenCategories, setIsOpenCategories] = useState<boolean>(false)
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false)
  const [isOpenRatingFilter, setIsOpenRatingFilter] = useState<boolean>(false)

  // Local filter state, initialized from URL params
  const [selectedShop, setSelectedShop] = useState<string | undefined>(
    storeName,
  )
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  )
  const [selectedSort, setSelectedSort] = useState<string | undefined>(sort)
  const [selectedRating, setSelectedRating] = useState<string | undefined>(
    rating,
  )
  const router = useRouter()

  // Toggle handlers — re-click deselects the active filter
  const toggleCategory = (cat: string) => {
    setSelectedCategory(prev => (prev === cat ? undefined : cat))
  }
  const toggleShop = (shop: string) => {
    setSelectedShop(prev => (prev === shop ? undefined : shop))
  }
  const toggleRating = (rating: string) => {
    setSelectedRating(prev => (prev === rating ? undefined : rating))
  }

  const applyFilters = () => {
    router.push(
      buildHref({
        storeName: selectedShop,
        category: selectedCategory,
        sort: selectedSort,
        rating: selectedRating,
      }),
    )
    onCloseAction?.()
  }
  const clearFilters = () => {
    setSelectedShop(undefined)
    setSelectedCategory(undefined)
    setSelectedSort(undefined)
    setSelectedRating(undefined)
    router.push('/')
  }
  return (
    <div className={css.mobileShops}>
      <p className={css.mobileTitle}>Shops:</p>
      <ul className={css.mobileShopsList}>
        {shops.map(shop => (
          <li key={shop._id}>
            <button
              onClick={() => toggleShop(shop.name)}
              className={`${css.mobileShopLink} ${
                selectedShop === shop.name ? css.active : ''
              }`}
            >
              {shop.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={css.mobileShopsList}>
        <div
          onClick={() => setIsOpenRatingFilter(prev => !prev)}
          className={css.titlePlusIcon}
        >
          <p className={css.mobileTitle}>Shops rating by</p>
          <FiChevronDown
            size={20}
            className={`${css.chevron} ${isOpenRatingFilter ? css.chevronOpen : ''}`}
          />
        </div>

        <div
          className={`${css.categoriesWrapper} ${isOpenRatingFilter ? css.open : ''}`}
        >
          <div className={`${css.collapsible} ${css.collapsibleMobile}`}>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-filter-rating"
                value="4"
                checked={selectedRating === '4'}
                onChange={() => {
                }}
                onClick={() => toggleRating('4')}
              />
              4.0 - 5.0
            </label>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-filter-rating"
                value="3"
                checked={selectedRating === '3'}
                onChange={() => {
                }}
                onClick={() => toggleRating('3')}
              />
              3.0 - 4.0
            </label>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-filter-rating"
                value="2"
                checked={selectedRating === '2'}
                onChange={() => {
                }}
                onClick={() => toggleRating('2')}
              />
              2.0 - 3.0
            </label>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsOpenCategories(prev => !prev)}
        className={css.titlePlusIcon}
      >
        <p className={css.mobileTitle}>Categories</p>
        <FiChevronDown
          size={20}
          className={`${css.chevron} ${isOpenCategories ? css.chevronOpen : ''}`}
        />
      </div>
      <div className={css.mobileShopsList}>
        <div
          className={`${css.categoriesWrapper} ${isOpenCategories ? css.open : ''}`}
        >
          <ul className={css.collapsible}>
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => toggleCategory(cat)}
                  className={`${css.mobileShopLink} ${
                    selectedCategory === cat ? css.active : ''
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.mobileShopsList}>
        <div
          onClick={() => setIsOpenSort(prev => !prev)}
          className={css.titlePlusIcon}
        >
          <p className={css.mobileTitle}>Sort products by</p>
          <FiChevronDown
            size={20}
            className={`${css.chevron} ${isOpenSort ? css.chevronOpen : ''}`}
          />
        </div>

        <div
          className={`${css.categoriesWrapper} ${isOpenSort ? css.open : ''}`}
        >
          <div className={`${css.collapsible} ${css.collapsibleMobile}`}>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-sort"
                value="price_asc"
                checked={selectedSort === 'price_asc'}
                onChange={() => {
                }}
                onClick={() =>
                  setSelectedSort(prev =>
                    prev === 'price_asc' ? undefined : 'price_asc',
                  )
                }
              />
              Price ↑
            </label>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-sort"
                value="price_desc"
                checked={selectedSort === 'price_desc'}
                onChange={() => {
                }}
                onClick={() =>
                  setSelectedSort(prev =>
                    prev === 'price_desc' ? undefined : 'price_desc',
                  )
                }
              />
              Price ↓
            </label>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-sort"
                value="name_asc"
                checked={selectedSort === 'name_asc'}
                onChange={() => {
                }}
                onClick={() =>
                  setSelectedSort(prev =>
                    prev === 'name_asc' ? undefined : 'name_asc',
                  )
                }
              />
              Name A→Z
            </label>
          </div>
        </div>
      </div>
      <button onClick={applyFilters} className={css.btnApply}>
        Apply Filters
      </button>
      <button onClick={clearFilters} className={css.btnClear}>
        Clear Filters
      </button>
      <Link
        className={css.mobileShopLink}
        onClick={() => onCloseAction?.()}
        href="/orders-history"
      >
        Orders history
      </Link>
      <Link
        className={`${css.mobileShopLink} ${css.btnCoupon}`}
        onClick={() => onCloseAction?.()}
        href="/coupons"
      >
        Coupons
      </Link>
    </div>
  )
}

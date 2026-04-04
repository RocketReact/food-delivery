'use client'
import css from './Filters.module.css'

import { useFilters } from '../../context/FiltersContext'
import { buildHref } from '../../utils/buildHref'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function MobileFilters({ onCloseAction }: { onCloseAction?: () => void }) {
  const {
    data: { shops, categories, storeName, category, sort },
  } = useFilters()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false)
  const [selectedShop, setSelectedShop] = useState<string | undefined>(
    storeName,
  )
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  )
  const [selectedSort, setSelectedSort] = useState<string | undefined>(sort)
  const router = useRouter()

  const toggleCategory = (cat: string) => {
    setSelectedCategory(prev => (prev === cat ? undefined : cat))
  }
  const toggleShop = (shop: string) => {
    setSelectedShop(prev => (prev === shop ? undefined : shop))
  }

  const applyFilters = () => {
    router.push(
      buildHref({
        storeName: selectedShop,
        category: selectedCategory,
        sort: selectedSort,
      }),
    )
    onCloseAction?.()
  }
  const clearFilters = () => {
    setSelectedShop(undefined)
    setSelectedCategory(undefined)
    setSelectedSort(undefined)
  }
  return (
    <div className={css.mobileShops}>
      <ul className={css.mobileShopsList}>
        <p className={css.mobileTitle}>Shops:</p>
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
      <ul className={css.mobileShopsList}>
        <div
          onClick={() => setIsOpen(prev => !prev)}
          className={css.titlePlusIcon}
        >
          <p className={css.mobileTitle}>Categories</p>
          <FiChevronDown
            size={20}
            className={`${css.chevron} ${isOpen ? css.chevronOpen : ''}`}
          />
        </div>

        <div className={`${css.categoriesWrapper} ${isOpen ? css.open : ''}`}>
          <div className={css.collapsible}>
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
          </div>
        </div>
        
      </ul>
      <div className={css.mobileShopsList}>
        <div
          onClick={() => setIsOpenSort(prev => !prev)}
          className={css.titlePlusIcon}
        >
          <p className={css.mobileTitle}>Sort By</p>
          <FiChevronDown
            size={20}
            className={`${css.chevron} ${isOpenSort ? css.chevronOpen : ''}`}
          />
        </div>

        <div className={`${css.categoriesWrapper} ${isOpenSort ? css.open : ''}`}>
          <div className={`${css.collapsible} ${css.collapsibleMobile}`}>
            <label className={css.sortLabel}>
              <input
                className={css.radio}
                type="radio"
                name="mobile-sort"
                value="price_asc"
                checked={selectedSort === 'price_asc'}
                onChange={() => setSelectedSort('price_asc')}
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
                onChange={() => setSelectedSort('price_desc')}
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
                onChange={() => setSelectedSort('name_asc')}
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
    </div>
  )
}

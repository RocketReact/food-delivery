'use client'
import css from './Filters.module.css'

import { useFilters } from '../../context/FiltersContext'
import { buildHref } from '../../utils/buildHref'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function MobileFilters({ onClose }: { onClose?: () => void }) {
  const {
    data: { shops, categories, storeName, category },
  } = useFilters()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedShop, setSelectedShop] = useState<string | undefined>(
    storeName,
  )
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  )
  const router = useRouter()

  const toggleCategory = (cat: string) => {
    setSelectedCategory(prev => (prev === cat ? undefined : cat))
  }
  const toggleShop = (shop: string) => {
    setSelectedShop(prev => (prev === shop ? undefined : shop))
  }
  const applyFilters = () => {
    router.push(
      buildHref({ storeName: selectedShop, category: selectedCategory }),
    )
    onClose?.()
  }
  const clearFilters = () => {
    setSelectedShop(undefined)
    setSelectedCategory(undefined)
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
        {isOpen &&
          categories.map(cat => (
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
      <button onClick={applyFilters} className={css.btnApply}>
        Apply Filters
      </button>
      <button onClick={clearFilters} className={css.btnClear}>
        Clear Filters
      </button>
    </div>
  )
}

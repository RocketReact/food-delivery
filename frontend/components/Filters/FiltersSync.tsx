'use client'
import { useEffect } from 'react'
import { useFilters } from '../../context/FiltersContext'
import { Shop } from '../../types/types'

type Props = {
  shops: Shop[]
  categories: string[]
  storeName?: string
  category?: string
}

export default function FiltersSync({ shops, categories, storeName, category }: Props) {
  const { setData } = useFilters()

  useEffect(() => {
    setData({ shops, categories, storeName, category })
  }, [shops, categories, storeName, category, setData])

  return null
}
'use client'
import { useEffect } from 'react'
import { useFilters } from '../../context/FiltersContext'
import { FiltersProps } from '../../types/types'


export default function FiltersSync({ shops = [], categories = [], storeName, category, sort, rating }: FiltersProps) {
  const { setData } = useFilters()

  useEffect(() => {
    setData({ shops, categories, storeName, category, sort, rating })
  }, [shops, categories, storeName, category, sort, rating, setData])

  return null
}
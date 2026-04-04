'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { FiltersData } from '../types/types'

type FiltersContextType = {
  data: FiltersData
  setData: (data: FiltersData) => void
}

const FiltersContext = createContext<FiltersContextType | null>(null)

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FiltersData>({
    shops: [],
    categories: [],
  })

  return (
    <FiltersContext.Provider value={{ data, setData }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider')
  return ctx
}
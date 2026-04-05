'use client'
import css from './Pagination.module.css'
import { useRouter, useSearchParams } from 'next/navigation'

type PaginationType = {
  totalPages: number
  currentPage: number
}

export default function Pagination({
                                     totalPages,
                                     currentPage,
                                   }: PaginationType) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }
  if (totalPages <= 1) return null
  return (
    <div className={css.mainPaginationContainer}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {' '}
        Prev
      </button>
      {Array.from({ length: totalPages }, (_: unknown, i: number) => i + 1).map(
        (num: number) => (
          <button
            key={num}
            className={num === currentPage ? css.active : ''}
            onClick={() => goToPage(num)}
          >
            {num}
          </button>
        ),
      )}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

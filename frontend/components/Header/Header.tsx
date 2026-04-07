'use client'
import css from './Header.module.css'
import Image from 'next/image'
import icon from '../../public/logo-delivery.png'
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from 'react-icons/hi'
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import MobileFilters from '../Filters/MobileFilters'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset'
  }

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <ul className={css.headerTextContainer}>
          <li className={pathname === '/' ? css.active : ''}>
            <Link href="/">Shop </Link>
          </li>
          <li className={pathname === '/cart' ? css.active : ''}>
            <Link href="/cart">Shopping Cart</Link>
          </li>
          <li className={pathname === '/orders-history' ? css.active : ''}>
            <Link href="/orders-history">History</Link>
          </li>
          <li className={pathname === '/coupons' ? css.active : ''}>
            <Link href="/coupons">Coupons</Link>
          </li>
        </ul>

        <Link href="/cart" className={css.cart} aria-label="Shopping cart">
          <HiOutlineShoppingCart size={25} color="#df2727" />
        </Link>

        <div className={css.logoDiv}>
          <Link href="/">
            <Image src={icon} height={40} alt="logo" priority />
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className={css.burgerBtn}
          aria-label="toggle-menu"
        >
          <HiOutlineMenu size={30} />
        </button>
        <Link href="/login" className={css.loginLink} aria-label="Login">
          <HiOutlineArrowRightOnRectangle size={30} />
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className={css.backdrop}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className={css.menu}
            >
              <button
                onClick={toggleMenu}
                className={css.closeBtn}
                aria-label="close-menu"
              >
                <HiOutlineX size={28} />
              </button>
              <div className={css.filtersMenuWrap}>
                <MobileFilters onCloseAction={toggleMenu} />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
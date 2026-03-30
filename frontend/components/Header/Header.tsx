'use client'
import css from './Header.module.css'
import Image from 'next/image'
import icon from '../../public/logo-delivery.png'
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from 'react-icons/hi'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

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
          <Link href="/">
            <li className={pathname === '/' ? css.active : ''}>Shop</li>
          </Link>
          <Link href="/cart">
            <li className={pathname === '/cart' ? css.active : ''}>
              Shopping Cart
            </li>
          </Link>
        </ul>
        <Link href="/cart" className={css.cart}>
          <HiOutlineShoppingCart size={25} color="#df2727" />
        </Link>

        <div className={css.logoDiv}>
          <Link href="/">
            <Image src={icon} height={40} alt="logo" priority />
          </Link>
        </div>

        <button onClick={toggleMenu} className={css.burgerBtn} aria-label="toggle-menu">
          <HiOutlineMenu size={30} />
        </button>
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
              <button onClick={toggleMenu} className={css.closeBtn} aria-label="close-menu">
                <HiOutlineX size={28} />
              </button>
              <ul className={css.mobileMenuTextContainer}>
                <li>
                  <Link
                    href="/"
                    className={css.mobileMenuText}
                    onClick={toggleMenu}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className={css.mobileMenuText}
                    onClick={toggleMenu}
                  >
                    Shopping Cart <HiOutlineShoppingCart />
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
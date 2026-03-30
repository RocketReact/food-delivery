'use client'
import css from './Header.module.css'
import Image from 'next/image'
import icon from '../../public/logo-delivery.png'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset'
  }
  return (
    <header>
      <div className={css.header}>
        <Image src={icon} height={60} alt='logo' />
        <button
          onClick={toggleMenu}
          className={css.burgerBtn}
          aria-label='toggle-menu'
        >
          <div className={css.iconContainer}>
            <HiOutlineX
              size={30}
              className={`${css.icon} ${isOpen ? css.visible : css.hidden}`}
            />
            <HiOutlineMenu
              size={30}
              className={`${css.icon} ${isOpen ? css.hidden : css.visible}`}
            />
          </div>
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
              <ul>
                <li>Shop</li>
                <li>Cart</li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

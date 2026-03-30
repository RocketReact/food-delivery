'use client'
import css from './Header.module.css'
import Image from 'next/image'
import icon from '../../public/logo-delivery.png'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import React from 'react'
export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <header>
      <div className={css.header}>
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
        <Image src={icon} height={60} alt='logo' />
      </div>
      {isOpen && (
        <nav className={css.mobileMenu}>
          <ul>
            <li>Shop</li>
            <li>Shopping cart</li>
          </ul>
        </nav>
      )}
    </header>
  )
}

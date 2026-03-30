'use client'
import css from './Header.module.css'
import Image from 'next/image'
import icon from '../../public/logo-delivery.png'
import {
  HiOutlineShoppingCart,
} from 'react-icons/hi'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
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
      </div>
    </header>
  )
}

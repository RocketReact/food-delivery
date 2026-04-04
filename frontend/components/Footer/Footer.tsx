'use client'
import css from './Footer.module.css'
import { FaInstagram, FaFacebookSquare, FaApple } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={css.footerContainer}>
      <ul className={css.blockContainerFooter}>
        <h4>Contacts</h4>
        <li>
          <a href="mailto:support@fooddelivery.com">support@fooddelivery.com</a>
        </li>
        <li>
          <a href="tel:+1 (484) 123-4567">+1 (484) 123-4567</a>
        </li>
        <li>
          <p>1126 Queens Hwy, Long Beach, CA 90802, United States</p>
        </li>
      </ul>
      <div className={css.blockContainerFooter}>
        <h4 className={css.nowrap}>Follow us</h4>
        <ul className={css.row}>
          <li className={css.socialIcons}>
            <a
              href="https://instagram.com/fooddelivery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={30} />
            </a>
          </li>
          <li className={css.socialIcons}>
            <a
              href="https://facebook/fooddelivery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare size={30} />
            </a>
          </li>
        </ul>
      </div>
      <div className={css.blockContainerFooter}>
        <h4>Downloads</h4>
        <ul className={`${css.row} ${css.columnSocialDesktop}`}>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', height: 40, width: 130 }}
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                style={{ height: '100%' }}
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', height: 40 }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                style={{ height: '100%' }}
              />
            </a>
          </li>
        </ul>
      </div>

      <ul className={css.blockContainerFooter}>
        <h4>Links of interest</h4>
        <li>
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            About us
          </a>
        </li>
        <li>
          <a
            href="/faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQ
          </a>
        </li>
        <li>
          <a
            href="/frime"
            target="_blank"
            rel="noopener noreferrer"
          >
            Food Delivery Prime
          </a>
        </li>
        <li>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>
        <li>
          <a
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in
          </a>
        </li>
      </ul>
    </footer>
  )
}

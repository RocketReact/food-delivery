'use client'
import css from './page.module.css'
import toast from 'react-hot-toast'

export default function CouponsPage() {
    const handleCopy = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code)
            toast.success(`Code ${code} copied`)
        } catch {
            toast.error('Failed to copy')
        }
    }

    return (
        <ul className={css.mainContainerCoupons}>
            <li className={`${css.coupon} ${css.coupon1}`}>
                <p className={css.couponBadge}>Special</p>
                <p className={css.couponDiscount}>20% OFF</p>
                <p className={css.couponTitle}>First Order</p>
                <button
                    type="button"
                    onClick={() => handleCopy('WELCOME20')}
                    className={css.couponCode}
                    aria-label="Copy code WELCOME20"
                >
                    WELCOME20
                </button>
                <span className={css.couponHint}>click to copy</span>
            </li>
            <li className={`${css.coupon} ${css.coupon2}`}>
                <p className={css.couponBadge}>Limited</p>
                <p className={css.couponDiscount}>FREE</p>
                <p className={css.couponTitle}>Delivery</p>
                <button
                    type="button"
                    onClick={() => handleCopy('FREESHIP')}
                    className={css.couponCode}
                    aria-label="Copy code FREESHIP"
                >
                    FREESHIP
                </button>
                <span className={css.couponHint}>click to copy</span>
            </li>
            <li className={`${css.coupon} ${css.coupon3}`}>
                <p className={css.couponBadge}>Spring Only</p>
                <p className={css.couponDiscount}>1 + 1 = 3</p>
                <p className={css.couponTitle}>Buy 2 Burgers Get 3</p>
                <button
                    type="button"
                    onClick={() => handleCopy('SPRING3')}
                    className={css.couponCode}
                    aria-label="Copy code SPRING3"
                >
                    SPRING3
                </button>
                <span className={css.couponHint}>click to copy</span>
            </li>
        </ul>
    )
}

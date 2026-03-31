'use client'
import css from './page.module.css'
import { useCartStore } from '../../store/cartStore'
import Image from 'next/image'

export default function Cart() {
  const items = useCartStore(s => s.items)
  const clearCart = useCartStore(s => s.clearCart)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const removeFromCart = useCartStore(s => s.removeFromCart)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return (
    <div className={css.cartContainer}>
      <div className={css.itemsCol}>
        {items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {items.map(i => (
              <div className={css.itemInCard} key={i.productId}>
                <Image
                  src={i.image || '/placeholder.png'}
                  alt={i.name}
                  width={80}
                  height={80}
                />
                <div className={css.itemInfo}>
                  <p>{i.name}</p>
                  <p>{i.price}$</p>
                  <div className={css.qty}>
                    <button onClick={() => i.quantity === 1 ? removeFromCart(i.productId) : updateQuantity(i.productId, i.quantity - 1)}>−</button>
                    <input
                      type="number"
                      min={1}
                      value={i.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        if (!val || val < 1) return removeFromCart(i.productId)
                        updateQuantity(i.productId, val)
                      }}
                      className={css.qtyInput}
                    />
                    <button onClick={() => updateQuantity(i.productId, i.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
            <p className={css.total}>Total: {total.toFixed(2)}$</p>
            <button className={`${css.clearBtn} ${css.clearBtnMuted}`} onClick={clearCart}>Clear cart</button>
          </>
        )}
      </div>
      {items.length === 0 ? '' : (<div className={css.formCol}>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Phone" />
        <input placeholder="Address" />
        <button className={css.clearBtn}>Submit</button>
      </div>)}
    </div>
  )
}

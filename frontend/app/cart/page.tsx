'use client'
import css from './page.module.css'
import { useCartStore } from '../../store/cartStore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const orderSchema = z.object({
  name: z.string().min(2, { error: 'Min 2 characters' }),
  email: z.email({ error: 'Invalid email' }),
  phone: z.string().min(7, { error: 'Invalid phone' }),
  address: z.string().min(5, { error: 'Min 5 characters' }),
})

export type OrderForm = z.infer<typeof orderSchema>

export default function Cart() {
  const items = useCartStore(s => s.items)
  const clearCart = useCartStore(s => s.clearCart)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const removeFromCart = useCartStore(s => s.removeFromCart)
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const saved = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('order-form') || '{}')
    : {}

  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: saved,
  })

  const formValues = watch()
  useEffect(() => {
    localStorage.setItem('order-form', JSON.stringify(formValues))
  }, [formValues])

  const onSubmit = async (data: OrderForm) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: data,
          items: items.map(({ productId, ...rest }) => ({ id: productId, ...rest })),
          totalPrice: total,
        }),
      })
      if (!res.ok) {
        toast.error('Failed to place order')
        return
      }
      toast.success('Order placed! We will contact you shortly.', { duration: 6000 })
      clearCart()
    } catch {
      toast.error('Failed to place order')
    }
  }

  return (
    <div className={css.cartContainer}>
      <div className={css.itemsCol}>
        {items.length === 0 ? (
          <>
            <p>Cart is empty</p>
            <p>Please Add products to cart first</p>
          </>
        ) : (
          <>
            {items.map((i, index) => (
              <div key={i.productId} className={css.itemInCard}>
                <Image
                  src={i.image || '/placeholder.png'}
                  alt={i.name}
                  width={80}
                  height={80}
                  loading={index <= 3 ? 'eager' : 'lazy'}
                />
                <div className={css.itemInfo}>
                  <p>{i.name}</p>
                  <p>{i.price}$</p>
                  <div className={css.qty}>
                    <button
                      onClick={() => {
                        if (i.quantity <= 0) return
                        if (i.quantity === 1) {
                          removeFromCart(i.productId)
                        } else {
                          updateQuantity(i.productId, i.quantity - 1)
                        }
                        setInputValues(prev => {
                          const next = { ...prev }
                          delete next[i.productId]
                          return next
                        })
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={inputValues[i.productId] ?? i.quantity}
                      onChange={e => {
                        const raw = e.target.value
                        setInputValues(prev => ({
                          ...prev,
                          [i.productId]: raw,
                        }))
                        const val = parseInt(raw)
                        updateQuantity(
                          i.productId,
                          !isNaN(val) && val > 0 ? val : 0,
                        )
                      }}
                      onBlur={() => {
                        const val = parseInt(inputValues[i.productId])
                        if (isNaN(val) || val < 1) {
                          updateQuantity(i.productId, 1)
                        }
                        setInputValues(prev => {
                          const next = { ...prev }
                          delete next[i.productId]
                          return next
                        })
                      }}
                      className={css.qtyInput}
                    />
                    <button
                      onClick={() => {
                        updateQuantity(i.productId, Math.max(i.quantity, 0) + 1)
                        setInputValues(prev => {
                          const next = { ...prev }
                          delete next[i.productId]
                          return next
                        })
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              className={`${css.clearAndSubmitBtn} ${css.clearBtnMuted}`}
              onClick={() => {
                clearCart()
                toast.success('Cart is empty! Continue shopping!', {})
              }}
            >
              Clear cart
            </button>
          </>
        )}
      </div>
      {items.length > 0 && (
        <form className={css.formCol} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input placeholder="Name" {...register('name')} />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
          <div>
            <input placeholder="Email" {...register('email')} />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <input placeholder="Phone" {...register('phone')} />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>
          <div>
            <input placeholder="Address" {...register('address')} />
            {errors.address && (
              <p className={css.error}>{errors.address.message}</p>
            )}
          </div>
          <p className={css.total}>Total: {total.toFixed(2)}$</p>
          <button type="submit" className={css.clearAndSubmitBtn}>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
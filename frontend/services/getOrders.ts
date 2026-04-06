import { CartItem } from '../types/types'
import { OrderForm } from '../app/cart/page'
import { OrderFind } from '../app/orders-history/page'

export type OrdersResProps = {
  _id: string
  customer: OrderForm
  items: CartItem[]
  totalPrice: number
  created_at: string
}

export async function getOrders(orderData?: OrderFind): Promise<OrdersResProps[]> {
  const params = new URLSearchParams()

  if (orderData?._id) params.set('_id', orderData._id)
  if (orderData?.email) params.set('email', orderData.email)
  if (orderData?.phone) params.set('phone', orderData.phone)

  const query = params.toString()
  const url = `${process.env.NEXT_PUBLIC_URL_SERVER}/orders${query ? `?${query}` : ''}`
  try {
    const res = await fetch(url, {
      cache: 'no-cache',
    })
    if (res.ok) return res.json()
    console.error('Failed to fetch orders', res.status)
    return []
  } catch (error) {
    console.error('Failed to fetch orders', error)
    return []
  }
}

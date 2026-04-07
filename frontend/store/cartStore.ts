import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '../types/types'

export type CartStore = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  addManyToCart: (newItems: CartItem[]) => void
}
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existing = state.items.find(i => i.productId === item.productId)
        if (existing) return {
          items: state.items.map(i => i.productId === item.productId ? {
            ...i,
            quantity: i.quantity + 1,
          } : i),
        }
        return { items: [...state.items, item] }
      }),
      removeFromCart: (productId) => set((state) => (
        { items: state.items.filter(i => i.productId !== productId) }
      )),
      updateQuantity: (productId, quantity) => set(state => ({
        items: state.items.map(i => i.productId === productId ? { ...i, quantity } : i),
      })),
      clearCart: () => set({ items: [] }),
      addManyToCart: (newItems: CartItem[]) => set(state => {
        const map = new Map(state.items.map(i => [i.productId, { ...i }]))
        for (const item of newItems) {
          const existing = map.get(item.productId)
          if (existing) existing.quantity += item.quantity
          else map.set(item.productId, { ...item })
        }
        return { items: Array.from(map.values()) }
      }),
    }),
    { name: 'cart' },
  ),
)
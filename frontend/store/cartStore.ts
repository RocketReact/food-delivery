import { create } from 'zustand'

type CartItem = {
  productId: string,
  name: string,
  price: number,
  quantity: number,
  image?: string,
}

type CartStore = {
  items: CartItem[],
  addToCart: (item: CartItem) => void,
  removeFromCart: (productId: string, quantity: number) => void,
  updateQuantity: (productId: string, quantity: number) => void,
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
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
}))
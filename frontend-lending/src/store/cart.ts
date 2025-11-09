import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types'

interface CartState {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string) => void
  update: (id: string, quantity: number) => void
  clear: () => void
  isInCart: (id: string) => boolean
}

const cartCreator: StateCreator<CartState> = (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            const newQty = Math.min(existing.quantity + item.quantity, item.available)
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, available: item.available, quantity: newQty, type: item.type } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: Math.min(item.quantity, item.available) }] }
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      update: (id, quantity) =>
        set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)) })),
      clear: () => set({ items: [] }),
      isInCart: (id) => get().items.some((i) => i.id === id),
})

export const useCartStore = create<CartState>()(persist(cartCreator, { name: 'cart' }))



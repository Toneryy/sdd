import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteItem { id: string }

interface FavoritesState {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  setAll: (ids: string[]) => void
  clear: () => void
}

const favoritesCreator: StateCreator<FavoritesState> = (set, get) => ({
  ids: [],
  toggle: (id: string) =>
    set((state) => ({ ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id] })),
  has: (id: string) => get().ids.includes(id),
  setAll: (ids: string[]) => set({ ids }),
  clear: () => set({ ids: [] }),
})

export const useFavoritesStore = create<FavoritesState>()(persist(favoritesCreator, { name: 'favorites_ids' }))



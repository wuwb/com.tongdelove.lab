import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ShoppingItem } from '@/types/temu/ShoppingList.ts'

interface ShoppingListState {
  items: ShoppingItem[]
  itemMap: Map<string, ShoppingItem>
  setItems(items: ShoppingItem[]): void

  selectedItemIds: string[]
  addSelectedItemId(id: string): void
  removeSelectedItemId(id: string): void

  getSelectedItems(): ShoppingItem[]

  getCurrentPageData(): ShoppingItem[]
  addPage(list: ShoppingItem[]): void
}

export const useShoppingListStore = create<ShoppingListState>()(
  immer((set, get, _store) => ({
    items: [],
    itemMap: new Map(),
    setItems(items: ShoppingItem[]) {
      const itemMap = new Map<string, ShoppingItem>()
      for (const item of items) {
        if (item.expressBatchSn) {
          itemMap.set(item.expressBatchSn, item)
        }
      }
      set((state) => {
        return {
          items,
          itemMap,
        }
      })
    },

    selectedItemIds: [],
    addSelectedItemId(id: string) {
      set((state) => {
        if (!state.selectedItemIds.includes(id)) {
          return {
            selectedItemIds: [...state.selectedItemIds, id],
          }
        }
        return state
      })
    },
    removeSelectedItemId(id: string) {
      set((state) => {
        const exists = state.selectedItemIds.includes(id)
        if (exists) {
          return {
            selectedItemIds: state.selectedItemIds.filter((item) => item !== id),
          }
        }
        return state
      })
    },

    getSelectedItems() {
      const { itemMap, selectedItemIds } = get()
      return selectedItemIds.map((id) => itemMap.get(id)).filter((item): item is ShoppingItem => item !== undefined)
    },
    addPage(list) {
      const newMap = new Map()
      const keys: string[] = []
      for (const item of list) {
        const key = item.expressBatchSn
        if (key) {
          newMap.set(key, item)
          keys.push(key)
        }
      }
      set({
        itemMap: newMap,
        selectedItemIds: keys,
        items: list,
      })
    },
    getCurrentPageData() {
      const { itemMap, selectedItemIds } = get()
      return selectedItemIds.map((key) => itemMap.get(key)!).filter(Boolean)
    },
  }))
)

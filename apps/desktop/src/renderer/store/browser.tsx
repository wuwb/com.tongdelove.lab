import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface BrowserTab {
  id: string
  name: string
  url: string
  partition: string
}

export interface BrowserState {
  tabs: BrowserTab[]
  selectedTabId: string | null
  urlInput: string
}

const initialState: BrowserState = {
  tabs: [],
  selectedTabId: null,
  urlInput: '',
}

const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<{ url?: string }>) => {
      const tabId = uuidv4()
      const newTab = {
        id: tabId,
        name: action.payload.url ? new URL(action.payload.url.startsWith('http') ? action.payload.url : `https://${action.payload.url}`).hostname : '新标签页',
        url: action.payload.url ? (action.payload.url.startsWith('http') ? action.payload.url : `https://${action.payload.url}`) : '',
        partition: `persist:webview-${tabId}`,
      }
      
      state.tabs.push(newTab)
      state.selectedTabId = tabId
      state.urlInput = ''
    },
    closeTab: (state, action: PayloadAction<{ tabId: string }>) => {
      const { tabId } = action.payload
      state.tabs = state.tabs.filter(tab => tab.id !== tabId)
      
      // If we're closing the currently selected tab
      if (state.selectedTabId === tabId) {
        // Select the first remaining tab, or null if none left
        state.selectedTabId = state.tabs.length > 0 ? state.tabs[0].id : null
      }
    },
    selectTab: (state, action: PayloadAction<{ tabId: string }>) => {
      state.selectedTabId = action.payload.tabId
    },
    setUrlInput: (state, action: PayloadAction<string>) => {
      state.urlInput = action.payload
    },
    updateTabUrl: (state, action: PayloadAction<{ tabId: string, url: string }>) => {
      const { tabId, url } = action.payload
      const tab = state.tabs.find(tab => tab.id === tabId)
      if (tab) {
        tab.url = url
        tab.name = new URL(url).hostname
      }
    },
    reorderTabs: (state, action: PayloadAction<{ sourceIndex: number, destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload
      const [removed] = state.tabs.splice(sourceIndex, 1)
      state.tabs.splice(destinationIndex, 0, removed)
    },
  },
})

export const { 
  addTab, 
  closeTab, 
  selectTab, 
  setUrlInput, 
  updateTabUrl,
  reorderTabs
} = browserSlice.actions

export default browserSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  showAssistants: boolean
}

const initialState: SettingsState = {
  showAssistants: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setShowAssistants: (
      state: SettingsState,
      action: PayloadAction<boolean>
    ) => {
      state.showAssistants = action.payload
    },
  },
})

export const { setShowAssistants } = settingsSlice.actions

export default settingsSlice.reducer

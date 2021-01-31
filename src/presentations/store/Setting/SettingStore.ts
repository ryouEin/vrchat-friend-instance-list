import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Setting } from '../../types'
import { DEFAULT_SETTING } from '../../../config/settings'
import { RootState } from '../index'
import { Color, Theme } from '../../Colors'

interface SettingState {
  setting: Setting
}

const initialState: SettingState = {
  setting: DEFAULT_SETTING,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<Setting>) => {
      state.setting = action.payload
    },
    setEnableNotificationSound: (state, action: PayloadAction<boolean>) => {
      state.setting.enableNotificationSound = action.payload
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.setting.theme = action.payload
    },
    setMainColor: (state, action: PayloadAction<Color>) => {
      state.setting.mainColor = action.payload
    },
  },
})

export const {
  setSetting,
  setEnableNotificationSound,
  setTheme,
  setMainColor,
} = settingSlice.actions

export const selectSetting = (state: RootState) => state.setting.setting

export const selectEnableNotificationSound = (state: RootState) =>
  state.setting.setting.enableNotificationSound

export const selectTheme = (state: RootState) => state.setting.setting.theme

export const selectMainColor = (state: RootState) =>
  state.setting.setting.mainColor

export const settingReducer = settingSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import { settingReducer } from './Setting/SettingStore'
import { favoritesReducer } from './Favorites/FavoritesStore'
import { instanceUserNumsReducer } from './InstanceUserNums/InstanceUserNumsStore'
import { watchingInstancesReducer } from './WatchingInstances/WatchingInstancesStore'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    setting: settingReducer,
    instanceUserNums: instanceUserNumsReducer,
    watchingInstances: watchingInstancesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

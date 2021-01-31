import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { WatchingInstance } from '../../types'

interface WatchingInstancesState {
  watchingInstances: WatchingInstance[]
}

const initialState: WatchingInstancesState = {
  watchingInstances: [],
}

export const watchingInstancesSlice = createSlice({
  name: 'watchingInstances',
  initialState,
  reducers: {
    addWatchingInstance: (state, action: PayloadAction<WatchingInstance>) => {
      state.watchingInstances = state.watchingInstances.concat([action.payload])
    },
    deleteWatchingInstance: (state, action: PayloadAction<string>) => {
      state.watchingInstances = state.watchingInstances.filter(
        (item) => item.instanceId !== action.payload
      )
    },
  },
})

export const {
  addWatchingInstance,
  deleteWatchingInstance,
} = watchingInstancesSlice.actions

export const selectWatchingInstances = (state: RootState) =>
  state.watchingInstances.watchingInstances

export const selectWatchingInstanceByInstanceId = (state: RootState) => {
  return (instanceId: string) =>
    state.watchingInstances.watchingInstances.find(
      (watchingInstance) => watchingInstance.instanceId === instanceId
    )
}

export const watchingInstancesReducer = watchingInstancesSlice.reducer

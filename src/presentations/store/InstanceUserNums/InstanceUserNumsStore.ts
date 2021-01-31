import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InstanceUserNum } from '../../types'
import { RootState } from '../index'

type InstanceUserNumsState = {
  instanceUserNums: InstanceUserNum[]
}

const initialState: InstanceUserNumsState = {
  instanceUserNums: [],
}

export const instanceUserNumsSlice = createSlice({
  name: 'instanceUserNums',
  initialState,
  reducers: {
    addInstanceUserNum: (state, action: PayloadAction<InstanceUserNum>) => {
      const newInstanceUserNum: InstanceUserNum = action.payload
      state.instanceUserNums = state.instanceUserNums.filter(
        (item) => item.instanceId !== newInstanceUserNum.instanceId
      )
      state.instanceUserNums = state.instanceUserNums.concat([
        newInstanceUserNum,
      ])
    },
  },
})

export const { addInstanceUserNum } = instanceUserNumsSlice.actions

export const selectInstanceUserNums = (state: RootState) =>
  state.instanceUserNums.instanceUserNums

export const selectInstanceUserNumByInstanceId = (state: RootState) => {
  return (instanceId: string) =>
    state.instanceUserNums.instanceUserNums.find(
      (instanceUserNum) => instanceUserNum.instanceId === instanceId
    )
}

export const instanceUserNumsReducer = instanceUserNumsSlice.reducer

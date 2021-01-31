import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Favorite } from '../../types'
import { RootState } from '../index'

interface FavoritesState {
  favorites: Favorite[]
}

const initialState: FavoritesState = {
  favorites: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites = state.favorites.concat([action.payload])
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      )
    },
  },
})

export const {
  setFavorites,
  addFavorite,
  deleteFavorite,
} = favoritesSlice.actions

export const selectFavorites = (state: RootState) => state.favorites.favorites

export const favoritesReducer = favoritesSlice.reducer

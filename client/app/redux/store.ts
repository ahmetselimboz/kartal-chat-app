import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './navbarSlice'
import userSlice from './userSlice'


export const store = configureStore({
  reducer: {
    navbar: navbarSlice,
    user: userSlice
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
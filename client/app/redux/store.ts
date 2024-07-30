import { configureStore, Store } from '@reduxjs/toolkit'
import navbarSlice from './navbarSlice'
import userSlice, { User } from './userSlice'
import { createWrapper } from "next-redux-wrapper";
import menuSlice from './menuSlice';

// export const store = configureStore({
//   reducer: {
//     navbar: navbarSlice,
//     user: userSlice
//   },
// })

export const makeStore = () => {
  return configureStore({
    reducer: {
      navbar: navbarSlice,
      user: userSlice,
      menu: menuSlice,
    },
  })
}



export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']




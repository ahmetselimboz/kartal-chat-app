import { createSlice } from '@reduxjs/toolkit'


interface NavbarState {
    navbarShow: boolean

}

const initialState: NavbarState = {
    navbarShow: true,

}


const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        navbarShowFunc: (state) => {
            state.navbarShow = !state.navbarShow
        }
    }
})

export const { navbarShowFunc } = navbarSlice.actions


export default navbarSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface SideMenuState {
    sideMenu: {
        market: boolean
    }

}

// export interface Typing {
//     sideMenu: boolean


// }

const initialState: SideMenuState = {
    sideMenu: {
        market: false
    }

}


const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState,
    reducers: {
        sideMenuFunc: (state) => {
            state.sideMenu.market = !state.sideMenu.market;
        }
    }
})

export const { sideMenuFunc } = sideMenuSlice.actions


export default sideMenuSlice.reducer

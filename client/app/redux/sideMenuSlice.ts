import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface SideMenuState {
    sideMenu: {
        market: boolean
        profil: boolean
    }

}

// export interface Typing {
//     sideMenu: boolean


// }

const initialState: SideMenuState = {
    sideMenu: {
        market: false,
        profil: false
    }

}


const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState,
    reducers: {
        sideMenuMarketFunc: (state) => {
            state.sideMenu.market = !state.sideMenu.market;
        },
        sideMenuProfilFunc: (state) => {
            state.sideMenu.profil = !state.sideMenu.profil;
        }
    }
})

export const { sideMenuMarketFunc, sideMenuProfilFunc } = sideMenuSlice.actions


export default sideMenuSlice.reducer

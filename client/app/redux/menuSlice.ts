import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IconType } from 'react-icons'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

interface ActiveMenuProps {
    menuTitle: string,
    placeholder: string,
    btnTitle: string,
    icon: IconType
}


interface MenuState {
    activeMenu: ActiveMenuProps
}

const initialState: MenuState = {
    activeMenu: {
        menuTitle: "Arkadaşlar",
        icon: AiOutlineUsergroupAdd,
        placeholder: "Kullanıcı Adı",
        btnTitle: "Ekle"
    }

}


const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeMenu: (state, action: PayloadAction<any>) => {
            state.activeMenu = action.payload
        }
    }
})

export const { activeMenu } = menuSlice.actions


export default menuSlice.reducer

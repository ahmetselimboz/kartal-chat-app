import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IconType } from 'react-icons'
import { MdMeetingRoom } from "react-icons/md"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaUsers } from "react-icons/fa6"



interface ActiveMenuProps {
    menuTitle: string,
    placeholder: string,
    btnTitle: string,
    iconName: string;
}


interface MenuState {
    activeMenu: ActiveMenuProps
}

const initialState: MenuState = {
    activeMenu: {
        menuTitle: "Arkadaşlar",
        iconName:  "AiOutlineUsergroupAdd",
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

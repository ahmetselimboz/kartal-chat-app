import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IconType } from 'react-icons'
import { MdMeetingRoom } from "react-icons/md"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaUsers } from "react-icons/fa6"
import { User } from './userSlice'

interface ChatState {
    chatUser: User | null
}

const initialState: ChatState = {
    chatUser: null

}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chatUserFunc: (state, action: PayloadAction<any>) => {
            state.chatUser = action.payload
        }
    }
})

export const { chatUserFunc } = chatSlice.actions


export default chatSlice.reducer

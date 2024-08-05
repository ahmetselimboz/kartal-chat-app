import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IconType } from 'react-icons'
import { MdMeetingRoom } from "react-icons/md"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaUsers } from "react-icons/fa6"
import { User } from './userSlice'
import { Message } from '../components/Chat/ChatSection'

interface MessageState {
    message: Message | null
}

const initialState: MessageState = {
    message: null

}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messageFunc: (state, action: PayloadAction<any>) => {
            state.message = action.payload
        }
    }
})

export const { messageFunc } = messageSlice.actions


export default messageSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface TypingState {
    isTyping: Typing | undefined | null

}

export interface Typing{
    isTyping: boolean
    userId: string | undefined | null

}

const initialState: TypingState = {
    isTyping: null
}


const isTypingSlice = createSlice({
    name: 'isTyping',
    initialState,
    reducers: {
        isTypingFunc: (state, action: PayloadAction<Typing | null>) => {
            state.isTyping = action.payload;
        }
    }
})

export const { isTypingFunc } = isTypingSlice.actions


export default isTypingSlice.reducer

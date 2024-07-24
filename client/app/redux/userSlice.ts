import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface User {
    id: string | undefined;
    email: string | undefined;
    username: string | undefined;
    imageUrl: string | undefined;
    // Yeni alanlar eklemek istersen burada tanımlayabilirsin
}

export interface UserState {
    user: User | undefined;
}

const initialState: UserState = {
    user: undefined,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      },
      clearUser: (state) => {
        state.user = undefined;
      },
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;
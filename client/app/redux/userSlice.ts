import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface User {
    id: string | undefined | null;
    email: string | undefined | null;
    username: string | undefined | null;
    imageUrl: string | undefined | null;
    bioDesc: string | undefined | null;
    userStatus: string | undefined | null;
   
}

export interface UserState {
    user: User | undefined | null;
}

const initialState: UserState = {
    user: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
      },
      clearUser: (state) => {
        state.user = null;
      },
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;
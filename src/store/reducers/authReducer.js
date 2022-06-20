import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const user = token ? JSON.parse(atob(token.split(".")[1])) : ''

const initialState = {
    value: {
        loggedIn: !!localStorage.getItem('token'),
        role: token ? user.role : 0,
        email: token ? user.email : ""
    }
}

const authSlicer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state, payload) => {
            state.value.loggedIn = !!localStorage.getItem('token');
            state.value.role = payload.payload.payload;
            state.value.email = user.email;
        },
        signOut: (state) => {
            state.value.loggedIn = false;
            state.value.role = 0;
            state.value.email =''
            localStorage.setItem('token', '');
        }
    }
})


export const { signIn, signOut } = authSlicer.actions;
export default authSlicer.reducer;
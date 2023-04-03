import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";



const token = window.localStorage.getItem('token');
let initialState = null;


if (token) {
    const { sub: id, email, role, firstname } = jwtDecode<{ sub: number, email: string, role:string, firstname:string }>(token);
    initialState = { id, email, role, firstname };
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        login: (state, action) => {
            const { sub: id, email, role, firstname } = jwtDecode<{ sub: number, email: string, role: string, firstname:string }>(action.payload);
            state = { id, email, role, firstname};
            window.localStorage.setItem('token', action.payload);
            return state;
        },
        logout: (state) => {
            state = null;
            window.localStorage.removeItem('token');
            return state;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
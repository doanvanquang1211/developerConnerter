import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { useState } from 'react';

const init = {
    token: localStorage.getItem("token"),
    loading: false,
    user: null,
    errorPassword: '',
    errorRegister: ''
}

export const registerUser = createAsyncThunk("auth/register", async (payload) => {
    try {
        const response = await api.post("/api/users", payload)
        console.log("p", response.data);
        localStorage.setItem("token", response.data.token)
        return response.data

    } catch (error) {
        const [validationMsg, setValidationMsg] = useState('')

        if (error.response.status === 400) {
            setValidationMsg(error.response.data.errors.msg)
        }
    }
})
export const loginValue = createAsyncThunk("auth/login", async (payload) => {

    try {
        const response = await api.post("/api/auth", payload)

        localStorage.setItem("token", response.data.token)

        return response.data

    } catch (error) {
        const [validationMsg, setValidationMsg] = useState('')

        if (error.response.status === 400) {
            setValidationMsg(error.response.data.errors.msg)
        }

    }
})
export const authUser = createAsyncThunk("auth/authUser", async () => {
    try {
        const response = await api.get("/api/auth")

        return response.data

    } catch (error) {

    }
})
export const deleteAccount = createAsyncThunk("profile/deleteAccount", async (payload) => {

    try {
        const response = await api.delete("/api/profile")
        payload.navigate("/login")

        return response.data

    } catch (error) {

    }
})
export const authSlice = createSlice({
    name: "auth",
    initialState: init,
    reducers: {

        logout: (state) => {

            localStorage.removeItem("token")

            return { ...state, token: null, loading: false, user: null, error: "" }

        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.token = null
                state.errorRegister = " * User already exists"
            })
            .addCase(authUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload

            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false
                state.user = null

            })
            .addCase(loginValue.pending, (state, action) => {

                state.loading = true
            })
            .addCase(loginValue.fulfilled, (state, action) => {

                state.loading = false

                state.token = action.payload.token

            })
            .addCase(loginValue.rejected, (state, action,) => {

                state.loading = false
                state.token = null
                state.errorPassword = " * Password or Email Wrong"


            })
            .addCase(deleteAccount.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false
                state.token = null
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false
                state.allProfile = null
            })
    }
})
export const { logout } = authSlice.actions
export default authSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const init = {
    profileId: null,
    allProfile: null,
    loading: false,
}

export const getLoggedProfile = createAsyncThunk("profile/getLogged", async () => {
    try {
        const response = await api.get("/api/profile/me")
        return response.data
    } catch (error) {

    }
})
// Update Profile
export const updateProfile = createAsyncThunk("profile/updateProfile", async (payload) => {
    try {
        const response = await api.post("/api/profile", payload.formData)
        payload.navigate("/dashboard")
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// addExperience
export const addExperience = createAsyncThunk("profile/addExperience", async (payload) => {
    try {
        const response = await api.put("/api/profile/experience", payload.formData)
        payload.navigate("/dashboard")
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// addEducation
export const addEducation = createAsyncThunk("profile/addEducation", async (payload) => {
    try {
        const response = await api.put("/api/profile/education", payload.formData)
        payload.navigate("/dashboard")
        return response.data

    } catch (error) {
        console.log(error)
    }
})
// editProfile
export const editProfile = createAsyncThunk("profile/editProfile", async (payload) => {
    try {
        const response = await api.post("/api/profile", payload.formData)
        payload.navigate("/dashboard")
        return response.data
    } catch (error) {
        console.log(error)
    }
})
// Delete experience
export const deleteTask1 = createAsyncThunk("profile/deleteTask1", async (id) => {

    try {
        const response = await api.delete(`/api/profile/experience/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})
// Delete education
export const deleteTask2 = createAsyncThunk("profile/deleteTask2", async (id) => {
    try {
        const response = await api.delete(`/api/profile/education/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})
// getAllProfile
export const getAllProfile = createAsyncThunk("profile/getAllProfile", async () => {

    try {
        const response = await api.get("/api/profile")
        return response.data
    } catch (error) {
        console.log(error)
    }
})
// getProfileById
export const getProfileById = createAsyncThunk("profile/getProfileById", async (id) => {

    try {
        const response = await api.get(`/api/profile/user/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const profileSlice = createSlice({
    name: "profile",
    initialState: init,
    reducers: {

    },
    extraReducers(builder) {
        builder
            // getLoggedProfile
            .addCase(getLoggedProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getLoggedProfile.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getLoggedProfile.rejected, (state, action) => {
                state.loading = false
                state.data = null
            })
            // updateProfile
            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.token = null
            })
            // editProfile
            .addCase(editProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(editProfile.fulfilled, (state, action) => {

                state.loading = false
                state.data = action.payload
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.loading = false
                state.data = null
            })
            // addExperience
            .addCase(addExperience.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(addExperience.rejected, (state, action) => {
                state.loading = false
                state.data = null
            })
            // addEducation
            .addCase(addEducation.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addEducation.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(addEducation.rejected, (state, action) => {
                state.loading = false
                state.data = null
            })
            // delete experience
            .addCase(deleteTask1.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteTask1.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(deleteTask1.rejected, (state, action) => {
                state.loading = false
                state.data = null
            })
            // delete education
            .addCase(deleteTask2.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteTask2.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(deleteTask2.rejected, (state, action) => {
                state.loading = false
                state.data = null
            })
            // getAllProfile
            .addCase(getAllProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllProfile.fulfilled, (state, action) => {
                state.loading = false
                state.allProfile = action.payload
            })
            .addCase(getAllProfile.rejected, (state, action) => {
                state.loading = false
                state.allProfile = null
            })
            // getProfileById
            .addCase(getProfileById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                state.loading = false
                state.profileId = action.payload
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.loading = false
                state.profileId = null
            })

    }
})
export default profileSlice.reducer
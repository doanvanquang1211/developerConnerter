import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const init = {
    posts: null,
    post: null,
    loading: false,

}
export const updatePost = createAsyncThunk("post/updatePost", async (payload) => {
    try {
        const response = await api.post("/api/posts", payload.formData)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// Get All Post
export const getAllPost = createAsyncThunk("post/getAllPost", async () => {
    try {
        const response = await api.get("/api/posts")
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// Get post ById
export const getPostById = createAsyncThunk("post/getPostById", async (id) => {
    try {
        const response = await api.get(`/api/posts/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// Add comment
export const addComment = createAsyncThunk("post/addComment", async (data, payload) => {
    try {
        const response = await api.post(`api/posts/comment/${data?.postId}`, data?.formData)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// Delete comment
export const deleteComment = createAsyncThunk("post/deleteComment", async (data, payload) => {
    try {
        const response = await api.delete(`api/posts/comment/${data?.postId}/${data?.post}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// Delete post
export const deletePost = createAsyncThunk("post/deletePost", async (id, payload) => {

    try {
        const response = await api.delete(`api/posts/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// Add like
export const addLike = createAsyncThunk("post/addLike", async (id) => {

    try {
        const response = await api.put(`api/posts/like/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
// unLike
export const unLike = createAsyncThunk("post/unLike", async (id) => {

    try {
        const response = await api.put(`api/posts/unlike/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
export const postSlice = createSlice({
    name: "post",
    initialState: init,
    reducers: {},
    extraReducers(builder) {
        builder
            // Update Post
            .addCase(updatePost.pending, (state, action) => {
                state.loading = true

            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false
                state.posts.unshift(action.payload)

            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false
                state.posts = null

            })
            // Get All post
            .addCase(getAllPost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload

            })
            .addCase(getAllPost.rejected, (state, action) => {
                state.loading = false
                state.posts = null
            })

            // Get post ById
            .addCase(getPostById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.loading = false
                state.post = action.payload

            })
            .addCase(getPostById.rejected, (state, action) => {
                state.loading = false
                state.post = null
            })

            // Add comment
            .addCase(addComment.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false
                state.post.comments.unshift(action.payload[0])

            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false
                state.post = null
            })

            // Delete comment
            .addCase(deleteComment.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false
                state.post.comments.splice(action.payload, 1)

            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false
                state.post = null
            })

            // Delete Post
            .addCase(deletePost.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false
                state.posts.splice(action.payload, 1)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false
                state.posts = null
            })

            // Add Like
            .addCase(addLike.pending, (state, action) => {
                state.loading = true

            })
            .addCase(addLike.fulfilled, (state, action) => {
                state.loading = false
                state.post.likes.push(action.payload)


            })
            .addCase(addLike.rejected, (state, action) => {
                state.loading = false
                state.post = null
            })
            // unLike
            .addCase(unLike.pending, (state, action) => {
                state.loading = true

            })
            .addCase(unLike.fulfilled, (state, action) => {
                state.loading = false
                state.post.likes = null


            })
            .addCase(unLike.rejected, (state, action) => {
                state.loading = false
                state.post = null
            })
    }
})

export default postSlice.reducer
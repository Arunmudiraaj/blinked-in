import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "allposts",
  initialState: { isLoading: false, posts: [] },
  reducers: {
    // setAllPosts: (state, action) => {
    //   state.posts = action.payload;
    // },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    addComment: (state, action) => {
      const i = state.posts.findIndex((item) => item.id === action.payload.id);
      if (i !== -1) {
        const newComments = [
          ...state.posts[i].comments,
          action.payload.comment,
        ];
        state.posts[i] = { ...state.posts[i], comments: newComments };
      }
    },
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    stopLoading: (state, action) => {
      state.isLoading = false;
    },
    addPosts: (state, action) => {
      const newData = [...action.payload];
      newData.forEach((item) => {
        const isExisting = state.posts.some((obj) => obj.id === item.id);
        if (!isExisting) {
          state.posts.push(item);
        }
      });

      // state.posts = state.posts.concat(action.payload);
    },
  },
});

export default postsSlice;
export const postsActions = postsSlice.actions;

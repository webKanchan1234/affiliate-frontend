import { createSlice } from "@reduxjs/toolkit";
import { createAdminReviewAction, createReviewAction, getAllReviewsAction, uploadAdminReviewImageAction } from "../actions/reviewAction";


export const createReviewSlice=createSlice({
    name:"createReview",
    initialState:{review:{},loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createReviewAction.pending,(state)=>{state.loading=true})
        .addCase(createReviewAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.review=action.payload
        })
        .addCase(createReviewAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })


        //admin review
        .addCase(createAdminReviewAction.pending,(state)=>{state.loading=true})
        .addCase(createAdminReviewAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.review=action.payload
        })
        .addCase(createAdminReviewAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})


const adminReviewImageSlice = createSlice({
    name: "adminReviewImage",
    initialState : {
        imageUrl: null,
        loading: false,
        error: null,
      },
    reducers: {
      clearImageState: (state) => {
        state.imageUrl = null;
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadAdminReviewImageAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(uploadAdminReviewImageAction.fulfilled, (state, action) => {
          state.loading = false;
          state.imageUrl = action.payload.imageUrl;
        })
        .addCase(uploadAdminReviewImageAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

export const getAllReviewsSlice = createSlice({
    name: "getAllReviews",
    initialState: { reviews: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllReviewsAction.pending, (state) => { state.loading = true })
            .addCase(getAllReviewsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload
            })
            .addCase(getAllReviewsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

    }
})


export const reviewReducers={
    createReview:createReviewSlice.reducer,
    allReviews:getAllReviewsSlice.reducer,
    uploadImg:adminReviewImageSlice.reducer
}
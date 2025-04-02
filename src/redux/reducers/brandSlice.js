import { createSlice } from "@reduxjs/toolkit";
import { createBrandAction, deleteBrandAction, getAllBrandsAction, updateBrandAction } from "../actions/brandAction";


export const createBrandSlice=createSlice({
    name:"createBrand",
    initialState:{brand:{},loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createBrandAction.pending,(state)=>{state.loading=true})
        .addCase(createBrandAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.brand=action.payload
        })
        .addCase(createBrandAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        
    }
})

export const getAllBrandSlice=createSlice({
    name:"getAllBrands",
    initialState:{brands:[],loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllBrandsAction.pending,(state)=>{state.loading=true})
        .addCase(getAllBrandsAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.brands=action.payload
        })
        .addCase(getAllBrandsAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        // Delete Brand
      .addCase(deleteBrandAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrandAction.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted brand from state
        state.brands = state.brands.filter((brand) => brand.brandId !== action.payload);
      })
      .addCase(deleteBrandAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})



export const updateBrandSlice=createSlice({
    name:"updateBrand",
    initialState:{brand:{},loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(updateBrandAction.pending,(state)=>{state.loading=true})
        .addCase(updateBrandAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.brand=action.payload
        })
        .addCase(updateBrandAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        
    }
})


export const brandReducers={
    allBrands:getAllBrandSlice.reducer,
    createBrand:createBrandSlice.reducer,
    updateBrand:updateBrandSlice.reducer
}
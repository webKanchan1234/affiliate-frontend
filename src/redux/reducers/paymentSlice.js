import { createSlice } from "@reduxjs/toolkit";
import { checkStatusAction, getAllPaymentsAction, submitProofAction, updatePaymentStatusAction, updateVerifyStatusAction } from "../actions/paymentAction";


export const getAllPaymentsSlice=createSlice({
    name:"getAllPayments",
    initialState:{payments:[],loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllPaymentsAction.pending,(state)=>{state.loading=true})
        .addCase(getAllPaymentsAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.payments=action.payload
        })
        .addCase(getAllPaymentsAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

    }
})



export const paymentReducer=createSlice({
    name:"payment",
    initialState:{payment:null,loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(updateVerifyStatusAction.pending, (state) => { state.loading = true; })
        .addCase(updateVerifyStatusAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.payment=action.payload
        })
        .addCase(updateVerifyStatusAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //update payment status
        .addCase(updatePaymentStatusAction.pending, (state) => { state.loading = true; })
        .addCase(updatePaymentStatusAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.payment=action.payload
        })
        .addCase(updatePaymentStatusAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })


         //check status
         .addCase(checkStatusAction.pending, (state) => { state.loading = true; })
         .addCase(checkStatusAction.fulfilled,(state,action)=>{
             state.loading=false;
             state.payment=action.payload
         })
         .addCase(checkStatusAction.rejected,(state,action)=>{
             state.loading=false;
             state.error=action.payload
         })

        //submit proof
        .addCase(submitProofAction.pending, (state) => { state.loading = true; })
        .addCase(submitProofAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.payment=action.payload
        })
        .addCase(submitProofAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})


export const paymentsReducers={
    allPayments:getAllPaymentsSlice.reducer,
    payment:paymentReducer.reducer
}
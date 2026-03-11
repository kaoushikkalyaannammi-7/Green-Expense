import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';  

const API_URL='http://localhost:5000/api/savings';
//fetch historical savings
export const fetchSavingsHistory=createAsyncThunk(
    "savings/fetchSavingsHistory",
    async()=>{
        const res=await axios.get(`${API_URL}/history`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.data.history;
    }
);

const savingsSlice=createSlice({
    name:'savings',
    initialState:{
        savingsHistory:[],
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSavingsHistory.pending,(state)=>{
            state.status='loading';
        }
        )
        .addCase(fetchSavingsHistory.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.savingsHistory=action.payload;
        }                       
        )   
        .addCase(fetchSavingsHistory.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        });
    }  
})
export default savingsSlice.reducer;      
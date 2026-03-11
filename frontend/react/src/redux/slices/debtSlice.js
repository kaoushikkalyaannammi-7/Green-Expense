import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { getDebts,deleteDebt,createDebt } from '../../services/api';


export const fetchDebtsThunk=createAsyncThunk("debts/fetch",
async(_,{rejectWithValue})=>{
    try{
        return await getDebts();
    }
    catch(err){
        return rejectWithValue(err.message);
    }
}
);


export const createDebtThunk=createAsyncThunk(
    "debts/create",
    async(data,{rejectWithValue})=>{
        try{
            return await createDebt(data);
        }
        catch(err){
            return rejectWithValue(err.message);
        }
    }
);

export const deleteDebtThunk=createAsyncThunk(
    "debts/delete",
    async(id,{rejectWithValue})=>{
        try{
            await deleteDebt(id);
            return id;
        }
        catch(err){
            return rejectWithValue(err.message);
        }
    }
);

const debtSlice=createSlice({
    name:'debts',
    initialState:{
        debts:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDebtsThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchDebtsThunk.fulfilled,(state, action)=>{
            state.loading=false;
            state.debts=action.payload;
           
        })
        .addCase(fetchDebtsThunk.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        //create debt
        .addCase(createDebtThunk.fulfilled ,(state,action)=>{
          state.debts.unshift(action.payload);
        })
        //delete debt
        .addCase(deleteDebtThunk.fulfilled,(state,action)=>{
            state.debts=state.debts.filter(
                (d)=>d._id!==action.payload
            );
        });
    }
});
export default debtSlice.reducer;
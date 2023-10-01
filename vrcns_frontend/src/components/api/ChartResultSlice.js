import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {_api_url} from "../../constants";
import {fetchPercentResult, fetchResult, fetchResultTable, fetchTestList, testResultsSlice} from "./TestResultsSlice";

export const fetchStatisticData = createAsyncThunk(
    'results/testList',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(`${_api_url}/allData`)
                .then(response => response.json())

            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const ChartResultsSlice = createSlice({
    name: "chartResults",
    initialState: {
        data: [],

        isLoading: false,
        error: false
    },
    reducers: {},
    extraReducers: {
        [fetchStatisticData.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchStatisticData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchStatisticData.rejected]: state => {
            state.isLoading = false;
            state.error = {message: "Ошибка получения данных"};
            state.data = [];
        }
    }
})

export const {actions: chartResultsActions} = ChartResultsSlice;
export const {reducer: chartResultsReducer} = ChartResultsSlice;
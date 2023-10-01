import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {_api_url} from "../../constants";

export const fetchResultTable = createAsyncThunk(
    'results/resultTable',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(`${_api_url}/testResults/${arg.id}`)
                .then(response => response.json())

            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const fetchTestList = createAsyncThunk(
    'results/testList',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(`${_api_url}/testList`)
                .then(response => response.json())

            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const testResultsSlice = createSlice({
    name: "testResults",
    initialState: {
        data: [],
        testList: [],

        selectedTest: 1,
        selectedUserId: "",

        isLoading: false,
        error: false
    },
    reducers: {
        setSelectedTest: (state, action) => {
            state.selectedTest = action.payload;
        }
    },
    extraReducers: {
        [fetchResultTable.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchResultTable.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchResultTable.rejected]: state => {
            state.isLoading = false;
            state.error = {message: "Ошибка получения списка результатов"};
            state.data = [];
        },
        [fetchTestList.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchTestList.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.testList = action.payload;
        },
        [fetchTestList.rejected]: state => {
            state.isLoading = false;
            state.error = {message: "Ошибка получения списка тестов"};
            state.testList = [];
        }
    }
})

export const {actions: testResultsActions} = testResultsSlice;
export const {reducer: testResultsReducer} = testResultsSlice;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {_api_url} from "../../constants";
import {testResultsSlice} from "./TestResultsSlice";

export const fetchUserData = createAsyncThunk(
    'data/UserData',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(`${_api_url}/fetchById/${arg.id}`)
                .then(response => response.json())

            return response.results[0];
        } catch (error) {
            console.log(error)
        }
    }
)

export const UserResultsSlice = createSlice({
    name: "UserResultSlice",
    initialState: {
        data: [],
        isLoading: false,
        error: ""
    },
    reducers: {},
    extraReducers: {
        [fetchUserData.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchUserData.rejected]: state => {
            state.isLoading = false;
            state.error = {message: "Ошибка данных пользователя"};
            state.data = [];
        }
    }
})

export const {actions: userResultsActions} = UserResultsSlice;
export const {reducer: userResultsReducer} = UserResultsSlice;
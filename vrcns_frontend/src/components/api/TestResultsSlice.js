import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchResultTable = createAsyncThunk(
    'results/resultTable',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(`http://217.18.60.195:8080/testResults/${arg.id}`)
                .then(response => response.json())

            return response.result;
        } catch (error) {
            console.log(error)
        }
    }
);

export const fetchTestPercentResult= createAsyncThunk(
    'results/resultTable',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(`http://217.18.60.195:8080/testPercentResult/${arg.id}`)
                .then(response => response.json())

            return response.answer;
        } catch (error) {
            console.log(error)
        }
    }
);

export const fetchTestList = createAsyncThunk(
    'results/testList',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch("http://217.18.60.195:8080/testList")
                .then(response => response.json())

            return response.result;
        } catch (error) {
            console.log(error)
        }
    }
);

export const testResultsSlice = createSlice({
    name: "testResults",
    initialState: {
        testResultsTable: [],
        testOption: [],
        selectedUserInfo: {
            name: "",
            surname: "",
            data: [
                {name: "pass", value: 12},
                {name: "failed", value: 2}
            ]
        },
        testScoreData: [{
            id: "test-1",
            name: "Тест 1",
            data: [
                {name: "0-5", value: 1},
                {name: "6-10", value: 2},
                {name: "11-15", value: 8},
                {name: "16-20", value: 6},
                {name: "21-25", value: 2},
            ]
        }, {
            id: "test-2",
            name: "Тест 2",
            data: [
                {name: "0-5", value: 0},
                {name: "6-10", value: 4},
                {name: "11-15", value: 8},
                {name: "16-20", value: 6},
                {name: "21-25", value: 1},
            ]
        }, {
            id: "test-3",
            name: "Тест 3",
            data: [
                {name: "0-5", value: 2},
                {name: "6-10", value: 4},
                {name: "11-15", value: 8},
                {name: "16-20", value: 4},
                {name: "21-25", value: 1},
            ]
        }],
        testPercentResults:[],
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
            state.testResultsTable = action.payload;
        },
        [fetchResultTable.rejected]: state => {
            state.isLoading = false;
            state.error = {message: "Ошибка получения списка результатов"};
            state.testResultsTable = [];
        },
        [fetchTestList.pending]: state => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchTestList.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.testOption = action.payload;
        },
        [fetchTestList.rejected]: state => {
            state.isLoading = false;
            state.error = {message: "Ошибка получения списка тестов"};
            state.testResultsTable = [];
        },
    }
})

export const {actions: testResultsActions} = testResultsSlice;
export const {reducer: testResultsReducer} = testResultsSlice;
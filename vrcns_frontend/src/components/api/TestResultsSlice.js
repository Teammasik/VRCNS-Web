import {createSlice} from "@reduxjs/toolkit";

export const testResultsSlice = createSlice({
    name: "testResults",
    initialState: {
        testResultsTable: [
            {id: 1, name: "Олег", surname: "Щербаков", group: "БПОи", mark: '1'},
            {id: 2, name: "Роберт", surname: "Селимов", group: "К3-51Б", mark: '1'},
        ],
        testOption: [
            {id: "test-1", name: "Тест-1"},
            {id: "test-2", name: "Тест-2"},
            {id: "test-3", name: "Тест-3"},
        ],
        testResultsBarChart: [
            {name: "test-1", pass: 23, failed: 3},
            {name: "test-2", pass: 21, failed: 5},
            {name: "test-3", pass: 18, failed: 8},
        ]
    },
    reducers: {
        setTestResults: (state, action) => {
            state.testResults = action.payload;
        }
    }
})

export const {actions: testResultsActions} = testResultsSlice;
export const {reducer: testResultsReducer} = testResultsSlice;
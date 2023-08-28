import {combineReducers} from "redux";
import {testResultsReducer} from "../api/TestResultsSlice";

const rootReducer = combineReducers({
    testResults: testResultsReducer
})

export default rootReducer;
import {combineReducers} from "redux";
import {testResultsReducer} from "../components/api/TestResultsSlice";

const rootReducer = combineReducers({
    testResults: testResultsReducer
})

export default rootReducer;
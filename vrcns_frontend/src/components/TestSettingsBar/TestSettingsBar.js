import React, {useEffect} from "react";
import Selector from "../UI/Selector/Selector";
import Icons from "../Icons/Icons";
import {fetchTestList, testResultsActions} from "../api/TestResultsSlice";
import {useDispatch, useSelector} from "react-redux";
import "./TestSettinsBar.scss"

const TestSettingsBar = () => {

    const dispatch = useDispatch();

    const testList = useSelector(state => state.testResults.testList);
    const selectedTestId = useSelector(state => state.testResults.selectedTest);

    const handleSelectTestId = (e) => {
        dispatch(testResultsActions.setSelectedTest(e));
    }

    useEffect(() => {
        dispatch(fetchTestList());
    }, []);

    return (
        <div className={"TestSettingsBar__settings-bar"}>
            <Selector options={testList} handleSelect={handleSelectTestId} name={"name"} savedId={selectedTestId}/>

            <a className="TestSettingsBar__settings-bar__button" style={{padding:"0 20px 0 20px"}}
               href={`http://217.18.60.195:8080/export/${selectedTestId}`} download>
                Скачать в Excel
                <Icons type={"download-png"} width={25} height={25}/>
            </a>
        </div>
    );
}

export default TestSettingsBar;
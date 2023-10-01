import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import "./TestResults.scss"
import {fetchResultTable} from "../api/TestResultsSlice";
import TestSettingsBar from "../TestSettingsBar/TestSettingsBar";
import Loader from "../UI/Loader/Loader";
import {fetchUserData} from "../api/UserResultsSlice";
import UserTestInfo from "../UserTestInfo/userTestInfo";


const TestResults = () => {

    const dispatch = useDispatch();

    const tableMapper = [
        {key: "item", name: "№"},
        {key: "uDate", name: "Дата"},
        {key: "userSurname", name: "Фамилия"},
        {key: "userName", name: "Имя"},
        {key: "userGroup", name: "Группа"},
        {key: "uTime", name: "Время"},
        {key: "points", name: "Баллы"},
        {key: "mark", name: "Оценка"},
    ]

    const selectedTestId = useSelector(state => state.testResults.selectedTest)
    const results = useSelector(state => state.testResults.data);
    const isLoading = useSelector(state => state.testResults.isLoading);

    const handleClick = (id) => {
        dispatch(fetchUserData(id));
    }

    useEffect(() => {
        dispatch(fetchResultTable({id: selectedTestId}));
    }, [selectedTestId]);

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th key={el.key}>{el.name}</th>
            })
        }
    </tr>
    </thead>

    const tableBody = results && <tbody>{
        results.map((user, index) => {
            return <tr key={user.id} onClick={() => handleClick()}>
                <td>{index + 1}</td>
                {
                    tableMapper.map((e, index) => {
                        if (index > 0)
                            return <td key={e.key + `_${user.name}`}>{user[e.key]}</td>
                    })
                }
            </tr>
        })
    }
    </tbody>



    return (
        <div className={"TestResults"}>
            {isLoading && <Loader/>}
            <TestSettingsBar/>
            <table className={"table"}>
                {tableHead}
                {tableBody}
            </table>
            <UserTestInfo/>
        </div>
    );
}

export default TestResults;
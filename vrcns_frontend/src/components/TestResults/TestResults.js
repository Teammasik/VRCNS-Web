import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import "./TestResults.scss"
import Modal from "../Modal/Modal";
import Selector from "../UI/Selector/Selector";
import {Cell, Legend, Pie, PieChart} from "recharts";
import Icons from "../Icons/Icons";
import {fetchResultTable, fetchTestList, testResultsActions} from "../api/TestResultsSlice";


const TestResults = () => {

    const dispatch = useDispatch();

    const tableMapper = [
        {key: "item", name: "№"},
        {key: "userName", name: "Имя"},
        {key: "userSurname", name: "Фамилия"},
        {key: "userGroup", name: "Группа"},
        {key: "mark", name: "Оценка"},
    ]

    const selectedTestId = useSelector(state => state.testResults.selectedTest)

    const [isOpenModal, setModal] = useState(false);
    const [title, setTitle] = useState("");

    const results = useSelector(state => state.testResults.testResultsTable);
    const testOptions = useSelector(state => state.testResults.testOption);
    const selectedUserInfo = useSelector(state => state.testResults.selectedUserInfo);

    useEffect(() => {
        dispatch(fetchResultTable({id: selectedTestId}));
    }, [selectedTestId]);

    useEffect(() => {
        dispatch(fetchTestList());

    }, []);

    const handleClick = (name) => {
        setModal(true);
        setTitle(name)
    }

    const handleSelectTestId = (e) => {
        dispatch(testResultsActions.setSelectedTest(e));
    }

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
        results.map((row, index) => {
            return <tr key={row.id} onClick={() => handleClick(row.surname + " " + row.name)}>
                <td>{index + 1}</td>
                {
                    tableMapper.map((e, index) => {
                        if (index > 0)
                            return <td key={e.key + `_${row.name}`}>{row[e.key]}</td>
                    })
                }
            </tr>
        })
    }
    </tbody>

    const userInfo = <div
        style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <div>
            Результаты тестирования студента
        </div>
        <PieChart width={730} height={250}>
            <Legend/>
            <Pie nameKey={"results"} data={selectedUserInfo.data} dataKey={"value"} label animationDuration={1000}>
                <Cell fill={"#82ca9d"}/>
                <Cell fill={"#e71c3b"}/>
            </Pie>
        </PieChart>
    </div>

    return (
        <div className={"TestResults"}>
            <div className={"TestResults__settings-bar"}>
                <Selector options={testOptions} handleSelect={handleSelectTestId}
                          name={"test"} saveId={selectedTestId}/>

                <a className="TestResults__settings-bar__button" href={`http://217.18.60.195:8080/export/${selectedTestId}`} download>
                    Скачать в Excel
                    <Icons type={"download-png"} width={25} height={25}/>
                </a>
            </div>
            <table className={"table"}>
                {tableHead}
                {tableBody}
            </table>
            {isOpenModal && <Modal title={title} children={userInfo} onClose={() => setModal(false)}/>}
        </div>
    );
}

export default TestResults;
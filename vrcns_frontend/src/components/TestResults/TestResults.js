import React, {useState} from "react";
import {useSelector} from "react-redux"
import "./TestResults.scss"
import Modal from "../Modal/Modal";
import Selector from "../UI/Selector/Selector";
import {Cell, Legend, Pie, PieChart} from "recharts";


const TestResults = () => {

    const tableMapper = [
        {key: "item", name: "№"},
        {key: "name", name: "Имя"},
        {key: "surname", name: "Фамилия"},
        {key: "group", name: "Группа"},
        {key: "mark", name: "Оценка"},
    ]

    const [isOpenModal, setModal] = useState(false);
    const [title, setTitle] = useState("");

    const results = useSelector(state => state.testResults.testResultsTable);
    const testOptions = useSelector(state => state.testResults.testOption);
    const selectedUserInfo = useSelector(state => state.testResults.selectedUserInfo);

    const handleClick = (name) => {
        setModal(true);
        setTitle(name)
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
            <Pie nameKey={"results"} data={selectedUserInfo.data} dataKey={"value"} label>
                <Cell fill={"#82ca9d"}/>
                <Cell fill={"#e71c3b"}/>
            </Pie>
        </PieChart>
    </div>

    return (
        <div className={"TestResults"}>
            <div className={"TestResults__settings-bar"}>
                <Selector autoSelectedId={0} options={testOptions}/>
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
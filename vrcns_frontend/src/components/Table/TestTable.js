import React, {useEffect} from "react";
import "./Table.scss"

const TestTable = ({data, tableMapper, handleClick, onHeaderClick}) => {

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th onClick={() => {
                    onHeaderClick(el.key)
                }} key={el.key}>{el.name}</th>
            })
        }
    </tr>
    </thead>

    const tableBody = data && <tbody>{
        data.map((item) => {
            return <tr key={item.id} onClick={() => handleClick(item.id)}>
                {
                    tableMapper.map((e) => {
                        return <td key={e.key + `_${item.name}`}>{item[e.key]}</td>
                    })
                }
            </tr>
        })
    }
    </tbody>

    return (
        <>
            <table className={"table"}>
                {tableHead}
                {tableBody}
            </table>
        </>
    );
}

export default TestTable;
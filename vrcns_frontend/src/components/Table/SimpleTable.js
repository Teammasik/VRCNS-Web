import React from "react";
import "./Table.scss"

const SimpleTable = ({data, tableMapper, handleClick}) => {

    const tableHead = <thead>
    <tr>
        {
            tableMapper.map(el => {
                return <th key={el.key + "_simple-table-header"}>{el.name}</th>
            })
        }
    </tr>
    </thead>

    const tableBody = data && <tbody>{
        data.map((item, index) => {
            return <tr key={"simple-table-tr_" + index} onClick={() => handleClick(item.id)}>
                {
                    tableMapper.map((e) => {
                        return <td key={e.key + `_${item.name}` + "_simple-table-body"}>{item[e.key]}</td>
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

export default SimpleTable;
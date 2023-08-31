import React from "react";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from "recharts";
import {useSelector} from "react-redux";

const ChartsPage = () => {

    const dataTest = useSelector(state => state.testResults.testResultsBarChart)

    return (<div>
            <BarChart width={730} height={250} data={dataTest}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="pass" fill="#82ca9d"/>
                <Bar dataKey="failed" fill="#8884d8"/>
            </BarChart>
        </div>
    );
}

export default ChartsPage;
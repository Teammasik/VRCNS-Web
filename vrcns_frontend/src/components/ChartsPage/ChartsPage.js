import React, {useLayoutEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from "recharts";
import {useSelector} from "react-redux";
import "./ChartsPage.scss"

const ChartsPage = () => {

    const dataTest = useSelector(state => state.testResults.testResultsBarChart)

    const useBarChartSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth * 0.7, window.innerHeight * 0.7]);
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [barWidth, barHeight] = useBarChartSize();


    return (<div className="ChartsPage">
            <BarChart width={barWidth} height={barHeight} data={dataTest}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="pass" fill="#82ca9d"/>
                <Bar dataKey="failed" fill="#e71c3b"/>
            </BarChart>
        </div>
    );
}

export default ChartsPage;
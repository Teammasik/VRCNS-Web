import React, {useLayoutEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, PieChart, Pie, Cell} from "recharts";
import {useSelector} from "react-redux";
import "./ChartsPage.scss"
import CollapseWindow from "../CollapseWindow/CollapseWindow";

const ChartsPage = () => {

    const dataTest = useSelector(state => state.testResults.testScoreData)


    const useBarChartSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth * 0.4, window.innerHeight * 0.5]);
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [barWidth, barHeight] = useBarChartSize();


    return (<div>
            {
                dataTest.map(el => {
                    return <CollapseWindow title={el.name} id={el.id}>
                        <PieChart width={barWidth} height={barHeight} key={el.id+"_rate_chart"}>
                            <Legend key={el.id+"_rate_chart_legend"}/>
                            <Pie nameKey={"results"} data={el.data} dataKey={"value"} label
                                 animationDuration={1000} key={el.id+"_rate_chart_pie"}>
                                <Cell fill={"#e71c3b"}/>
                                <Cell fill={"#e7771c"}/>
                                <Cell fill={"#fdc509"}/>
                                <Cell fill={"#cce71c"}/>
                                <Cell fill={"#82ca9d"}/>
                            </Pie>
                        </PieChart>
                        <PieChart width={barWidth} height={barHeight} key={el.id+"_percent_chart"}>
                            <Legend key={el.id+"_percent_chart_legend"}/>
                            <Pie nameKey={"results"} data={el.data} dataKey={"value"} label
                                 animationDuration={1000} key={el.id+"_percent_chart_pie"}>
                                <Cell fill={"#e71c3b"}/>
                                <Cell fill={"#e7771c"}/>
                                <Cell fill={"#fdc509"}/>
                                <Cell fill={"#cce71c"}/>
                                <Cell fill={"#82ca9d"}/>
                            </Pie>
                        </PieChart>
                    </CollapseWindow>
                })
            }
        </div>
    );
}

export default ChartsPage;
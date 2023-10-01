import React, {useEffect, useLayoutEffect, useState} from "react";
import {Cell, Legend, Pie, PieChart} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import "./ChartsPage.scss"
import CollapseWindow from "../CollapseWindow/CollapseWindow";
import {fetchStatisticData} from "../api/ChartResultSlice";

const ChartsPage = () => {

    const data = useSelector(state => state.chartResults.data);

    const dispatch = useDispatch();
    const [dataTest, setDataTest] = useState([]);

    useEffect(() => {

        let temp = [];

        data.map(el => {
            let test = []

            Object.keys(el.data).map(e => {
                test.push({name: e, value: el.data[e]})
            })

            temp.push({data: test, test: el.test});
        })

        setDataTest(temp);
    }, [data]);

    const useBarChartSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            const updateSize = () => {
                setSize([window.innerWidth * 0.4, window.innerHeight * 0.5]);
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [barWidth, barHeight] = useBarChartSize();

    useEffect(() => {
        dispatch(fetchStatisticData());
    }, []);

    return (<div>
            {
                dataTest && dataTest.map(el => {
                    return <CollapseWindow title={el.test} id={el.test + "_id"} key={el.test + "_key"}>
                        <PieChart width={barWidth} height={barHeight}>
                            <Legend/>
                            <Pie nameKey={"name"} data={el.data} dataKey={"value"} label animationDuration={1000}>
                                {/*<Cell fill={"#e71c3b"}/>*/}
                                <Cell fill={"#e7771c"}/>
                                <Cell fill={"#fdc509"}/>
                                <Cell fill={"#cce71c"}/>
                                <Cell fill={"#82ca9d"}/>
                            </Pie>
                        </PieChart>
                        {/*<PieChart width={barWidth} height={barHeight} key={el.id+"_percent_chart"}>*/}
                        {/*    <Legend key={el.id+"_percent_chart_legend"}/>*/}
                        {/*    <Pie nameKey={"results"} data={el.data} dataKey={"value"} label*/}
                        {/*         animationDuration={1000} key={el.id+"_percent_chart_pie"}>*/}
                        {/*        <Cell fill={"#e71c3b"}/>*/}
                        {/*        <Cell fill={"#e7771c"}/>*/}
                        {/*        <Cell fill={"#fdc509"}/>*/}
                        {/*        <Cell fill={"#cce71c"}/>*/}
                        {/*        <Cell fill={"#82ca9d"}/>*/}
                        {/*    </Pie>*/}
                        {/*</PieChart>*/}
                    </CollapseWindow>
                })
            }
        </div>
    );
}

export default ChartsPage;
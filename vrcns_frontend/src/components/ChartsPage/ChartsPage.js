import React, {useEffect, useLayoutEffect, useState} from "react";
import {Cell, Legend, Pie, PieChart} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import "./ChartsPage.scss"
import CollapseWindow from "../CollapseWindow/CollapseWindow";
import {fetchStatisticData} from "../api/ChartResultSlice";
import {pieChartMapper} from "../../constants";
import {log10} from "chart.js/helpers";

const ChartsPage = () => {

    const dataTest = useSelector(state => state.chartResults.data);

    const dispatch = useDispatch();

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
                    return <CollapseWindow title={el.name} id={el.name + "_id"} key={el.name + "_key"}>
                        <PieChart width={barWidth} height={barHeight} style={{userSelect: "none"}}>
                            <Legend/>
                            <Pie nameKey={"name"} data={el.pointsData.data} dataKey={"value"} label>
                                {
                                    pieChartMapper[el.pointsData.data.length].map(e => {
                                        return <Cell fill={e} key={e}/>
                                    })
                                }
                            </Pie>
                        </PieChart>
                        <PieChart width={barWidth} height={barHeight} style={{userSelect: "none"}}>
                            <Legend/>
                            <Pie nameKey={"name"} data={el.attemptsData.data} dataKey={"value"} label>
                                {
                                    pieChartMapper[el.attemptsData.data.length].map(e => {
                                        return <Cell fill={e} key={e}/>
                                    })
                                }
                            </Pie>
                        </PieChart>
                    </CollapseWindow>
                })
            }
        </div>
    );
}

export default ChartsPage;
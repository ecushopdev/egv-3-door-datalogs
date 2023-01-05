import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { selectAllDataChart } from '../../../recoil/selectors/selector';
import { typePropsChartData } from '../../../util/type/TypesAll';
import { ChartData, Point } from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { reportChart } from '../../../shared/contstant/ProcessChart';

const TestGraph = ({ options }: typePropsChartData) => {
    const dataGraph = useRecoilValue(selectAllDataChart)

    // const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    // const dataABatt = dataGraph ? dataGraph.map((item) => item.aBatt ? item.aBatt : null) : []

    const newData: Point[] = dataGraph ? dataGraph.map((item): Point => {
        return {
            x: dayjs(item.timestamp).unix() * 1000,
            y: item.soc ? item.soc : NaN
        }
    }) : []

    reportChart['SOC'].data.datasets[0] = {
        data: newData
    }

    // const dataX: ChartData<'line'> = {
    //     datasets: [
    //         {
    //             label: 'A Batt',
    //             borderWidth: 1,
    //             data: newData,
    //             backgroundColor: "rgba(0, 100, 255, 0.2)",
    //             borderColor: "rgba(0, 100, 255, 1)"
    //         }
    //     ]
    // };

    useEffect(() => {

    }, [])

    return (
        <Line
            data={reportChart['SOC'].data}
            options={options}
        />
    )
}

export default TestGraph

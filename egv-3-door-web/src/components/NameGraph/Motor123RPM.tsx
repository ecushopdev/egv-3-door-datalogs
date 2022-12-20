import React, { useCallback, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button, Grid, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';

import 'chartjs-adapter-dayjs-3';
import { typeEgvSenderData } from '../../util/type/TypeEgvData';
import { limitDataChart } from '../../shared/contstant/LimitData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface Props {
    data?: typeEgvSenderData | null
    clear: boolean
}

const Motor123RPM = (props: Props) => {
    const { data } = props
    const theme = useTheme();

    const [allData, setAllData] = useState<typeEgvSenderData[] | null>(null)

    const labels = allData ? allData.map((item) => item.timestamp) : []
    const motor1 = allData ? allData.map((item) => item.motor1RPM ? item.motor1RPM : null) : []
    const motor2 = allData ? allData.map((item) => item.motor2RPM ? item.motor2RPM : null) : []
    const motor3 = allData ? allData.map((item) => item.motor3RPM ? item.motor3RPM : null) : []

    const dataX: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'Motor 1 RPM',
                data: motor1,
                backgroundColor: "rgba(110, 255, 0, 0.2)",
                borderColor: "rgba(110, 255, 0, 1)"
            }, {
                label: 'Motor 2 RPM',
                data: motor2,
                backgroundColor: "rgba(0, 93, 255, 0.2)",
                borderColor: "rgba(0, 93, 255, 1)"
            }, {
                label: 'Motor 3 RPM',
                data: motor3,
                backgroundColor: "rgba(255, 0, 82, 0.2)",
                borderColor: "rgba(255, 0, 82, 1)"
            },
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            axis: 'x',
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: function (context) {
                        if (context.index === 0) return theme.palette.divider;
                        else return 'rgba(255,255,255,0)';
                    },
                },
                ticks: {
                    maxTicksLimit: 7,
                    maxRotation: 0,
                    minRotation: 0,
                    align: 'start',
                },
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY',
                        minute: 'hh:mm',
                    },
                },
            },
            y: {
                grid: {
                    display: true,
                    color: theme.palette.divider,
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    maxTicksLimit: 5,
                },
            },
        },
        onHover: (event) => {
            // console.log(event);
        },
    };

    useEffect(() => {
        if (data && data) {
            if (allData === null) setAllData([data])
            else {
                if (allData.length < limitDataChart) {
                    setAllData([...allData, data])
                } else {
                    let oldData = allData
                    oldData.shift()
                    oldData.push(data)
                    setAllData(oldData)
                }
            }
        }
    }, [data])

    return (
        <Line
            data={dataX}
            options={options}
        // height={250} 
        // width={350} 
        />
    )
}

export default Motor123RPM

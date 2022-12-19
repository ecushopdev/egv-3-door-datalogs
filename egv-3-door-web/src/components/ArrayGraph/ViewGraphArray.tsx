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
    dataX?: Date
    dataY?: number
    text: string
    // data?: typeEgvSenderData | null
    // clear: boolean
}

const ViewGraphArray = (props: Props) => {
    const { dataX, dataY, text } = props
    const theme = useTheme();

    // const [allData, setAllData] = useState<typeEgvSenderData[] | null>(null)

    const [valueX, setValueX] = useState<Date[]>([])
    const [valueY, setValueY] = useState<number[]>([])

    const LineData: ChartData<'line'> = {
        labels: valueX,
        datasets: [
            {
                label: text.toString(),
                data: valueY,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
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
        if (dataX && dataY && text) {
            if (valueX === null) setValueX([dataX]);
            else setValueX([...valueX, dataX]);

            if (valueY === null) setValueY([dataY]);
            else setValueY([...valueY, dataY]);
        }
    }, [dataX, dataY, text])

    return (
        <>
            <Line data={LineData} options={options} />
        </>
    )
}

export default ViewGraphArray

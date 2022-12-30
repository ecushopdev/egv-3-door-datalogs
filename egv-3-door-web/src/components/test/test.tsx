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
    // ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button, Grid, ButtonProps } from '@mui/material';
import { typeEgvSenderData } from '../../util/type/TypeEgvData';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';

import 'chartjs-adapter-dayjs-3';

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
    data: typeEgvSenderData | null
}

function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const TestGraph = (props: Props) => {
    const { data } = props
    const theme = useTheme();
    //line chart
    const [labels, setLabels] = useState<Date[]>([])
    const [socData, setSocData] = useState<number[]>([])

    const dataX = {
        labels,
        datasets: [
            {
                label: "Data SOC",
                data: socData,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    const processAddData = () => {
        let dataSoc = generrateDataSoc()
        let dataLabels = generrateDataLabels()
    }

    const generrateDataSoc = () => {
        let dataY = []
        for (let i = 0; i < 200; i++) {
            const newNumber = Math.floor(Math.random() * 100)
            dataY.push(newNumber)
        }
        setSocData(dataY)
        return dataY
    }

    const generrateDataLabels = () => {
        let dataX: Date[] = []
        for (let i = 0; i < 200; i++) {
            const newLabels = makeid(3)
            dataX.push(dayjs().subtract(i, "minutes").toDate())
        }
        setLabels(dataX)
        return dataX
    }

    const clearData = () => {
        setLabels([])
        setSocData([])
    }

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
                    maxTicksLimit: 3,
                },
            },
        },
        onHover: (event) => {
            // console.log(event);
        },
    };

    useEffect(() => {
        // if (data && data) {
        //     saveData(data)
        // }
        // processAddData()
    }, [data])

    return (
        <>
            <Grid container spacing={1} sx={{ pl: 1, pr: 1 }}>
                <Grid item xs={12} md={12} lg={6}>
                    <Line
                        options={options}
                        data={dataX} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={processAddData}
                        fullWidth
                        color='primary'
                        variant='contained'
                    >
                        Random Data
                    </Button>
                    <Button
                        onClick={() => console.log(data)}
                        fullWidth
                        color='inherit'
                        variant='contained'
                    >
                        View Data
                    </Button>
                    <Button
                        onClick={clearData}
                        fullWidth
                        color='warning'
                        variant='contained'
                    >
                        Clear Data
                    </Button>
                </Grid>
                {/* <Grid item xs={12} md={6} lg={3}>
                    <Line options={options} data={dataX} />
                </Grid> */}
            </Grid>
        </>
    )
}

export default TestGraph
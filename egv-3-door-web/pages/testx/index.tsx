import React, { useState } from 'react'
import { typeEgvSenderData } from '../../src/util/type/TypeEgvData'
import { Button, Grid } from '@mui/material'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    data: typeEgvSenderData
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

const index = (props: Props) => {
    const { data } = props
    //line chart
    const [labels, setLabels] = useState<string[]>([])
    const [socData, setSocData] = useState<number[]>([])

    const dataX = {
        labels,
        datasets: [
            {
                label: "Data SOC",
                data: socData,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    const processAddData = () => {
        // let dataSoc = 
        generrateDataSoc()
        // let dataLabels = 
        generrateDataLabels()
    }

    const generrateDataSoc = () => {
        let dataY = []
        for (let i = 0; i < 200; i++) {
            const newNumber = Math.floor(Math.random() * 100)
            dataY.push(newNumber)
        }
        setSocData(dataY)
        // return dataY
    }

    const generrateDataLabels = () => {
        let dataX = []
        for (let i = 0; i < 200; i++) {
            const newLabels = makeid(3)
            dataX.push(newLabels)
        }
        setLabels(dataX)
        // return dataX
    }

    const saveData = (data: typeEgvSenderData) => {
        if (data && data) {
            console.log(data)
        }
    }

    return (
        <>
            <Grid container spacing={2} sx={{ pl: 1, pr: 1 }}>
                <Grid item xs={12}>
                    <Line data={dataX} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={processAddData}
                        fullWidth
                        variant='contained'
                    >
                        Add Data
                    </Button>
                    <Button
                        onClick={() => console.log(labels,
                            socData)}
                        fullWidth
                        color='info'
                        variant='contained'
                    >
                        View Data
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default index

import { useCallback, useEffect, useState } from "react";
import { typeEgvSenderData } from '../../src/util/type/TypeEgvData';
import { Button, Grid, useTheme } from "@mui/material";
import { ButtonCommand, ButtonMenu } from "../../src/modules/Button/Button";
import { protocolReceive, urlReceive } from "../../src/shared/contstant/WsURL";
import React from 'react';
import AppPaper from "../../src/modules/Paper/AppPaper";
import GearPosGraph from "../../src/components/NameGraph/GearPos";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ChartOptions } from "chart.js";
import { GraphAbatt, GraphAcp, GraphBreakPos, GraphEct, GraphGearPos, GraphMotor123Current, GraphMotor123RPM, GraphMotor123Volt, GraphRangeToGo, GraphSoc, GraphSpeed, GraphStearing } from "../../src/shared/DynamicSSR";
import { useRecoilState } from 'recoil';
import { atomAllDataChart } from "../../src/recoil/atom/atom";
import TestGraph from '../../src/components/NameGraph/TestGraph';
import { limitDataChart } from "../../src/shared/contstant/LimitData";
import { fastGenerateReceivedData } from "../../src/util/generateReceivedData";
import { NameChart } from '../../src/shared/contstant/ChartName';

const View = () => {

    const theme = useTheme();

    const [allDataChart, setAllDataChart] = useRecoilState<typeEgvSenderData[]>(atomAllDataChart)

    const [socketUrl, setSocketUrl] = useState<string | null>(null)

    const [status, setStatus] = useState<boolean>(true)

    const protocols = protocolReceive

    const {
        lastMessage, readyState
    } = useWebSocket(socketUrl, {
        protocols,
        onOpen: () => console.log('Connect MHI Socket'),
        onClose: () => (async () => {
            await console.log('Close')
            await setSocketUrl(null)
        })(),
        shouldReconnect: (closeEvent) => true
    });


    const loadNewData = useCallback(async (newData: any) => {
        const { data } = newData
        const thisData = JSON.parse(data)
        // await setResiveData(JSON.parse(data))
        if (thisData && thisData) {
            if (allDataChart.length < limitDataChart) {
                await setAllDataChart([...allDataChart, thisData])
            } else {
                const oldData = allDataChart.filter((item, index) => {
                    return index !== 0
                })
                await setAllDataChart([...oldData, thisData])
            }

        }
    }, [lastMessage, allDataChart])

    const clear = () => {
        console.clear()
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
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
                        second: 'HH:mm',
                        minute: 'HH:mm',
                        hour: 'HH:mm',
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
    };

    const handleChange = async () => {
        if (status) {
            await setStatus(false)
        } else {
            await setStatus(true)
        }
    }

    const handleAddData = () => {
        const newData = fastGenerateReceivedData(200)
        console.log(newData)
        setAllDataChart(newData)
    }

    useEffect(() => {
        if (status) {
            if (socketUrl === null) {
                console.log('Update Socket URL')
                setSocketUrl(urlReceive)
            } else {
                if (lastMessage !== null) {
                    loadNewData(lastMessage)
                }
            }
        }
    }, [lastMessage, socketUrl, status])

    return (
        <>
            <Grid container
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                alignItems="baseline"
                sx={{ pl: 5, pr: 5, mt: 5, mb: 5 }}
            >
                <Button
                    onClick={handleAddData}
                >
                    Add Data
                </Button>
                <ButtonCommand command={clear} name={'clear'} />
                <ButtonMenu sendCommand={handleChange} status={status} />
            </Grid>
            <Grid container spacing={2} sx={{ pl: 5, pr: 5, mt: 5 }} >

                <AppPaper text={'ABatt Graph'}>
                    <GraphAbatt options={options} />
                </AppPaper>
                <AppPaper text={'Acp Graph'}>
                    <GraphAcp options={options} />
                </AppPaper>
                <AppPaper text={'Speed Graph'}>
                    <GraphSpeed options={options} />
                </AppPaper>
                <AppPaper text={'Motor 1 2 amd  3 RPM'}>
                    <GraphMotor123RPM options={options} />
                </AppPaper>
                <AppPaper text={'Motor 1 2 3 and Volt'}>
                    <GraphMotor123Volt options={options} />
                </AppPaper>
                <AppPaper text={'Motor 1 2 and 3 Current'}>
                    <GraphMotor123Current options={options} />
                </AppPaper>
                <AppPaper text={'RangeToGo Graph'}>
                    <GraphRangeToGo options={options} />
                </AppPaper>
                <AppPaper text={'Ect Graph'}>
                    <GraphEct options={options} />
                </AppPaper>
                <AppPaper text={'Stearing Graph'}>
                    <GraphStearing options={options} />
                </AppPaper>
                <AppPaper text={'Break Pos Graph'}>
                    <GraphBreakPos options={options} />
                </AppPaper>
                <AppPaper text={'Gear Pos Graph'}>
                    <GearPosGraph options={options} />
                </AppPaper>
                <AppPaper text={'Soc Graph'}>
                    <GraphSoc options={options} />
                </AppPaper>
                <AppPaper text={'ABatt Graph'}>
                    <TestGraph options={options} />
                </AppPaper>
            </Grid>

            {Object.keys(NameChart).forEach((item, index) => {
                return (
                    <div key={index}>
                        {item}
                    </div>
                )
            })}
        </>
    )
}

export default View
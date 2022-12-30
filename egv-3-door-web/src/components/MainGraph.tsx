import { ChartOptions } from 'chart.js';
import React from 'react'
import AppPaper from '../modules/Paper/AppPaper';
import { GraphAbatt, GraphAcp, GraphSpeed, GraphMotor123RPM, GraphMotor123Volt, GraphMotor123Current, GraphRangeToGo, GraphEct, GraphStearing, GraphBreakPos, GraphSoc } from '../shared/DynamicSSR';
import GearPosGraph from './NameGraph/GearPos';
import TestGraph from './test/test';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';

const MainGraph = () => {
    const theme = useTheme();

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: {
            mode: 'nearest',
            axis: 'xy',
            intersect: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    width: 2,
                    color: theme.palette.divider,
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
                },
                border: {
                    width: 2,
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

    return (
        <Grid container spacing={2} sx={{ mt: 2 }} >
            <AppPaper text={'ABatt Graph'}>
                <GraphAbatt options={options} />
            </AppPaper>
            <AppPaper text={'Acp Graph'}>
                <GraphAcp options={options} />
            </AppPaper>
            <AppPaper text={'Speed Graph'}>
                <GraphSpeed options={options} />
            </AppPaper>
            <AppPaper text={'Motor RPM'}>
                <GraphMotor123RPM options={options} />
            </AppPaper>
            <AppPaper text={'Motor Volt'}>
                <GraphMotor123Volt options={options} />
            </AppPaper>
            <AppPaper text={'Motor Current'}>
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
            {/* <AppPaper text={'ABatt Graph'}>
                <TestGraph options={options} />
            </AppPaper> */}
        </Grid>
    )
}

export default MainGraph
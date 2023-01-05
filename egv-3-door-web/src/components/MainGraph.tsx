import { ChartOptions } from 'chart.js';
import React from 'react'
import AppPaper from '../modules/Paper/AppPaper';
import {
    GraphAbatt,
    GraphAcp,
    GraphSpeed,
    GraphMotor123RPM,
    GraphMotor123Volt,
    GraphMotor123Current,
    GraphRangeToGo,
    GraphEct, GraphStearing,
    GraphBreakPos,
    GraphSoc,
    GraphDragDistance,
    GraphLat,
    GraphLng,
} from '../shared/DynamicSSR';
import Grid from '@mui/material/Grid';
import { Typography, useTheme } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BarChartIcon from '@mui/icons-material/BarChart';
import GearPosGraph from './realtime/NameGraph/GearPos';

const MainGraph = () => {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        //
        spanGaps: true,
        datasets: {
            line: {
                pointRadius: 0 // disable for all `'line'` datasets
            }
        },
        layout: {
            padding: 5
        },
        //
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
                    autoSkip: true,
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
                // min: `${new Date().toLocaleString()}`
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
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{
                bgcolor: 'background.paper',
            }}
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText>
                    <Typography>
                        Show RealTime Graph {open ? '( open )' : '( off )'}
                    </Typography>
                </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
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
                    <AppPaper text={'Lat Graph'}>
                        <GraphLat options={options} />
                    </AppPaper>
                    <AppPaper text={'Lng Graph'}>
                        <GraphLng options={options} />
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
                    <AppPaper text={'Race Graph'}>
                        <GraphDragDistance options={options} />
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
            </Collapse>
        </List>
    )
}

export default MainGraph
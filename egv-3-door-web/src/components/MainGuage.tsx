import React, { useState } from 'react'
import { useEffect, useCallback } from 'react';
import DistanceMeter from './Guage/DistanceMeter';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

interface Props {
    data: Object
}

const SpeedGuage = dynamic(() => import('../../src/components/Guage/GuageSpeed'), { ssr: false })
const RpmGuage = dynamic(() => import('../../src/components/Guage/GuageRPM'), { ssr: false })

const MainGuage = ({ data }: Props) => {

    const [speed, setSpeed] = useState<number>(0)
    const [rpm, setRpm] = useState<number>(0)
    const [distance, setDistance] = useState<number>(0)
    const [position, setPosition] = useState<number>(0);
    const [open, setOpen] = React.useState(false);

    const handleChangeDistance = (event: Event, newValue: number | number[]) => {
        const val = newValue as number;
        const percent = val / (402 / 100);
        const pos = parseInt(percent.toString());
        setPosition(pos);
    };

    const [intervalState, setIntervalState] = useState<NodeJS.Timer | null>(null);

    const processData = useCallback((data: Object) => {
    }, [intervalState])

    const stopProcess = useCallback(async () => {
        if (intervalState) {
            await clearInterval(intervalState)
        }
    }, [intervalState])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reset = async () => {
        await console.log('reset')
    }

    useEffect(() => {
        if (data && data) {
            processData(data)
        } else {
            stopProcess()
        }
    }, [data])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} xl={6} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <SpeedGuage value={speed} />
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={6} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <RpmGuage value={rpm} />
                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <DistanceMeter dis={distance} position={position} process={handleChangeDistance} />
                </Grid>
            </Grid >

            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={handleClickOpen}
                    >
                        Setting
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='warning'
                        onClick={reset}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default MainGuage

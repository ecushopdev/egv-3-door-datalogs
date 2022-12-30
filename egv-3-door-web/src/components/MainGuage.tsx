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
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { typeEgvSenderData } from '../util/type/TypeEgvData';

interface Props {
    payLoad: typeEgvSenderData | null;
}

const SpeedGuage = dynamic(() => import('../../src/components/Guage/GuageSpeed'), { ssr: false })
const RpmGuage = dynamic(() => import('../../src/components/Guage/GuageRPM'), { ssr: false })

const MainGuage = ({ payLoad }: Props) => {

    const [dataSpeed, setDataSpeed] = useState<number>(0)
    const [dataRpm, setDataRpm] = useState<number>(0)
    const [dataDistance, setDataDistance] = useState<number>(0)

    const [position, setPosition] = useState<number>(0)
    const [open, setOpen] = React.useState(false)

    const handleChangeDistance = (event: Event, newValue: number | number[]) => {
        const val = newValue as number;
        const percent = val / (402 / 100);
        const pos = parseInt(percent.toString());
        setPosition(pos);
    };

    const [intervalState, setIntervalState] = useState<NodeJS.Timer | null>(null);

    const processData = useCallback((data: typeEgvSenderData) => {
        console.log(data)
        const { speed } = data
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
        if (payLoad) {
            processData(payLoad)
        } else {
            stopProcess()
        }
    }, [payLoad])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                    <IconButton
                        onClick={handleClickOpen}
                    >
                        <SettingsIcon
                            fontSize='large'
                            sx={{
                                color: '#1e88e5'
                            }}
                        />
                    </IconButton>
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={6} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <SpeedGuage value={dataSpeed} />
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={6} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <RpmGuage value={dataRpm} />
                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <DistanceMeter dis={dataDistance} position={position} process={handleChangeDistance} />
                </Grid>

            </Grid >

            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
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

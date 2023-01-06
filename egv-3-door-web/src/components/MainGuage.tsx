import React, { useState } from 'react'
import { useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { typeEgvSenderData } from '../util/type/TypeEgvData';
import AppFormSetting from '../modules/Form/AppFormSetting';
import AddTimeRace from '../fetch/data/addTime';

import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import DistanceMeter from './realtime/Guage/DistanceMeter';
import { typeTimeSettings } from '../util/type/TypeFormTime';
import { useRecoilState } from 'recoil';
import { timeSetting } from '../recoil/atom/atom';

interface Props {
    payLoad: typeEgvSenderData | null;
}

const SpeedGuage = dynamic(() => import('./realtime/Guage/GuageSpeed'), { ssr: false })
const RpmGuage = dynamic(() => import('./realtime/Guage/GuageRPM'), { ssr: false })

const MainGuage = ({ payLoad }: Props) => {

    const [dataSpeed, setDataSpeed] = useState<number>(0)
    const [dataRpm, setDataRpm] = useState<number>(0)
    const [dataDistance, setDataDistance] = useState<number>(0)

    const [position, setPosition] = useState<number>(0)
    const [open, setOpen] = React.useState(false)

    const [timeValue, setTimeValue] = useRecoilState<typeTimeSettings>(timeSetting)

    const handleChangeDistance = (event: Event, newValue: number | number[]) => {
        const val = newValue as number;
        const percent = val / (402 / 100);
        const pos = parseInt(percent.toString());
        setPosition(pos);
    };

    const [intervalState, setIntervalState] = useState<NodeJS.Timer | null>(null);

    const processData = useCallback((data: typeEgvSenderData) => {
        console.log(data)
        if (data === null) {
            console.log('cannot process data')
        }
    }, [intervalState, payLoad])

    const stopProcess = useCallback(async () => {
        if (intervalState) {
            await clearInterval(intervalState)
        }
    }, [intervalState])

    const processSetting = async (data: typeTimeSettings) => {
        handleClose()
        setTimeValue(data)
        const addTime = await AddTimeRace(data)
        console.log('wait send data')
        console.log(data)
    }

    const reset = () => {
        console.log('reset')
    }

    const handleClose = () => {
        setOpen(!open)
    };

    useEffect(() => {
        if (payLoad === null) {
            console.log(payLoad)
            stopProcess()
        } else {
            processData(payLoad)
        }
    }, [payLoad])

    return (
        <>
            <Grid container spacing={2} >
                <Grid item
                    xs={12}
                    sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                    <IconButton
                        onClick={handleClose}
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
                    <DistanceMeter position={position} process={handleChangeDistance} />
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
                maxWidth='xl'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Setting"}
                </DialogTitle>
                <DialogContent>
                    <AppFormSetting
                        defaultValues={timeValue}
                        onSubmit={processSetting}
                        open={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MainGuage

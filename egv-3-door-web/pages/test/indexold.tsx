import { Button, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GuageSpeed from '../../src/components/Guage/GuageSpeed'
import GuageRPM from '../../src/components/Guage/GuageRPM';
import DistanceMeter from '../../src/components/Guage/DistanceMeter';
import dynamic from 'next/dynamic';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DebugBtn } from '../../src/modules/Button/Button';
import SliderView from '../../src/modules/Slider/SliderView';
import { atomRpm, atomSpeed, cmdProtocal, urlGet } from '../../src/recoil/atom/atom';
import { WsProvider } from '../../src/components/wsSocket/wsProvider';
import { protocolReceive, protocolSend, urlReceive, urlSend } from '../../src/shared/contstant/WsURL';
import { selectMessageWs } from '../../src/recoil/selectors/selector';

const SpeedGuage = dynamic(() => import('../../src/components/Guage/GuageSpeed'), { ssr: false })
const RpmGuage = dynamic(() => import('../../src/components/Guage/GuageRPM'), { ssr: false })

const IndexOld = () => {

    const [status, setStatus] = useState<boolean>(false);

    const [speed, setSpeed] = useRecoilState<number>(atomSpeed)
    const [rpm, setRpm] = useRecoilState<number>(atomRpm)

    const [urlWs, setUrlWs] = useRecoilState(urlGet)
    const [protocalUrl, setProtocalUrl] = useRecoilState<string>(cmdProtocal)

    const [distance, setDistance] = React.useState<number>(0)

    const [position, setPosition] = useState<number>(0);

    const handleChangeDistance = (event: Event, newValue: number | number[]) => {
        const val = newValue as number;
        const percent = val / (402 / 100);
        const pos = parseInt(percent.toString());
        setPosition(pos);
    };

    const handleChange = async (event: Event, newValue: number | number[]) => {
        await setDistance(newValue as number)
    }

    const handleChangeSpeed = async (event: Event, newValue: number | number[]) => {
        await setSpeed(newValue as number)
    }

    const handleChangeRPM = async (event: Event, newValue: number | number[]) => {
        await setRpm(newValue as number)
    }

    function statusChange() {
        if (status) {
            setStatus(false)
            console.log('Turn Off')
        } else {
            {
                setStatus(true)
                console.log('Turn On')
            }
        }
    }

    function reset() {
        setSpeed(0)
        setRpm(0)
        setDistance(0)
        console.clear()
    }

    const configUrl = async (text: string) => {
        if (text === 'send') {
            console.log('send')
            await setUrlWs(urlSend)
            await setProtocalUrl(protocolSend)
        } else if (text === 'receive') {
            console.log('receive')
            await setUrlWs(urlReceive)
            await setProtocalUrl(protocolReceive)
        } else if (text === 'clear') {
            await setUrlWs(null)
            await setProtocalUrl('')
        }
    }

    const dataMessage = useRecoilValue(selectMessageWs)

    useEffect(() => {
        console.log(dataMessage)
    }, [dataMessage])

    return (
        <WsProvider>
            <Container>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ pl: 5, pr: 5, mt: 5 }}
                >
                    <Grid item xs={12} md={6} lg={6} xl={6} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        <SpeedGuage value={speed} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} xl={6} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        <RpmGuage value={rpm} />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} xl={12} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        {/* <DistanceMeter dis={distance} position={position} process={handleChangeDistance} /> */}
                        <DistanceMeter dis={distance} position={position} process={handleChangeDistance} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        {status ? (
                            <>
                                <SliderView max={402} values={distance} handleChange={handleChange} color='secondary' />
                                <SliderView max={300} values={speed} handleChange={handleChangeSpeed} color='primary' />
                                <SliderView max={10000} values={rpm} handleChange={handleChangeRPM} color='primary' />
                                <Button
                                    fullWidth
                                    size='small'
                                    variant='contained'
                                    color='info'
                                    onClick={() => configUrl('send')}
                                >
                                    Send URL Sender
                                </Button>
                                <Button
                                    fullWidth
                                    size='small'
                                    variant='contained'
                                    color='inherit'
                                    onClick={() => configUrl('receive')}

                                >
                                    Send URL Receiver
                                </Button>
                                <Button
                                    fullWidth
                                    size='small'
                                    variant='contained'
                                    color='warning'
                                    onClick={() => configUrl('clear')}

                                >
                                    Clear URL
                                </Button>
                                <Button
                                    fullWidth
                                    color='secondary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => {
                                        console.log(urlWs)
                                        console.log(protocalUrl)
                                    }}
                                >
                                    View
                                </Button>
                            </>) : (<></>)}
                    </Grid>
                </Grid>
                <Grid container
                    spacing={1}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="baseline"
                    sx={{ pl: 5, pr: 5, mt: 5, mb: 5 }}
                >
                    <Grid item xs={12} md={6} lg={2} xl={2}>
                        <DebugBtn statusChange={statusChange} />
                        <Button
                            fullWidth
                            variant='contained'
                            color='success'
                            size='large'
                            onClick={reset}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </WsProvider>
    )
}

export default IndexOld

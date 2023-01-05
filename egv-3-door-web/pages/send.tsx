import React, { useCallback, useEffect, useState } from 'react'
import { protocolSend, urlSend } from '../src/shared/contstant/WsURL';
import { useRecoilState } from 'recoil';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useWebSocket from 'react-use-websocket';
import { generateData } from '../src/util/helper/oldGenData/generateSendData';
import { speedTimeSend } from '../src/shared/contstant/LimitData';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Send = () => {

    const [socketUrl, setSocketUrl] = useState<string | null>(null)

    const [intervalState, setIntervalState] = useState<NodeJS.Timer | null>(null);

    const protocols = protocolSend

    const [status, setStatus] = useState<boolean>(false)

    const { sendMessage, readyState } = useWebSocket(socketUrl, {
        protocols,
        onOpen: (async () => console.log('Connect Socket ')),
        onClose: (async () => {
            await setSocketUrl(null)
            await console.log('Close')
        }),
        shouldReconnect: (closeEvent) => true
    })

    const startSendData = useCallback(() => {
        const sendMessageData = setInterval(async () => {
            const uploadData = generateData()
            await sendMessage(JSON.stringify(uploadData))
            console.log(new Date().toISOString())
        }, speedTimeSend)
        setIntervalState(sendMessageData)
    }, [intervalState])

    const stopSendData = useCallback(async () => {
        if (intervalState) {
            await clearInterval(intervalState)
        }
    }, [intervalState])

    const handlerChangeStatus = async () => {
        if (status) await setStatus(false)
        else await setStatus(true)
        console.log('Change Status')
    }

    useEffect(() => {
        if (socketUrl === null) {
            setSocketUrl(urlSend)
        } else {
            if (readyState === 1) {
                if (status) {
                    startSendData()
                } else {
                    stopSendData()
                }
            }
        }
    }, [readyState, socketUrl, status])

    return (
        <Container>
            <Grid
                container
                spacing={1}
                sx={{
                    bgcolor: 'rgba(227, 227, 227, 1)',
                    pt: 4,
                    pb: 4,
                    pl: 2,
                    pr: 2
                }}
            >
                <Grid item xs={12}>
                    <Typography>
                        Hello World
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {status ? (
                        <>
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={handlerChangeStatus}
                                color='warning'
                            >
                                Stop
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={handlerChangeStatus}
                                color='primary'
                            >
                                Start
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Send
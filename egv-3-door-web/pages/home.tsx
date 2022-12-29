import React, { useCallback, useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { generateData } from '../src/util/generateSendData';
import { speedTimeSend } from '../src/shared/contstant/LimitData';
import { protocolSend, urlSend } from '../src/shared/contstant/WsURL';
import { Box, Button, Container } from '@mui/material';
import { useRecoilState } from 'recoil';

const home = () => {

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
        <>
            <Container>
                <Box>
                    Hello World
                </Box>
                <Box>
                    {status ? (
                        <>
                            <Button
                                variant='contained'
                                onClick={handlerChangeStatus}
                            >
                                Stop
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant='contained'
                                onClick={handlerChangeStatus}
                            >
                                Start
                            </Button>
                        </>
                    )}
                </Box>
            </Container>
        </>
    )
}

export default home
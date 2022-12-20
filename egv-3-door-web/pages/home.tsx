import { Box, Container, Grid, Button } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket';
import { ButtonCommand, ButtonMenu } from '../src/components/Button';
import { protocolSend, urlSend } from '../src/shared/contstant/WsURL';
import { generateData } from '../src/util/generateSendData'
import { typeEgvSender } from '../src/util/type/TypeEgvData';
import { speedTimeSend } from '../src/shared/contstant/LimitData';

const home = () => {
    const didUnmount = useRef(false);
    const [state, setState] = useState<boolean>(false);
    const [data, setData] = useState<typeEgvSender[]>([]);

    const [intervalState, setIntervalState] = useState<NodeJS.Timer | null>(null);

    const socketUrl = urlSend
    const protocols = protocolSend

    const {
        sendMessage,
    } = useWebSocket(socketUrl, {
        protocols,
        onOpen: () => console.log('open Socket'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => {
            /*
      useWebSocket will handle unmounting for you, but this is an example of a 
      case in which you would not want it to automatically reconnect
    */
            return didUnmount.current === false;
        }, reconnectAttempts: 10,
        reconnectInterval: 3000,
    });

    const pushData = async () => {
        let valueData = data
        const thisData = generateData()
        if (valueData.length < 5) {
            console.log('process')
            await setData([...valueData, thisData])
        } else {
            await setData([])
            console.log('Reset Array Data')
        }
    }

    const viewData = async () => {
        await console.log(data)
    }

    const onClickChangeState = (status: boolean) => {
        setState(status)
    }

    const startSendData = useCallback(() => {
        const sendMessageData = setInterval(async () => {
            const uploadData = generateData()
            await sendMessage(JSON.stringify(uploadData))
            console.log(uploadData)
        }, speedTimeSend)
        setIntervalState(sendMessageData)
    }, [intervalState])

    const stopSendData = useCallback(() => {
        if (intervalState) {
            clearInterval(intervalState)
        }
    }, [intervalState])

    const functionClear = async () => {
        await setState(false)
        await setData([])
        await console.clear()
    }

    useEffect(() => {
        if (state) {
            startSendData()
        } else {
            stopSendData()
        }
    }, [state])

    return (
        <Grid container spacing={1} maxWidth='xs' >
            <Grid item xs={12}>
                <ButtonCommand command={pushData} name={'push'} />
            </Grid>
            <Grid item xs={12}>
                <ButtonCommand command={viewData} name={'view'} />
            </Grid>
            <Grid item xs={12}>
                <ButtonMenu sendCommand={onClickChangeState} status={state} />
            </Grid>
            <Grid item xs={12}>
                <ButtonCommand command={functionClear} name={'clear'} />
            </Grid>
        </Grid>
    )
    // <MenuSendData SendData={process} />
}

export default home
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { protocolStatus, urlStatus } from '../../shared/contstant/WsURL'

const WsButton = () => {
    const [buttonText, setButtonText] = useState<string>('Reset')

    const [socketUrl, setSocketUrl] = useState<string | null>(urlStatus)

    const {
        lastMessage, readyState
    } = useWebSocket(socketUrl, {
        protocols: protocolStatus,
        onOpen: () => (async () => {
            console.log('Connect MHI Status')
        })(),
        onClose: () => (async () => {
            await console.log('Disconnect MHI Status')
            await setSocketUrl(null)
        })(),
        shouldReconnect: (closeEvent) => true
    });

    useEffect(() => {

        if (socketUrl === null) {
            console.log('Update Socket URL')
            setSocketUrl(urlStatus)
        } else {
            if (lastMessage !== null) {
                console.log(lastMessage)
            }
        }
    }, [lastMessage, socketUrl])

    return (
        <>
            <Button
            >
                {buttonText}
            </Button>
        </>
    )
}

export default WsButton
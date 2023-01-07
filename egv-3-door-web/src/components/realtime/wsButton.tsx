import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { protocolStatus, urlStatus } from '../../shared/contstant/WsURL'
import { useRecoilValue } from 'recoil'
import { selectTimeSetting } from '../../recoil/selectors/selector'
import AddTimeRace from '../../fetch/data/addTime'

const WsButton = () => {
    const [buttonText, setButtonText] = useState<string>('Reset')

    const [socketUrl, setSocketUrl] = useState<string | null>(urlStatus)

    const [objData, setObjectData] = useState<Object | null>(null)

    const timeSetting = useRecoilValue(selectTimeSetting)

    const {
        sendJsonMessage,
        lastMessage,
        readyState
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

    const sendSetting = async () => {
        const addTime = await AddTimeRace(timeSetting)
        await sendJsonMessage(timeSetting)
    }

    useEffect(() => {

        if (socketUrl === null) {
            console.log('Update Socket Status')
            setSocketUrl(urlStatus)
        } else {
            if (lastMessage !== null) {
                console.log('test ws')
                console.log(lastMessage.data)
                setObjectData(lastMessage.data)
                // console.log(lastMessage)
            }
        }
    }, [lastMessage, socketUrl])

    return (
        <>
            <Button
                variant='contained'
                color='inherit'
                onClick={sendSetting}
            >
                {buttonText}
            </Button>
        </>
    )
}

export default WsButton
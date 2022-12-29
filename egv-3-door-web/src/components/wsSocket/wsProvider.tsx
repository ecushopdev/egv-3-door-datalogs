import React, { useState, useEffect } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectProtocolWs, selectURLWS } from '../../recoil/selectors/selector';
import { atomLastMessage } from '../../recoil/atom/atom';

const WebsocketProvider = React.createContext<any>(null);

interface wsProps {
    children: React.ReactNode
}

const WsProvider = ({ children }: wsProps) => {

    const thisSocket: string | null = useRecoilValue(selectURLWS)
    const thisProtocol: string = useRecoilValue(selectProtocolWs)

    const [lastMessageState, setLastMessageState] = useRecoilState<object>(atomLastMessage)

    const [urlSocket, setUrlSocket] = useState<string | null>(thisSocket)
    const [cmdProtocol, setCmdProtocol] = useState<string>(thisProtocol)

    const { lastMessage } = useWebSocket(urlSocket, {
        protocols: cmdProtocol,
        onOpen: () => console.log('WebSocket opened'),
        onClose: () => {
            (async () => {
                await console.log('WebSocket closed')
                await setUrlSocket(null)
                await setCmdProtocol('')
            })()
        },
        shouldReconnect: (CloseEvent) => false
    })

    useEffect(() => {

        if (thisSocket && thisProtocol) {
            if (urlSocket === null) {
                (async () => {
                    console.log('Set URL')
                    await setUrlSocket(thisSocket)
                    await setCmdProtocol(thisProtocol)
                })()
            }
        } else {
            console.log('cler configuration')
            setUrlSocket(thisSocket)
            setCmdProtocol(thisProtocol)
        }

        if (lastMessage !== null) {
            setLastMessageState(JSON.parse(lastMessage.data))
            // console.log(JSON.parse(lastMessage.data))
        }

    }, [urlSocket, thisSocket, thisProtocol, lastMessage])

    return (
        <WebsocketProvider.Provider value={urlSocket} >
            {children}
        </WebsocketProvider.Provider>
    )
}

export {
    WsProvider, WebsocketProvider
}

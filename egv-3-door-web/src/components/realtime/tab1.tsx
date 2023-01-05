import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';
import dynamic from 'next/dynamic';
import { useRecoilValue, useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { selectAllDataChart } from '../../recoil/selectors/selector';
import { typeEgvSenderData } from '../../util/type/TypeEgvData';
import { protocolReceive, urlReceive } from '../../shared/contstant/WsURL';
import { atomAllDataChart, loadDataRealtime } from '../../recoil/atom/atom';
import { limitDataChart } from '../../shared/contstant/LimitData';

const DynamicGuage = dynamic(() => import('../../components/MainGuage'), { ssr: false })
const DynamicGraph = dynamic(() => import('../MainGraph'), { ssr: false })

const Tab1 = () => {

    const allDataChart = useRecoilValue(selectAllDataChart)
    const setAllDataChart = useSetRecoilState<typeEgvSenderData[]>(atomAllDataChart)

    const [subData, setSubData] = useRecoilState<typeEgvSenderData[]>(loadDataRealtime)

    const [lastData, setLastData] = useState<typeEgvSenderData | null>(null)
    const [socketUrl, setSocketUrl] = useState<string | null>(null)

    const {
        lastMessage, readyState
    } = useWebSocket(socketUrl, {
        protocols: protocolReceive,
        onOpen: () => (async () => {
            console.log('Connect MHI Socket')
        })(),
        onClose: () => (async () => {
            await console.log('Disconnect MHI Socket')
            await setSocketUrl(null)
        })(),
        shouldReconnect: (closeEvent) => true
    });

    const loadNewData = useCallback(async (newData: any) => {
        const { data } = newData
        const thisData = JSON.parse(data)
        // console.log(thisData)
        if (thisData && thisData) {
            if (allDataChart.length < limitDataChart) {
                await setAllDataChart((oldData) => [...oldData, thisData])
                await setSubData((newData) => [
                    ...newData,
                    thisData
                ])
            } else {
                const oldData = await allDataChart.filter((item, index) => { return index !== 0 })
                await setAllDataChart([...oldData, thisData])
                //
                await setSubData((newData) => [...newData, thisData])
            }
        }
    }, [lastMessage, allDataChart])

    useEffect(() => {

        if (socketUrl === null) {
            console.log('Update Socket URL')
            setSocketUrl(urlReceive)
        } else {
            if (lastMessage !== null) {
                loadNewData(lastMessage)
            }
        }
    }, [lastMessage, socketUrl])

    return (
        <>
            <DynamicGuage payLoad={lastData} />
            <DynamicGraph />
        </>
    )
}

export default Tab1

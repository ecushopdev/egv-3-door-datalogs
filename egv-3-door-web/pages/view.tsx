import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { typeEgvSenderData } from '../src/util/type/TypeEgvData';
import { Container } from "@mui/system";
import { Box, Button, Grid, Slider, TextField } from "@mui/material";
import { ButtonCommand } from "../src/components/Button";
import { protocolReceive, urlReceive } from "../src/shared/contstant/WsURL";
import React from 'react';
import ViewGraph from '../src/components/ViewGraph';
import SocGraph from "../src/components/NameGraph/SocGraph";
import RangeToGoGraph from "../src/components/NameGraph/RangeToGoGraph";
import SpeedGraph from "../src/components/NameGraph/SpeedGraph";
import { generateArrayData } from "../src/util/generate";
import Motor123RPM from "../src/components/NameGraph/Motor123RPM";
import Motor123Current from "../src/components/NameGraph/Motor123Current";
import Motor123Volt from "../src/components/NameGraph/Motor123Volt";

const view = () => {
    const didUnmount = useRef(false);
    const socketUrl = urlReceive
    const protocols = protocolReceive

    const {
        lastMessage,
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

    const getSocketUrl = useCallback((() => {
        return new Promise((resolve) => {
            setInterval(() => {
                resolve(socketUrl)
            }, 2000)
        })
    }), [])

    const startData = generateArrayData(200)

    const [inputData, setInputData] = useState<typeEgvSenderData[]>([])
    const [resiveData, setResiveData] = useState<typeEgvSenderData | null>(null)



    const processChart = useCallback(async (data: typeEgvSenderData) => {
        if (inputData.length < 5) {
            let newData = inputData
            newData.push(data)
            await setInputData(newData)
        }
        else {
            let oldData = inputData
            oldData.shift()
            oldData.push(data)
            await setInputData(oldData)
        }
        await setResiveData(data)
    }, [])

    const view = async () => {
        await console.log(inputData)
    }

    const clear = async () => {
        console.clear()
        console.log('clear')
        await setInputData([])
    }

    useEffect(() => {
        if (lastMessage !== null) {
            const { data } = lastMessage
            const value = JSON.parse(data)
            if (value && value) {
                processChart(value)
            }
        }
    }, [lastMessage])

    return (
        <>
            <Grid container spacing={1} sx={{ pl: 5, pr: 5, mt: 5 }} >
                <Grid item xs={3}>
                    <ButtonCommand command={clear} name={'clear'} />
                </Grid>
                <Grid item xs={3}>
                    <ButtonCommand command={view} name={'view'} />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ pl: 5, pr: 5, mt: 5 }} >
                <Grid item xs={12} md={4}>
                    <Box>
                        <SocGraph data={resiveData} clear={false} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <RangeToGoGraph data={resiveData} clear={false} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <SpeedGraph data={resiveData} clear={false} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Motor123RPM data={resiveData} clear={false} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Motor123Volt data={resiveData} clear={false} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Motor123Current data={resiveData} clear={false} />
                </Grid>

            </Grid>
        </>
    )
}

export default view
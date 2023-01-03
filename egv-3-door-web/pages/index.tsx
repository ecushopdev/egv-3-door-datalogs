import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';
import { atomAllDataChart } from '../src/recoil/atom/atom';
import { protocolReceive, urlReceive } from '../src/shared/contstant/WsURL';
import { typeEgvSenderData } from '../src/util/type/TypeEgvData';
import { limitDataChart } from '../src/shared/contstant/LimitData';
import MainGraph from '../src/components/MainGraph';
import Tab from '@mui/material/Tab';
import MainGuage from '../src/components/MainGuage';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { selectAllDataChart } from '../src/recoil/selectors/selector';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dynamic from 'next/dynamic';

const DynamicGuage = dynamic(() => import('../src/components/MainGuage'), { ssr: true })

const Index = () => {

  const allDataChart = useRecoilValue(selectAllDataChart)
  // const [allDataChart, setAllDataChart] = useRecoilState<typeEgvSenderData[]>(atomAllDataChart)
  const setAllDataChart = useSetRecoilState<typeEgvSenderData[]>(atomAllDataChart)

  const [lastData, setLastData] = useState<typeEgvSenderData | null>(null)
  const [socketUrl, setSocketUrl] = useState<string | null>(null)

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
        await setAllDataChart((oldData) => [
          ...oldData,
          thisData
        ])
        // await setLastData(thisData)
      } else {
        const oldData = allDataChart.filter((item, index) => {
          return index !== 0
        })
        await setAllDataChart((oldData) => [
          ...oldData,
          thisData
        ])
        // await setLastData(thisData)
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
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Meter Car" value="1" />
              <Tab label="RealTime Charts" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* <MainGuage payLoad={lastData} /> */}
            <DynamicGuage payLoad={lastData} />
          </TabPanel>
          <TabPanel value="2">
            <MainGraph />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}

export default Index

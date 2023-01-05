import React, { useState } from 'react'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab1 from '../src/components/realtime/tab1';
import WsButton from '../src/components/realtime/wsButton';
import DataLog from '../src/components/datalog/DataLog';

const View = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="RealTime Data" value="1" />
                            <Tab label="DataLog" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Tab1 />
                        <WsButton />
                        {/* <MainGraph /> */}
                    </TabPanel>
                    <TabPanel value="2">
                        <DataLog />
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
}

export default View

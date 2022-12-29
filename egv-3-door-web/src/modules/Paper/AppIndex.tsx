import { Box, Grid, Paper, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import React from 'react'

interface Props {
    text?: string
    children: React.ReactNode
}

const RPMSSR = dynamic(() => import('../../components/Guage/GuageRPM'),
    { ssr: false }
)

const SpeedSSR = dynamic(() => import('../../components/Guage/GuageSpeed'),
    { ssr: false }
)

const AppIndex = ({ children }: Props) => {

    return (
        <>
            <Box>
                {children}
            </Box>
        </>
    )
}

export default AppIndex

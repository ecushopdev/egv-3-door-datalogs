import { Box, Paper } from '@mui/material'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const AppPaper = (props: Props) => {
    const { children } = props
    return (
        <Box>
            <Paper
                elevation={0}
                variant='outlined'
                sx={{
                    margin: 0,
                    backgroundColor: '#e6e6e6',
                    minWidth: 300,
                    minHeight: 200
                }}
            >
                {children}
            </Paper>
        </Box>
    )
}

export default AppPaper

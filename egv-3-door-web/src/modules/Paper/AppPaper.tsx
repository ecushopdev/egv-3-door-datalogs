import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { AppPaperProps } from '../../util/type/TypeAppPaper'

const AppPaper = ({ children, text }: AppPaperProps) => {
    return (
        <Grid item xs={12} md={12} lg={6} xl={4}>
            <Box sx={{ mt: 1, mb: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Typography>
                    {text}
                </Typography>
            </Box>
            <Box>
                <Paper
                    variant='outlined'
                    sx={{
                        margin: 0,
                        backgroundColor: '#f2f2f2',
                        // minWidth: 400,
                        minHeight: 200
                    }}
                >
                    {children}
                </Paper>
            </Box>
        </Grid>
    )
}

export default AppPaper

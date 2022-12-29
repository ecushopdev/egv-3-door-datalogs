import { Box, Grid, ImageListItem, Slider } from '@mui/material'
import React from 'react'

interface Props {
    dis: number
    position: number
    process: (event: Event, newValue: number | number[]) => void
}

const DistanceMeter = ({ dis, position, process }: Props) => {
    return (
        <Grid container minWidth={'100%'}>
            <Grid item xs={12}>
                <Box>
                    {dis}

                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Slider
                        size="small"
                        defaultValue={0}
                        min={0}
                        max={402}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={process}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 60,
                        backgroundColor: 'rgba(155, 155, 155, 0.8)',
                    }}
                >
                    <Box
                        sx={{
                            width: 95,
                            height: 60,
                            borderRadius: '15px',
                            // backgroundColor: 'blue',
                            position: 'absolute',
                            top: '50%',
                            left: `${position}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <img
                            // src='/car.png'
                            src='/vehicles.svg'
                            width='100%'
                            height='100%'
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default DistanceMeter

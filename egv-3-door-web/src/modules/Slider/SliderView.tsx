import { Box, Slider } from '@mui/material'
import React from 'react'
import { TypeSliderProps } from '../../util/type/TypeSlider'

const jsonDATA = {
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: `<ElectricBike />`,
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
}

const SliderView = ({ values, handleChange, max, color }: TypeSliderProps) => {
    return (
        <Box width={'100%'} sx={{ mt: 5, mb: 5 }} >
            <Slider
                color={color}
                max={max}
                min={0}
                value={values}
                onChange={handleChange}
                aria-label="Default"
                valueLabelDisplay="on"
                sx={jsonDATA}
            />
        </Box>
    )
}

export default SliderView

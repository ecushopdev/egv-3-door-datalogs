import { ElectricBike } from '@mui/icons-material';
import { Box, Button, Grid, Slider, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { useCallback } from 'react';

const index = () => {

  const [speed, setSpeed] = useState<number>(0)
  const [rpm, setRpm] = useState<number>(0)
  const [distance, setDistance] = React.useState<number>(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (newValue as number % 3 === 0) {
      console.log(newValue)
    }
    setDistance(newValue as number)
  }

  return (
    <Grid container spacing={1} sx={{ pl: 5, pr: 5, mt: 5 }}>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        sdfds
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        sdfsd
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12} >
        <Button
          fullWidth
          variant='outlined'
          onClick={() => alert('Reset')}>
          Refresh
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Box width={'100%'} >
          <Slider
            max={402}
            min={0}
            value={distance}
            onChange={handleChange}
            aria-label="Default"
            valueLabelDisplay="on"
            sx={{
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
            }}
          />

        </Box>
        <Grid item xs={4} md={4} lg={4} xl={4}>
          <TextField
            variant="outlined"
            type='number'
            label='Number'
            onChange={(e) => {
              const data = e.target.value
              console.log(parseInt(data, 10))
            }}
          />
          <Button
            onClick={() => {
              console.log(distance)
              setDistance(0)
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index

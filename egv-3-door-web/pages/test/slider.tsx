import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';
import Container from '@mui/material/Container';

interface Test402Props { }

const Test402: React.FC<Test402Props> = (props) => {
    const [position, setPosition] = useState<number>(0);

    const handleChange = (event: Event, newValue: number | number[]) => {
        const val = newValue as number;
        const percent = val / (402 / 100);
        const pos = parseInt(percent.toString());
        setPosition(pos);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 10 }}>
            <Box>
                <Slider
                    size="small"
                    defaultValue={70}
                    min={0}
                    max={402}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                />
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#737373',
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: '50%',
                        left: `${position}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                ></Box>
            </Box>
        </Container>
    );
};

export default Test402;

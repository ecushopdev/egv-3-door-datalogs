import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { typeTimeSettings } from '../../util/type/TypeFormTime';
import { selectTimeSetting } from '../../recoil/selectors/selector';

export const fetchData = async () => {

    const data = await 0
    return {
        props: data
    }
}

const DataLog = () => {

    const viewTimeSetting = useRecoilValue<typeTimeSettings>(selectTimeSetting)

    useEffect(() => {

    }, [])

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => console.log(viewTimeSetting)}
                    >
                        View Time
                    </Button>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </>
    )
}

export default DataLog

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import React from 'react'

const linkName = ['1', '2', '3', '4', '5']

const DataLog = () => {
    return (
        <>
            <Grid container>
                {linkName.map((item, index) => {
                    const path = `/dialog/${item}`
                    return (
                        <Grid item xs={12} key={index}>
                            <Link href={path} rel=''>
                                <Button
                                    variant='outlined'
                                    color='warning'
                                >
                                    Click Here {item}
                                </Button>
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default DataLog

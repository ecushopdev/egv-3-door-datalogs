import Grid from '@mui/material/Grid';
import React from 'react'

export const clientCheckFetch = async (context: any) => {

    let dataLoad: string[] = ['1', '2'];
    const { id }: any = context.params

    if (dataLoad.includes(id)) {
        return {
            props: { id },
        };
    } else {
        return {
            notFound: true,
        };
    }
}

const index = (props: any) => {
    const { id } = props
    return (
        <>
            <Grid>

            </Grid>
        </>
    )
}

export default index

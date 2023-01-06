import React, { useEffect, useState } from 'react'
import AddDataLogs from '../../src/fetch/data/addDataLogs'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import GetDataLogs from '../../src/fetch/data/getDataLogs'
import GetDataLogsID from '../../src/fetch/data/getDataLogsID'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import deleteDataLogsID from '../../src/fetch/data/deleteDataLogsId'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { blue, red } from '@mui/material/colors'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { GridRenderCellParams } from '@mui/x-data-grid/models'
import { dummyData } from '../../src/util/helper/oldGenData/genArrayDataLogsID'
import { typeDataLogDto } from '../../src/util/type/TypeDataLog'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))


const Add = () => {

    const [raceID, setRaceID] = useState<string | null>(null)
    const [thisData, setThisData] = useState<typeDataLogDto[] | null>(null)
    const [rowData, setRowData] = useState<GridRowsProp | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const runSend = async () => {
        const id = raceID
        if (id && id !== null) {
            const payLoad: typeDataLogDto[] = dummyData()
            const fetchAdd = await AddDataLogs(id, payLoad)
            console.log(fetchAdd)
        } else {
            alert('Please Add ID')
        }
    }

    const changeRaceID = (event: any) => {
        console.log(event.target.value)
        setRaceID(event.target.value)
    }

    const runGetDataID = async () => {
        const id = raceID
        if (id && id !== null) {
            const fetchGetID = await GetDataLogsID(id)
            setThisData(fetchGetID)
        } else {
            alert('Please Add ID')
        }
    }

    const runDelete = async (id: string) => {
        if (id && id !== null) {
            const fetchDelete = await deleteDataLogsID(id)
            refreshData()
        }
    }

    const refreshData = async () => {
        setIsLoading(true)
        await setRowData([])
        await sleep(1000)
        const fetchData = await GetDataLogs()
        await setRowData(fetchData)
        setIsLoading(false)
    }


    const columes2: GridColDef[] = [
        { field: 'id', headerName: 'Race ID', width: 150 },
        { field: 'timeout1', headerName: 'Timeout 1', width: 150 },
        { field: 'timeout2', headerName: 'Timeout 2', width: 150 },
        { field: 'startTimestamp', headerName: 'Start Timestamp', width: 150 },
        {
            field: 'menu', headerName: 'Menu', width: 150,
            align: 'center',
            renderCell: ((param: GridRenderCellParams) => {
                const { row } = param
                return (
                    <>
                        <IconButton
                            aria-label="View DataLogs ID"
                            component="label"
                            onClick={() => console.log(row)}
                            size='large'
                            sx={{
                                color: blue[200],
                                "&:hover": {
                                    color: blue[900]
                                }
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            aria-label="View DataLogs ID"
                            component="label"
                            onClick={() => runDelete(row.id)}
                            sx={{
                                color: red[200],
                                "&:hover": {
                                    color: red[900]
                                }
                            }}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </>
                )
            })
        }
    ]

    useEffect(() => {
        refreshData()
    }, [])

    return (
        <Container sx={{ mt: 5, mb: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Race ID"
                        onChange={changeRaceID}
                    />
                    <Button
                        variant='outlined'
                        onClick={() => {
                            console.log(raceID)
                            console.log(thisData)
                        }}
                    >
                        View RaceID
                    </Button>

                </Grid>
                <Grid item xs={12} >
                    <Button
                        variant='outlined'
                        onClick={runSend}
                    >
                        Send Data
                    </Button>
                    <Button
                        variant='contained'
                        onClick={refreshData}
                    >
                        Refresh Data
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 500, width: '100%' }}>
                        <DataGrid
                            // autoHeight
                            loading={isLoading}
                            rowCount={5}
                            rows={rowData ? rowData : []}
                            columns={columes2} />
                    </Box>
                </Grid>
            </Grid>

        </Container >
    )
}

export default Add
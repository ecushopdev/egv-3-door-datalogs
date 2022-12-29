import { Button, ButtonProps, Grid } from "@mui/material";
import React from 'react'
import { PropsButton } from "../../util/type/TypeButtonColor";
import { blue, indigo, red } from "@mui/material/colors";

interface Props {
    status: boolean
    sendCommand: (state: boolean) => void;
}

interface PropsDebug {
    statusChange: () => void
}

const ButtonMenu = (props: Props) => {
    const { sendCommand, status } = props
    const runFunction = () => {
        if (status) console.log('stop')
        else console.log('start')
        sendCommand(!status)
    }
    return (
        <Grid item xs={12}>
            <Button
                fullWidth
                color={status ? 'warning' : 'inherit'}
                variant='contained'
                onClick={runFunction}
            >
                {status ? 'Stop Send' : 'Start Send'}
            </Button>
        </Grid>
    )
}

const ButtonCommand = (props: PropsButton) => {

    const { command, name } = props
    let text: string
    let thisColor: ButtonProps['color']
    let status: boolean = false

    if (name === 'push') {
        text = 'Push Data'
        thisColor = 'secondary'
    } else if (name === 'clear') {
        text = 'Clear Data'
        thisColor = 'warning'
    } else if (name === 'view') {
        text = 'View Data'
        thisColor = 'info'
    } else {
        thisColor = 'inherit'
        text = 'No Command'
        status = true
    }

    return (
        <Button
            fullWidth
            size="small"
            disabled={status}
            color={thisColor}
            variant='contained'
            onClick={command}
        >
            {text}
        </Button >
    )
}

const DebugBtn = ({ statusChange }: PropsDebug) => {
    return (
        <Button
            fullWidth
            variant='contained'
            color='inherit'
            size='large'
            onClick={statusChange}
        >
            Debug
        </Button>
    )
}

export {
    ButtonMenu, ButtonCommand, DebugBtn
}
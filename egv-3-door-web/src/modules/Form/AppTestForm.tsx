import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface typeTimeValue {
    timeout1: number | undefined;
    timeout2: number | undefined;
}

interface typeFormSubmit {
    defaultValues?: typeTimeValue | null
    onSubmit: SubmitHandler<typeTimeValue>;
    open: () => void
}

const validationSchema = Yup.object({
    timeout1: Yup.number().integer().required('Required Timeout1'),
    timeout2: Yup.number().integer().required('Required Timeout2'),
});

const AppTestForm: React.FC<typeFormSubmit> = ({
    open,
    defaultValues,
    onSubmit
}
) => {

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<typeTimeValue>({
        defaultValues: defaultValues ? {
            timeout1: defaultValues.timeout1,
            timeout2: defaultValues.timeout2
        } : {
            timeout1: 0,
            timeout2: 0
        },
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
    }, [isSubmitting]);

    return (
        <Grid
            container
            spacing={2}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid item xs={12}>
                <Controller
                    control={control}
                    name='timeout1'
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                value={field.value}
                                fullWidth
                                variant='outlined'
                                type='number'
                                size='small'
                                label='odo Meter Start'
                                InputLabelProps={{ shrink: Boolean(field.value) }}
                                error={Boolean(errors?.timeout1)}
                                helperText={errors?.timeout1?.message}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Controller
                    control={control}
                    name='timeout2'
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                value={field.value}
                                fullWidth
                                variant='outlined'
                                type='number'
                                size='small'
                                label='odo Meter Start'
                                InputLabelProps={{ shrink: Boolean(field.value) }}
                                error={Boolean(errors?.timeout2)}
                                helperText={errors?.timeout2?.message}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid
                item
                xs={4}
                sx={{ mt: 1 }}
            >
                <LoadingButton
                    fullWidth
                    autoFocus
                    type='submit'
                    variant='contained'
                    size='small'
                    loading={isSubmitting}
                    color='primary'
                >
                    Submit
                </LoadingButton>
            </Grid>
        </Grid>
    )
}

export default AppTestForm

import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { typeTimeSettings } from '../../util/type/TypeFormTime';

interface typeFormSubmit {
    defaultValues: typeTimeSettings | null
    onSubmit: SubmitHandler<typeTimeSettings>;
    open: () => void
}

const validationSchema = Yup.object({
    timeout1: Yup.number().integer().required('Required Timeout1'),
    timeout2: Yup.number().integer().required('Required Timeout2'),
});

const AppFormSetting: React.FC<typeFormSubmit> = ({
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
    } = useForm<typeTimeSettings>({
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
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitting, isSubmitSuccessful]);

    return (
        <Grid
            container
            spacing={2}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ pt: 2 }}
        >
            <Grid item xs={12} >
                <Controller
                    control={control}
                    name='timeout1'
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                value={field.value ? field.value : ''}
                                fullWidth
                                variant='outlined'
                                type='number'
                                size='medium'
                                label='Set Timeout 1'
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
                                value={field.value ? field.value : ''}
                                fullWidth
                                variant='outlined'
                                type='number'
                                size='medium'
                                label='Set Timeout 2'
                                InputLabelProps={{ shrink: Boolean(field.value) }}
                                error={Boolean(errors?.timeout2)}
                                helperText={errors?.timeout2?.message}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid
                container
                justifyContent='flex-end'
                display='flex'
                sx={{ mt: 1 }}
                spacing={1}
            >
                <Grid item xs={3}>
                    <LoadingButton
                        fullWidth
                        autoFocus
                        variant='outlined'
                        color='primary'
                        onClick={open}
                    >
                        Cancel
                    </LoadingButton>
                </Grid>
                <Grid item xs={3}>
                    <LoadingButton
                        fullWidth
                        autoFocus
                        type='submit'
                        variant='contained'
                        loading={isSubmitting}
                        color='primary'
                    >
                        Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AppFormSetting

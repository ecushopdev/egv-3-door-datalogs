import React, { useEffect, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';

export interface FormStartRaces {
    timeout1: number
    timeout2: number
    distance: number
}

interface FormStartProps {
    defaultValues?: FormStartRaces;
    onSubmit: SubmitHandler<FormStartRaces>;
}

const validationSchema = Yup.object({
    context: Yup.number().required('Required'),
    measurand: Yup.number().required('Required'),
    unit: Yup.number().required('Required'),
});

const FormManage: React.FC<FormStartProps> = ({
    defaultValues = {
        timeout1: 0,
        timeout2: 0,
        distance: 0,
    },
    onSubmit,
}) => {

    const {
        setValue,
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<AllDataMeterValue>({
        defaultValues: defaultValues,
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues);
        }
    }, [isSubmitting, reset]);

    return (
        <Grid
            container
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid item xs={12}>
                <Controller
                    control={control}
                    name="distance"
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                type="text"
                                size="small"
                                label="Transaction ID"
                                disabled
                                InputLabelProps={{ shrink: Boolean(field.value) }}
                                error={Boolean(errors?.distance)}
                                helperText={errors?.distance?.message}
                            />
                        );
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    control={control}
                    name="timeout1"
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                type="text"
                                size="small"
                                label="Transaction ID"
                                disabled
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
                    name="timeout2"
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                type="text"
                                size="small"
                                label="Transaction ID"
                                disabled
                                InputLabelProps={{ shrink: Boolean(field.value) }}
                                error={Boolean(errors?.timeout2)}
                                helperText={errors?.timeout2?.message}
                            />
                        );
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default FormManage;
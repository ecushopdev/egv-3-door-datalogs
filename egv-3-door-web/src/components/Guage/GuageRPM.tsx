import React, { useEffect, useState } from 'react'
import { MeterRPM } from './MeterRPM'
import { typeNumberGuage } from '../../util/type/TypesAll'
import dynamic from 'next/dynamic';

const GuageRPM = ({ value }: typeNumberGuage) => {

    return (
        <>
            <MeterRPM
                formatOptions={{ style: "unit", unit: "mile-per-hour" }}
                aria-label="Speed"
                maxValue={10000}
                minValue={0}
                value={value}
            />
        </>

    )
}

export default GuageRPM

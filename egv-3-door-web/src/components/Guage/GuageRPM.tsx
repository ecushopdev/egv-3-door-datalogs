import React, { useEffect, useState } from 'react'
import { typeNumberGuage } from '../../util/type/TypeNumberGuage'
import { MeterRPM } from './MeterRPM'
const GuageRPM = ({ value }: typeNumberGuage) => {

    return (
        <MeterRPM
            formatOptions={{ style: "unit", unit: "mile-per-hour" }}
            aria-label="Speed"
            maxValue={10000}
            minValue={0}
            value={value}
        />
    )
}

export default GuageRPM

import React, { useEffect, useState } from 'react'
import { typeNumberGuage } from '../../util/type/TypeNumberGuage'
import { MeterSpeed } from './MeterSpeed'

const GuageSpeed = ({ value }: typeNumberGuage) => {

    return (
        <MeterSpeed
            formatOptions={{ style: "unit", unit: "mile-per-hour" }}
            aria-label="Speed"
            maxValue={300}
            minValue={0}
            value={value}
        />
    )
}

export default GuageSpeed

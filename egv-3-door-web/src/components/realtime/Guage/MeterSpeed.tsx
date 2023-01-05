import React from "react";
import { useMeter, useNumberFormatter } from "react-aria";

export function MeterSpeed(props: any) {
    let { value, minValue = 0, maxValue = 100 } = props;
    let { meterProps } = useMeter(props);

    let size = 300;
    let center = size / 2;
    let strokeWidth = 28;
    let r = center - strokeWidth;
    let c = 2 * r * Math.PI;
    let a = c * (270 / 360);
    let percentage = (value - minValue) / (maxValue - minValue);
    let offset = c - percentage * a;

    let formatter = useNumberFormatter(props.formatOptions);
    let parts = formatter.formatToParts(value);
    let valueString = parts.find((p) => p.type === "integer");
    let unit = parts.find((p) => p.type === "unit");

    return (
        <>
            <svg
                {...meterProps}
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                strokeWidth={strokeWidth}
            >
                <circle
                    role="presentation"
                    cx={center}
                    cy={center}
                    r={r}
                    stroke="dodgerblue"
                    strokeOpacity={0.2}
                    strokeDasharray={`${a} ${c}`}
                    strokeLinecap="round"
                    transform={`rotate(135 ${center} ${center})`}
                />
                <circle
                    role="presentation"
                    cx={center}
                    cy={center}
                    r={r}
                    stroke="dodgerblue"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(135 ${center} ${center})`}
                />
                <text
                    role="presentation"
                    x={center}
                    y={center + 20}
                    fontFamily="ui-rounded, system-ui"
                    fontSize={80}
                    textAnchor="middle"
                    fill="dodgerblue"
                >
                    {/* {valueString && valueString.value} */}
                    {value.toString()}
                </text>
                <text
                    role="presentation"
                    x={center}
                    y={center + 20 + 25}
                    fontFamily="ui-rounded, system-ui"
                    fontSize={20}
                    textAnchor="middle"
                    fill="dodgerblue"
                    fillOpacity={0.85}
                >
                    {/* {unit && unit.value} */}
                    {unit && 'KM/H'}
                </text>
            </svg>
        </>

    );
}

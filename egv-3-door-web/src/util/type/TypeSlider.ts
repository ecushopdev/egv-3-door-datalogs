interface TypeSliderProps {
    values: number,
    max: number,
    color: any,
    handleChange: (event: Event, newValue: number | number[]) => void
}

export type { TypeSliderProps }
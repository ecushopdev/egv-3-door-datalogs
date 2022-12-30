import { ChartData, ChartOptions } from "chart.js"

interface AppPaperProps {
    text: string
    children: React.ReactNode
}

interface PropsButton {
    name: string
    textRead?: string
    command: () => void
}

interface typeReportChart {
    [key: string]: {
        data: ChartData<'line'>
    }
}

interface TypeSliderProps {
    values: number,
    max: number,
    color: any,
    handleChange: (event: Event, newValue: number | number[]) => void
}

interface typeNumberGuage {
    value: number
}

interface typePropsChartData {
    options: ChartOptions<'line'>
}

export type {
    AppPaperProps,
    PropsButton,
    typeReportChart,
    TypeSliderProps,
    typeNumberGuage,
    typePropsChartData
}
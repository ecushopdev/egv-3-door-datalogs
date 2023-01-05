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

interface typeNumberGuage {
    value: number
}

interface typePropsChartData {
    options: ChartOptions<'line'>
}

export type {
    AppPaperProps,
    PropsButton,
    typeNumberGuage,
    typePropsChartData
}
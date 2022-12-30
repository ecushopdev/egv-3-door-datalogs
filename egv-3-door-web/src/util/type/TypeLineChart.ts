import { ChartData, ChartOptions } from "chart.js"

interface typeReportLineChart {
    [key: string]: {
        data: {
            datasets: [{
                label: string,
                borderWidth: number,
                data: [],
                fill: boolean,
                backgroundColor: string,
                borderColor: string,
            }]
        }
    }
}

interface typeReportChartMultipLine {
    [key: string]: {
        data: ChartData<'line', { x: number, y1: number, y2: number, y3?: number }[]>
    }
}

export type {
    typeReportLineChart,
    typeReportChartMultipLine,
}
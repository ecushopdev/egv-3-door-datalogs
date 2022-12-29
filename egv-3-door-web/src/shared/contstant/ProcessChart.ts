import { typeReportChart, typeReportChartMultipLine } from "../../util/type/TypeLineChart"

let reportChart: typeReportChart = {
    "SOC": {
        data: {
            datasets: [{
                label: "SOC Graph",
                borderWidth: 1,
                data: [],
                fill: true,
                backgroundColor: "rgba(245, 40, 145, 0.2)",
                borderColor: "rgba(245, 40, 145, 1)"
            }]
        }
    },
    "Abatt": {
        data: {
            datasets: [{
                label: "ABatt",
                borderWidth: 1,
                data: [],
                fill: true,
                backgroundColor: "rgba(255, 215, 0, 0.2)",
                borderColor: "rgba(255, 215, 0, 1)"
            }]
        }
    },
}

// let reportChartMore: typeReportChartMultipLine = {
//     "Acp": {
//         data: {
//             datasets: [
//                 {
//                     label: "ACP MAIN",
//                     borderWidth: 1,
//                     data: [],
//                     parsing: { yAxisKey: 'y1' },
//                     fill: true,
//                     backgroundColor: "rgba(140, 39, 245, 0.2)",
//                     borderColor: "rgba(140, 39, 245, 1)"
//                 },
//                 {
//                     label: "ACP SUB",
//                     borderWidth: 1,
//                     data: [],
//                     parsing: { yAxisKey: 'y2' },
//                     fill: true,
//                     backgroundColor: "rgba(183, 88, 51, 0.2)",
//                     borderColor: "rgba(183, 88, 51, 1)"
//                 },
//             ]
//         }
//     },
// }

export {
    reportChart,
    // reportChartMore
}
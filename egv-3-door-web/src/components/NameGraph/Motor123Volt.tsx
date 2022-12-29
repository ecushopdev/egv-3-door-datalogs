import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { typePropsChartData } from '../../util/type/TypeLineChart';
import { useRecoilValue } from 'recoil';
import { selectAllDataChart } from '../../recoil/selectors/selector';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const Motor123VoltGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    const motor1 = dataGraph ? dataGraph.map((item) => item.motor1Volt ? item.motor1Volt : null) : []
    const motor2 = dataGraph ? dataGraph.map((item) => item.motor2Volt ? item.motor2Volt : null) : []
    const motor3 = dataGraph ? dataGraph.map((item) => item.motor3Volt ? item.motor3Volt : null) : []

    const dataX: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'Motor 1 Volt',
                borderWidth: 1, data: motor1,
                backgroundColor: "rgba(77, 77, 77, 0.2)",
                borderColor: "rgba(77, 77, 77, 1)"
            }, {
                label: 'Motor 2 Volt',
                borderWidth: 1, data: motor2,
                backgroundColor: "rgba(220, 109, 109, 0.2)",
                borderColor: "rgba(220, 109, 109, 1)"
            }, {
                label: 'Motor 3 Volt',
                borderWidth: 1, data: motor3,
                backgroundColor: "rgba(102, 103, 247, 0.2)",
                borderColor: "rgba(102, 103, 247, 1)"
            },
        ]
    };

    return (
        <Line
            data={dataX}
            options={options}
        />
    )
}

export default Motor123VoltGraph

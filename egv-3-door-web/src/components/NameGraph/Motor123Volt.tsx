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
import { typePropsChartData } from '../../util/type/TypesAll';
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
                label: 'Motor 1',
                borderWidth: 1, data: motor1,
                backgroundColor: "#ffcccc",
                borderColor: "#ff0000"
            }, {
                label: 'Motor 2',
                borderWidth: 1, data: motor2,
                backgroundColor: "#ccccff",
                borderColor: "#0000ff"
            }, {
                label: 'Motor 3',
                borderWidth: 1, data: motor3,
                backgroundColor: "#ccffcc",
                borderColor: "#00ff00"
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

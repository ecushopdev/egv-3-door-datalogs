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

const Motor123RPMGraph = ({options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    const motor1 = dataGraph ? dataGraph.map((item) => item.motor1RPM ? item.motor1RPM : null) : []
    const motor2 = dataGraph ? dataGraph.map((item) => item.motor2RPM ? item.motor2RPM : null) : []
    const motor3 = dataGraph ? dataGraph.map((item) => item.motor3RPM ? item.motor3RPM : null) : []

    const dataX: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'Motor 1 RPM',
                borderWidth: 1, data: motor1,
                backgroundColor: "rgba(110, 255, 0, 0.2)",
                borderColor: "rgba(110, 255, 0, 1)"
            }, {
                label: 'Motor 2 RPM',
                borderWidth: 1, data: motor2,
                backgroundColor: "rgba(0, 93, 255, 0.2)",
                borderColor: "rgba(0, 93, 255, 1)"
            }, {
                label: 'Motor 3 RPM',
                borderWidth: 1, data: motor3,
                backgroundColor: "rgba(255, 0, 82, 0.2)",
                borderColor: "rgba(255, 0, 82, 1)"
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

export default Motor123RPMGraph

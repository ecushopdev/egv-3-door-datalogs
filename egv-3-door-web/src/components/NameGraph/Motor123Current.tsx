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
import 'chartjs-adapter-dayjs-3';
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

const Motor123CurrentGraph = ({options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    const motor1 = dataGraph ? dataGraph.map((item) => item.motor1Current ? item.motor1Current : null) : []
    const motor2 = dataGraph ? dataGraph.map((item) => item.motor2Current ? item.motor2Current : null) : []
    const motor3 = dataGraph ? dataGraph.map((item) => item.motor3Current ? item.motor3Current : null) : []

    const dataX: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'Motor 1 Current',
                borderWidth: 1, data: motor1,
                backgroundColor: "rgba(255, 0, 162, 0.2)",
                borderColor: "rgba(255, 0, 162, 1)"
            }, {
                label: 'Motor 2 Current',
                borderWidth: 1, data: motor2,
                backgroundColor: "rgba(115, 125, 137, 0.2)",
                borderColor: "rgba(115, 125, 137, 1)"
            }, {
                label: 'Motor 3 Current',
                borderWidth: 1, data: motor3,
                backgroundColor: "rgba(254, 188, 18, 0.2)",
                borderColor: "rgba(254, 188, 18, 1)"
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

export default Motor123CurrentGraph

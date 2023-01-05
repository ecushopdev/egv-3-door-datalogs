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
    Point,
    Filler,
    Chart
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { selectAllDataChart } from '../../../recoil/selectors/selector';
import dayjs from 'dayjs';
import { typePropsChartData } from '../../../util/type/TypesAll';

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
Chart.register(Filler)

const Motor123RPMGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    const motor1 = dataGraph ? dataGraph.map((item) => item.motor1RPM ? item.motor1RPM : null) : []
    const motor2 = dataGraph ? dataGraph.map((item) => item.motor2RPM ? item.motor2RPM : null) : []
    const motor3 = dataGraph ? dataGraph.map((item) => item.motor3RPM ? item.motor3RPM : null) : []

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

export default Motor123RPMGraph

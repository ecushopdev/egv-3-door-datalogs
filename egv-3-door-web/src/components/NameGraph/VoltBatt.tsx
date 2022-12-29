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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { typePropsChartData } from '../../util/type/TypeLineChart';
import { useRecoilValue } from 'recoil';
import { selectAllDataChart } from '../../recoil/selectors/selector';
import dayjs from 'dayjs';

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

const VoltBattGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const newData: Point[] = dataGraph ? dataGraph.map((item): Point => {
        return {
            x: dayjs(item.timestamp).unix() * 1000,
            y: item.voltBatt ? item.voltBatt : NaN
        }
    }) : []
    const dataX: ChartData<'line'> = {
        datasets: [
            {
                label: 'VoltBatt',
                borderWidth: 1, data: newData,
                fill: true,
                backgroundColor: "rgba(255, 0, 157, 0.2)",
                borderColor: "rgba(255, 0, 157, 1)"
            }
        ]
    };

    return (
        <Line
            data={dataX}
            options={options}
        />
    )
}

export default VoltBattGraph

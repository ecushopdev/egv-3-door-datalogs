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

const BreakPosGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const newData: Point[] = dataGraph ? dataGraph.map((item): Point => {
        return {
            x: dayjs(item.timestamp).unix() * 1000,
            y: item.breakPos ? item.breakPos : NaN
        }
    }) : []

    const dataX: ChartData<'line'> = {
        datasets: [
            {
                label: 'Break Pos',
                borderWidth: 1, data: newData,
                backgroundColor: "rgba(9, 125, 66, 0.2)",
                borderColor: "rgba(9, 125, 66, 1)"
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

export default BreakPosGraph

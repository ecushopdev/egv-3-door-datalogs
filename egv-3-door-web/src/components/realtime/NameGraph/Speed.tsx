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

const SpeedGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const newData: Point[] = dataGraph ? dataGraph.map((item): Point => {
        return {
            x: dayjs(item.timestamp).unix() * 1000,
            y: item.speed ? item.speed : NaN
        }
    }) : []
    const dataX: ChartData<'line'> = {
        datasets: [
            {
                label: 'Speed',
                borderWidth: 1,
                data: newData,
                backgroundColor: "rgba(0, 125, 255, 0.2)",
                borderColor: "rgba(0, 125, 255, 1)"
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

export default SpeedGraph

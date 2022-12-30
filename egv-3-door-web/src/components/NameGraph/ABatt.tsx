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
import { useRecoilValue } from 'recoil';
import { selectAllDataChart } from '../../recoil/selectors/selector';
import dayjs from 'dayjs';
import { typePropsChartData } from '../../util/type/TypesAll';

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

const ABattGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const newData: Point[] = dataGraph ? dataGraph.map((item): Point => {
        return {
            x: dayjs(item.timestamp).unix() * 1000,
            y: item.aBatt ? item.aBatt : NaN
        }
    }) : []

    const dataX: ChartData<'line'> = {
        datasets: [
            {
                label: 'A Batt',
                borderWidth: 1,
                data: newData,
                backgroundColor: "rgba(0, 100, 255, 0.2)",
                borderColor: "rgba(0, 100, 255, 1)"
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

export default ABattGraph

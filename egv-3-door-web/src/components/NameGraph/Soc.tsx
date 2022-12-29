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

const SocGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const newData: Point[] = dataGraph ? dataGraph.map((item): Point => {
        return {
            x: dayjs(item.timestamp).unix() * 1000,
            y: item.soc ? item.soc : NaN
        }
    }) : []

    const dataX: ChartData<'line'> = {
        datasets: [
            {
                label: "SOC Graph",
                borderWidth: 1,
                data: newData,
                fill: true,
                backgroundColor: "rgba(245, 40, 145, 0.2)",
                borderColor: "rgba(245, 40, 145, 1)"
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

export default SocGraph

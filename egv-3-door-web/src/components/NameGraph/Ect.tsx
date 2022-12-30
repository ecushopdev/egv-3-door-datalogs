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

const EctGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    const dataEct1 = dataGraph ? dataGraph.map((item) => item.ect1 ? item.ect1 : null) : []
    const dataEct2 = dataGraph ? dataGraph.map((item) => item.ect2 ? item.ect2 : null) : []

    const dataX: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'ECT 1',
                borderWidth: 1, data: dataEct1,
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                borderColor: "rgba(0, 0, 255, 1)"
            }, {
                label: 'ECT 2',
                borderWidth: 1, data: dataEct2,
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderColor: "rgba(255, 0, 0, 1)"
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

export default EctGraph

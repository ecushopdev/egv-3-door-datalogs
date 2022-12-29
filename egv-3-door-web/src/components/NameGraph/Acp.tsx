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

const AcpGraph = ({ options }: typePropsChartData) => {

    const dataGraph = useRecoilValue(selectAllDataChart)

    const labels = dataGraph ? dataGraph.map((item) => item.timestamp) : []
    const dataAcpMain = dataGraph ? dataGraph.map((item) => item.acpMain ? item.acpMain : null) : []
    const dataAcpSub = dataGraph ? dataGraph.map((item) => item.acpSub ? item.acpSub : null) : []

    const dataX: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'ACP MAIN',
                borderWidth: 1, data: dataAcpMain,
                backgroundColor: "rgba(255, 104, 0, 0.2)",
                borderColor: "rgba(255, 104, 0, 1)"
            }, {
                label: 'ACP SUB',
                borderWidth: 1, data: dataAcpSub,
                backgroundColor: "rgba(33, 82, 14, 0.2)",
                borderColor: "rgba(33, 82, 14, 1)"
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

export default AcpGraph

import dynamic from 'next/dist/shared/lib/dynamic';

const GraphAbatt = dynamic(import('../components/realtime/NameGraph/ABatt'), { ssr: false })
const GraphAcp = dynamic(import('../components/realtime/NameGraph/Acp'), { ssr: false })
const GraphBreakPos = dynamic(import('../components/realtime/NameGraph/BreakPos'), { ssr: false })
const GraphDragDistance = dynamic(import('../components/realtime/NameGraph/DragDistance'), { ssr: false })
const GraphEct = dynamic(import('../components/realtime/NameGraph/Ect'), { ssr: false })
const GraphGearPos = dynamic(import('../components/realtime/NameGraph/GearPos'), { ssr: false })
const GraphLat = dynamic(import('../components/realtime/NameGraph/Lat'), { ssr: false })
const GraphLng = dynamic(import('../components/realtime/NameGraph/Lng'), { ssr: false })
const GraphMotor123Current = dynamic(import('../components/realtime/NameGraph/Motor123Current'), { ssr: false })
const GraphMotor123RPM = dynamic(import('../components/realtime/NameGraph/Motor123RPM'), { ssr: false })
const GraphMotor123Volt = dynamic(import('../components/realtime/NameGraph/Motor123Volt'), { ssr: false })
const GraphRangeToGo = dynamic(import('../components/realtime/NameGraph/RangeToGo'), { ssr: false })
const GraphSoc = dynamic(import('../components/realtime/NameGraph/Soc'), { ssr: false })
const GraphSpeed = dynamic(import('../components/realtime/NameGraph/Speed'), { ssr: false })
const GraphStearing = dynamic(import('../components/realtime/NameGraph/Stearing'), { ssr: false })
const GraphVoltBatt = dynamic(import('../components/realtime/NameGraph/VoltBatt'), { ssr: false })

export {
    GraphAbatt,
    GraphAcp,
    GraphBreakPos,
    GraphDragDistance,
    GraphEct,
    GraphGearPos,
    GraphLat,
    GraphLng,
    GraphMotor123Current,
    GraphMotor123RPM,
    GraphMotor123Volt,
    GraphRangeToGo,
    GraphSoc,
    GraphSpeed,
    GraphStearing,
    GraphVoltBatt,
}
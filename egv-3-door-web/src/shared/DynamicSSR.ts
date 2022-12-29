import dynamic from 'next/dynamic'

const GraphAbatt = dynamic(import('../../src/components/NameGraph/ABatt'), { ssr: false })
const GraphAcp = dynamic(import('../../src/components/NameGraph/Acp'), { ssr: false })
const GraphBreakPos = dynamic(import('../../src/components/NameGraph/BreakPos'), { ssr: false })
const GraphEct = dynamic(import('../../src/components/NameGraph/Ect'), { ssr: false })
const GraphGearPos = dynamic(import('../../src/components/NameGraph/GearPos'), { ssr: false })
const GraphMotor123Current = dynamic(import('../../src/components/NameGraph/Motor123Current'), { ssr: false })
const GraphMotor123RPM = dynamic(import('../../src/components/NameGraph/Motor123RPM'), { ssr: false })
const GraphMotor123Volt = dynamic(import('../../src/components/NameGraph/Motor123Volt'), { ssr: false })
const GraphRangeToGo = dynamic(import('../../src/components/NameGraph/RangeToGo'), { ssr: false })
const GraphSoc = dynamic(import('../../src/components/NameGraph/Soc'), { ssr: false })
const GraphSpeed = dynamic(import('../../src/components/NameGraph/Speed'), { ssr: false })
const GraphStearing = dynamic(import('../../src/components/NameGraph/Stearing'), { ssr: false })
const GraphVoltBatt = dynamic(import('../../src/components/NameGraph/VoltBatt'), { ssr: false })

export {
    GraphAbatt,
    GraphAcp,
    GraphBreakPos,
    GraphEct,
    GraphGearPos,
    GraphMotor123Current,
    GraphMotor123RPM,
    GraphMotor123Volt,
    GraphRangeToGo,
    GraphSoc,
    GraphSpeed,
    GraphStearing,
    GraphVoltBatt,
}
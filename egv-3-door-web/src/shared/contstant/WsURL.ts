// const urlSend: string = 'ws://api.ecu-shop.com/egv-datalog'
const urlSend: string = 'ws://127.0.0.1:4000/egv-datalog'
const protocolSend: string = 'egv-sender'

// const urlReceive: string = 'ws://api.ecu-shop.com/egv-datalog-monitor'
const urlReceive: string = 'ws://127.0.0.1:4000/egv-datalog-monitor'
const protocolReceive: string = 'egv-monitor'

const urlStatus: string = 'ws://localhost:4000/egv-datalog-status'
const protocolStatus: string = 'egv-status'

export {
    urlSend,
    protocolSend,
    urlReceive,
    protocolReceive,
    urlStatus,
    protocolStatus

}
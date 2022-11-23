import SampledValue from './shared/SampledValue';

interface MeterValue {
  timestamp: Date;
  sampledValue: SampledValue[];
}

interface MeterValuesPayloadRequest {
  connectorId: number;
  transactionId?: number;
  meterValue: MeterValue[];
}

export { MeterValuesPayloadRequest };

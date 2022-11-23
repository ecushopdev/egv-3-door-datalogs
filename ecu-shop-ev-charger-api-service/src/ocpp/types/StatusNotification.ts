interface StatusNotificationPayloadRequest {
  connectorId: number;
  errorCode:
    | 'ConnectorLockFailure'
    | 'EVCommunicationError'
    | 'GroundFailure'
    | 'HighTemperature'
    | 'InternalError'
    | 'LocalListConflict'
    | 'NoError'
    | 'OtherError'
    | 'OverCurrentFailure'
    | 'PowerMeterFailure'
    | 'PowerSwitchFailure'
    | 'ReaderFailure'
    | 'ResetFailure'
    | 'UnderVoltage'
    | 'OverVoltage'
    | 'WeakSignal';
  status:
    | 'Available'
    | 'Preparing'
    | 'Charging'
    | 'SuspendedEVSE'
    | 'SuspendedEV'
    | 'Finishing'
    | 'Reserved'
    | 'Unavailable'
    | 'Faulted';
  info?: string;
  timestamp?: Date;
  vendorId?: string;
  vendorErrorCode?: string;
}

export { StatusNotificationPayloadRequest };

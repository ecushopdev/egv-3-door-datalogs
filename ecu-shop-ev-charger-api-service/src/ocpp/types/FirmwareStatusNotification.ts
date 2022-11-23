interface FirmwareStatusNotificationPayloadRequest {
  status:
    | 'Downloaded'
    | 'DownloadFailed'
    | 'Downloading'
    | 'Idle'
    | 'InstallationFailed'
    | 'Installing'
    | 'Installed';
}

export { FirmwareStatusNotificationPayloadRequest };

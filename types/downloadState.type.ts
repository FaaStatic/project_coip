export type DownloadStateType = {
  showDownloadDialog: boolean;
  progressDownload: number;
  showDownloadProgress: (data: boolean) => void;
  updateDownloadProgress: (data: number) => void;
  resetDownloadProgress: () => void;
  errorDownload?: boolean;
  changeErrorDownload?: (value: boolean) => void;
};

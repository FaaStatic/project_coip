import { create } from 'zustand';
import { DownloadStateType } from '@untr/apps-coip/types/downloadState.type';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';

const DownloadComponentState = create<DownloadStateType>()(
  immer((set) => ({
    progressDownload: 0,
    showDownloadDialog: false,
    errorDownload: false,
    changeErrorDownload: (value) =>
      set(
        produce(() => ({
          errorDownload: value,
        }))
      ),
    showDownloadProgress: (isOpen) => set(() => ({ showDownloadDialog: isOpen })),
    updateDownloadProgress: (value) =>
      set(
        produce(() => ({
          progressDownload: value,
        }))
      ),
    resetDownloadProgress: () =>
      set(
        produce(() => ({
          progressDownload: 0,
        }))
      ),
  }))
);

export default DownloadComponentState;

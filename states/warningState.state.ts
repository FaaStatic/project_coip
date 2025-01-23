import { produce } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { WarningType } from '@untr/apps-coip/types/warningStateType.type';

const WarningState = create<WarningType>()(
  immer((set) => ({
    open: false,
    title: 'Warning!',
    btnAgree: 'Continue',
    btnCancel: 'Cancel',
    desc: 'This Warning...',
    updateAgreeText: (value) => set(produce(() => ({ btnAgree: value }))),
    updateCancelText: (value) => set(produce(() => ({ btnCancel: value }))),
    updateTitle: (value) => set(produce(() => ({ title: value }))),
    updateDesc: (value) => set(produce(() => ({ desc: value }))),
    updateWarning: (value) => set(produce(() => ({ open: value }))),
    onExit: () => set(produce(() => ({ open: false }))),
  }))
);

export default WarningState;

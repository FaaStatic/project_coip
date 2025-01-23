import { produce } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { reloadFunctionStateType } from '@untr/apps-coip/types/reloadFunctionState.type';

const ReloadState = create<reloadFunctionStateType>()(
  immer((set) => ({
    reloadFunc: false,
    changeReloadState: (data) =>
      set(
        produce(() => ({
          reloadFunc: data,
        }))
      ),
  }))
);

export default ReloadState;

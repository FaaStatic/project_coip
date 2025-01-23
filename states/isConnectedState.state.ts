import { produce } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IsConnectedStateType } from '@untr/apps-coip/types/isConnectState.type';

const isConnectedState = create<IsConnectedStateType>()(
  immer((set) => ({
    isConnect: false,
    changeConnectState: (data) =>
      set(
        produce(() => ({
          isConnect: data,
        }))
      ),
  }))
);

export default isConnectedState;

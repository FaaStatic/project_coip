import { produce } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LoadingStateType } from '@untr/apps-coip/types/loadingStateType.type';

const LoadingState = create<LoadingStateType>()(
  immer((set) => ({
    isLoading: false,
    changeLoading: (data) =>
      set(
        produce(() => ({
          isLoading: data,
        }))
      ),
  }))
);

export default LoadingState;

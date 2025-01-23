import { produce } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { RefreshNewSync } from '../types/refreshNewSync';

const NewSubmitRefreshState = create<RefreshNewSync>()(
  immer((set) => ({
    refresh: false,
    changeRefreshState: (data) =>
      set(
        produce(() => ({
          isLoading: data,
        }))
      ),
  }))
);

export default NewSubmitRefreshState;

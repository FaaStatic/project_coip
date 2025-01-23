import { create } from 'zustand';
import { FirstBootStateType } from '@untr/apps-coip/types/firstBootState.type';

const FirstBootState = create<FirstBootStateType>()((set) => ({
  firstBoot: true,
  changeFirstBoottState: (data: boolean) =>
    set(() => ({
      firstBoot: data,
    })),
}));

export default FirstBootState;

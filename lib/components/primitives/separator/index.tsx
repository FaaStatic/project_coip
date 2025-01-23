import * as React from 'react';
import { View } from 'react-native';
import * as Slot from '@untr/apps-coip/lib/components/primitives/slot';
import type {
  SlottableViewProps,
  ViewRef,
} from '@untr/apps-coip/lib/components/primitives/types';
import type { SeparatorRootProps } from './types';

const Root = React.forwardRef<ViewRef, SlottableViewProps & SeparatorRootProps>(
  ({ asChild, decorative, orientation = 'horizontal', ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Component
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        ref={ref}
        {...props}
      />
    );
  },
);

Root.displayName = 'RootSeparator';

export { Root };

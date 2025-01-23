import * as Slot from '@untr/apps-coip/lib/components/primitives/slot';
import { SlottableTextProps, TextRef } from '@untr/apps-coip/lib/components/primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '@untr/apps-coip/lib/utils';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        style={{
          fontFamily: FontsUtils.regular,
        }}
        className={cn('text-base text-foreground web:select-text', textClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };

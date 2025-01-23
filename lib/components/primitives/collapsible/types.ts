import type { ForceMountable } from '@untr/apps-coip/lib/components/primitives/types';

interface RootContext {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    disabled: boolean;
}

interface CollapsibleRootProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
}

type CollapsibleContentProps = ForceMountable;

export type { CollapsibleContentProps, CollapsibleRootProps, RootContext };

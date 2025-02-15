import type {
  ForceMountable,
  PressableRef,
} from '@untr/apps-coip/lib/components/primitives/types';

interface TooltipRootProps {
  onOpenChange?: (open: boolean) => void;
  /**
   * Platform: WEB ONLY
   * @default 700
   */
  delayDuration?: number;
  /**
   * Platform: WEB ONLY
   * @default 300
   */
  skipDelayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  disableHoverableContent?: boolean;
}

interface TooltipPortalProps extends ForceMountable {
  children: React.ReactNode;
  /**
   * Platform: NATIVE ONLY
   */
  hostName?: string;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}

interface TooltipOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

interface TooltipTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

export type {
  TooltipOverlayProps,
  TooltipPortalProps,
  TooltipRootProps,
  TooltipTriggerRef,
};

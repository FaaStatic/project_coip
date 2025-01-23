export type WarningType = {
  open: boolean;
  title: string;
  desc: string;
  btnAgree: string;
  btnCancel: string;
  onExit: (data: boolean) => void;
  updateWarning: (data: boolean) => void;
  updateTitle: (data: string) => void;
  updateDesc: (data: string) => void;
  updateAgreeText: (data: string) => void;
  updateCancelText: (data: string) => void;
};

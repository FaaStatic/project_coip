import { memo } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@untr/apps-coip/lib/components/ui/alert-dialog';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import Text from './Text';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { TouchableOpacity } from 'react-native';

type StatusAlertProp = {
  isError: boolean;
  title: string;
  desc: string;
  titleBtn: string;
  callbackCloseAlert: (closeValue: boolean) => void;
  isOpen: boolean;
};

const StatusAlertDialog = ({
  isError,
  title,
  desc,
  titleBtn,
  callbackCloseAlert,
  isOpen,
}: StatusAlertProp) => {
  if (isOpen) {
    return (
      <AlertDialog open={isOpen}>
        <AlertDialogContent
          className={`ps-5 pe-5 h-fit pt-2 pb-2 flex-col w-4/6 rounded-2xl bg-white`}
          style={{
            borderColor: ColorsApp.listTextColor,
            borderWidth: 0.5,
          }}
        >
          {!isError ? (
            <IconsApp.IconSuccessV2
              width={180}
              height={180}
              color={ColorsApp.successColor}
              style={{
                alignSelf: 'center',
                marginTop: 8,
                marginBottom: 8,
              }}
            />
          ) : null}
          {isError ? (
            <IconsApp.IconWarningV2
              width={180}
              height={180}
              color={ColorsApp.errorColor}
              style={{
                alignSelf: 'center',
                marginTop: 8,
                marginBottom: 8,
              }}
            />
          ) : null}
          <AlertDialogTitle
            style={{
              alignSelf: 'center',
              fontFamily: FontsUtils.bold,
              color: ColorsApp.black,
              fontSize: CustomDimension.sizeInSp(16),
            }}
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            style={{
              fontFamily: FontsUtils.regular,
              alignSelf: 'center',
              color: ColorsApp.warningTextColor,
              fontSize: CustomDimension.sizeInSp(12),
            }}
          >
            {desc}
          </AlertDialogDescription>
          <TouchableOpacity
            onPress={() => {
              callbackCloseAlert(false);
            }}
            className="mb-2 mt-2 rounded-xl h-10 justify-center items-center"
            style={{
              backgroundColor: isError ? ColorsApp.gray300 : ColorsApp.primary,
            }}
          >
            <Text
              size={14}
              style={{
                fontFamily: FontsUtils.bold,
                color: isError ? ColorsApp.white : ColorsApp.black,
              }}
            >
              {titleBtn}
            </Text>
          </TouchableOpacity>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return null;
  }
};

export default memo(StatusAlertDialog);

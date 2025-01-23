import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@untr/apps-coip/lib/components/ui/alert-dialog';
import Text from './Text';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { View } from 'react-native';
import { testProps } from '@untr/apps-coip/utils/idComponentHelper.util';
import { TestUnitIDConstant } from '@untr/apps-coip/constants/testUnitID.constants';

interface AlertDialogCustomProps {
  openAlert: boolean;
  titleAgree?: string;
  titleCancel?: string;
  callbackAgree?: (data: boolean) => void;
  callbackDisagree?: (data: boolean) => void;
  colorAgree?: string;
  colorDisAgree?: string;
  usingImageCancel?: boolean;
  usingImageAgree?: boolean;
  title: string;
  description: string;
  usingCancel?: boolean;
  usingAgree?: boolean;
}

const AlertDialogCustom = ({
  openAlert,
  callbackAgree = (data: boolean) => {},
  callbackDisagree = (data: boolean) => {},
  title,
  description,
  usingCancel = true,
  usingAgree = true,
  colorAgree = ColorsApp.primary,
  colorDisAgree = ColorsApp.gray300,
  usingImageCancel = false,
  usingImageAgree = false,
  titleAgree = 'Continue',
  titleCancel = 'Cancel',
}: AlertDialogCustomProps) => {
  if (openAlert) {
    return (
      <AlertDialog
        open={openAlert}
        onOpenChange={(data) => {
          callbackDisagree(data);
        }}
      >
        <AlertDialogContent
          className="bg-white"
          style={{
            marginHorizontal: CustomDimension.scaledHorizontal(25),
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="items-center justify-center flex-col color-yellow-400"
              style={{
                fontFamily: FontsUtils.bold,
                fontSize: CustomDimension.sizeInSp(16),
                textAlign: 'center',
              }}
            >
              {title}
            </AlertDialogTitle>

            {usingImageCancel && (
              <View className="items-center">
                <IconsApp.IconWarningV2
                  height={120}
                  width={120}
                  className="self-center mt-1 mb-1"
                />
              </View>
            )}
            {usingImageAgree && (
              <View className="items-center">
                <IconsApp.IconSuccessV2 height={120} width={120} className="self-center" />
              </View>
            )}
            <AlertDialogDescription
              className="p-2"
              style={{
                fontFamily: FontsUtils.medium,
                fontSize: CustomDimension.sizeInSp(12),
              }}
            >
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 justify-between items-center">
            {usingAgree ? (
              <AlertDialogAction
                {...testProps(TestUnitIDConstant.ALERTDIALOGCUSTOM_BUTTON_AGREE)}
                onPress={() => {
                  callbackAgree(!openAlert);
                }}
                style={{
                  paddingVertical: CustomDimension.scaledVertical(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: colorAgree,
                }}
              >
                <Text
                  color="white"
                  style={{
                    fontFamily: FontsUtils.bold,
                    fontSize: CustomDimension.sizeInSp(12),
                  }}
                >
                  {titleAgree}
                </Text>
              </AlertDialogAction>
            ) : null}
            {usingCancel ? (
              <AlertDialogCancel
                {...testProps(TestUnitIDConstant.ALERTDIALOGCUSTOM_BUTTON_BUTTON_CLOSE)}
                onPress={() => {
                  callbackDisagree(!openAlert);
                }}
                style={{
                  paddingVertical: CustomDimension.scaledVertical(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colorDisAgree,
                  flex: 1,
                }}
              >
                <Text
                  color="white"
                  style={{
                    fontFamily: FontsUtils.medium,
                    fontSize: CustomDimension.sizeInSp(12),
                  }}
                >
                  {titleCancel}
                </Text>
              </AlertDialogCancel>
            ) : null}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return null;
  }
};

export default AlertDialogCustom;

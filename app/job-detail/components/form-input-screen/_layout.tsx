import { memo, useEffect, useState } from 'react';
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import AlertDialogCustom from '@untr/apps-coip/components/AlertDialogCustom';
import LoadingCustom from '@untr/apps-coip/components/LoadingCustom';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Space from '@untr/apps-coip/components/Space';
import { useKeyboard } from '@untr/apps-coip/lib/keyboard';
import RenderChecksheet from './components/RenderChecksheet';
import { checkInputErrorsType, inputChecksheetType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import ScreenEmpty from '@untr/apps-coip/components/ScreenEmpty';

interface FormInputScreenProps {
  section: string;
  isDisabled: boolean;
  status?: number;
}

const FormInputScreen = ({ section, status, isDisabled }: FormInputScreenProps) => {
  const form = useFormContext<inputChecksheetType>();
  const errorsField: FieldErrors<checkInputErrorsType> = form.formState.errors;

  const { fields: formChecksheet } = useFieldArray({
    control: form.control,
    shouldUnregister: false,
    name: `${section}.data`,
  });

  const { isKeyboardVisible, keyboardHeight } = useKeyboard();

  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const [idOpenParent, setIdOpenParent] = useState<string | number>(formChecksheet[0]?.id || 0);
  const [idOpenChild, setIdOpenChild] = useState<string | number>(
    formChecksheet[0]?.data[0]?.id || 0
  );

  useEffect(() => {
    if (idOpenChild !== 0) {
      setLoading(false);
    }
  }, [idOpenChild]);

  return (
    <KeyboardAvoidingView behavior="padding">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={true}
        bottomOffset={isKeyboardVisible ? keyboardHeight : 0}
        contentContainerStyle={styles.viewKeyboardAvoidStyle}
        style={{
          paddingTop: CustomDimension.scaledVertical(25),
          paddingHorizontal: CustomDimension.scaledHorizontal(25),
        }}
      >
        <View>
          {formChecksheet && formChecksheet.length > 0 ? (
            <View>
              {formChecksheet.map((dataParent, index) => {
                const item: any = dataParent;
                return (
                  <RenderChecksheet
                    key={`${item.id} + x`}
                    item={item}
                    index={index}
                    errors={errorsField}
                    section={section}
                    idOpenParent={idOpenParent}
                    idOpenChild={idOpenChild}
                    status={status}
                    isDisabled={isDisabled}
                    setIdOpenChild={setIdOpenChild}
                    setIdOpenParent={setIdOpenParent}
                  />
                );
              })}
            </View>
          ) : (
            <ScreenEmpty title={'Form Not Found'} description={'Maybe Form is not redy for now!'} />
          )}
          {form.watch(`${section}.data`).length === 0 ? (
            <ScreenEmpty
              title="Checksheet Empty"
              description="CheckSheet Empty So please contact admin"
            />
          ) : null}
        </View>
        {loading ? (
          <View className="h-full w-full items-center justify-center">
            <LoadingCustom showLoading={loading} />
          </View>
        ) : null}

        <Space height={80} />
        <AlertDialogCustom
          usingCancel={false}
          openAlert={openAlert}
          callbackAgree={(data) => {
            setOpenAlert(data);
          }}
          callbackDisagree={(data) => {
            setOpenAlert(data);
          }}
          title={'Warning!'}
          description={'Please fill comment form, because your level under 4!'}
        />
      </KeyboardAwareScrollView>
      {/* <KeyboardToolbar /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  viewKeyboardAvoidStyle: { flexGrow: 1 },
});

export default memo(FormInputScreen);

import { memo, useEffect, useRef, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { Platform, StyleSheet, View } from 'react-native';
import AlertDialogCustom from '@untr/apps-coip/components/AlertDialogCustom';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import Space from '@untr/apps-coip/components/Space';
import InformationComponents from './component/InformationComponents';
import DetailInformationComponents from './component/DetailInformationComponents';
import UnitItemComponents from './component/UnitItemComponents';
import { inputChecksheetType, jobIdentityErrorsType } from '@untr/apps-coip/types/inputCheckSheetType.type';

type jobIdentityProps = {
  section: string;
  customer?: any;
  title?: string;
  date?: string;
  jobId?: string;
  isDisabled: boolean;
  assignId?: string;
  status?: number;
};

const JobIdentity = ({
  section,
  customer,
  date,
  assignId,
  jobId,
  isDisabled,
  status,
}: jobIdentityProps) => {
  const methodsForm = useFormContext<inputChecksheetType>();
  let errorsField: FieldErrors<jobIdentityErrorsType> = methodsForm.formState.errors;

  const scrollViewRef = useRef(null);
  const [openWarningInput, setOpenWarningInput] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(errorsField).length > 0 && scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.viewStyleScreen}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        enabled={true}
        extraKeyboardSpace={50}
        disableScrollOnKeyboardHide={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.viewContainerScroll}
        className="flex-col pt-5 ps-5 pe-5"
        scrollEventThrottle={16}
      >
        <InformationComponents
          customer={customer}
          date={date}
          assignId={assignId}
          status={status}
          section={section}
          isDisabled={isDisabled}
        />
        <Space height={7} />
        <View style={styles.viewLinesStyle} />
        <DetailInformationComponents
          section={section}
          isDisabled={isDisabled}
          setOpenWarningInput={setOpenWarningInput}
        />

        <Space height={24} />

        <UnitItemComponents jobId={jobId} isDisabled={isDisabled} section={section} />
        <Space height={24} />
        <AlertDialogCustom
          openAlert={openWarningInput}
          title={'Warning'}
          description={'Your Time input must be bigger from start date!'}
          callbackDisagree={() => {
            setOpenWarningInput(false);
          }}
          usingCancel={true}
          usingAgree={false}
          titleCancel="Close"
        />
        {Platform.OS === 'ios' && <KeyboardToolbar />}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  viewStyleScreen: { flex: 1 },
  viewContainerScroll: { flexGrow: 1 },

  viewLinesStyle: {
    backgroundColor: '#F1F1F1',
    height: 1,
    marginTop: 20,
    marginBottom: 16,
  },
  marginTop16: {
    marginTop: 16,
  },
  marginBottom24: {
    marginBottom: 24,
  },
});

export default memo(JobIdentity);

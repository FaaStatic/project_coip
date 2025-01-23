import { useFormContext } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity } from 'react-native';
import Space from '@untr/apps-coip/components/Space';
import { useSavingForm } from '@untr/apps-coip/hooks/useSavingForm';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import ReloadState from '@untr/apps-coip/states/reload.state';

type BtnSaveFormProp = {
  setSaveProcess: (data: boolean) => void;
  saveProcess?: boolean;
  assignId: string;
  isSync: boolean;
  setIsSubmit: (data: boolean) => void;
  setIsErrorStatus: (data: boolean) => void;
  setIsSuccessStatus: (data: boolean) => void;
};

const BtnSaveForm = ({
  setSaveProcess,
  saveProcess,
  isSync,
  assignId,
  setIsErrorStatus,
  setIsSubmit,
  setIsSuccessStatus,
}: BtnSaveFormProp) => {
  const saveForm = useFormContext();
  const updateReload = ReloadState((state) => state.changeReloadState);
  const { isPending: dataSavingLoading, mutateAsync: mutateDataSaving } = useSavingForm();

  const onSaving = async (dataSave: any) => {
    setIsSubmit(false);
    await new Promise(() => {
      setTimeout(async () => {
        await mutateDataSaving(
          {
            data: dataSave,
            jobId: assignId,
            isSync: isSync,
            statusCompleted: 1,
          },
          {
            onSuccess: (_) => {
              updateReload(true);
              setIsSuccessStatus(true);
              setSaveProcess(false);
            },
            onError: (_) => {
              updateReload(false);
              setIsErrorStatus(false);
              setSaveProcess(false);
            },
          }
        );
      }, 500);
    });
  };

  return (
    <View className="flex-1 h-12">
      <TouchableOpacity
        className="items-center justify-center flex-1"
        disabled={dataSavingLoading}
        onPress={() => {
          saveForm.clearErrors();
          setSaveProcess(true);
          saveForm.handleSubmit(onSaving)();
        }}
        style={styles(dataSavingLoading).btnSaveStyle}
      >
        {dataSavingLoading || saveProcess ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator color={'white'} size={'small'} />
            <Space width={8} />
            <Text size={14} type="medium" style={styles().processTextStyle}>
              Saving ...
            </Text>
          </View>
        ) : (
          <Text size={14} type="medium" style={styles().idleTextStyle}>
            Save
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = (dataSavingLoading?: boolean, isSubmit?: boolean) =>
  StyleSheet.create({
    btnSaveStyle: {
      backgroundColor:
        !dataSavingLoading && !isSubmit ? ColorsApp.successColor : ColorsApp.secondaryVariant,
      borderRadius: 8,
      height: 48,
    },
    processTextStyle: {
      fontWeight: '600',
      fontFamily: FontsUtils.medium,
    },
    idleTextStyle: {
      fontFamily: FontsUtils.bold,
      color: 'white',
    },
  });

export default BtnSaveForm;

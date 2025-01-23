import { memo, useCallback, useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent } from '@untr/apps-coip/lib/components/ui/alert-dialog';
import Text from './Text';
import LoadingCustom from './LoadingCustom';
import { StyleSheet, View } from 'react-native';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { createCustomerListDB } from '@untr/apps-coip/utils/customer.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import CustomerList from '@untr/apps-coip/schemas/CustomerList/CustomerList.schema';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { useCustomerGetCustomerListHook } from '@untr/apps-coip/api/jobCreation/hooks/customer/useCustomerGetCustomerListHook';

type GetCutomerDataProp = {
  open: boolean;
  setOpen: (data: boolean) => void;
  setOpenUserList: (data: boolean) => void;
};

const GetCutomerData = ({ open, setOpen, setOpenUserList }: GetCutomerDataProp) => {
  const { data, isFetching, refetch } = useCustomerGetCustomerListHook();
  const [progress, setProgress] = useState(0);

  const isEmpty = async () => {
    let result = (await readAllDatafromDB<CustomerList[]>(schemaDatabase.CustomerList)) ?? [];
    return result?.length === 0 ? true : false;
  };

  const customerProses = useCallback(async () => {
    const dataIsEmpty = await isEmpty();

    if (data && !dataIsEmpty) {
      setOpen(false);
      setOpenUserList(true);
    } else {
      if (data && dataIsEmpty) {
        await createCustomerListDB(data, setProgress).then(() => {
          setOpen(false);
          setOpenUserList(true);
        });
      } else {
        refetch();
      }
    }
  }, [data, isFetching]);

  useEffect(() => {
    isEmpty().then((value) => {
      if (value) {
        customerProses();
      } else {
        setOpen(false);
        setOpenUserList(true);
      }
    });
  }, [customerProses]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[250px] h-[250px] flex flex-col aspect-square rounded-[8px] items-center justify-center bg-white p-3">
        <Text>Get Data Customer</Text>
        <View className="w-32 h-32 aspect-square items-center justify-center my-4">
          <LoadingCustom showBg={false} showLoading={true} heightBg={128} />
        </View>
        {!data ? (
          <Text style={styles.textPending}>Please wait ...</Text>
        ) : (
          <Text style={styles.textProgress}>Progress {progress}%</Text>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: CustomDimension.sizeInSp(16),
    fontFamily: FontsUtils.bold,
    color: ColorsApp.black500,
  },
  textPending: {
    fontSize: CustomDimension.sizeInSp(12),
    fontFamily: FontsUtils.medium,
  },
  textProgress: { fontSize: CustomDimension.sizeInSp(13), fontFamily: FontsUtils.medium },
});

export default memo(GetCutomerData);

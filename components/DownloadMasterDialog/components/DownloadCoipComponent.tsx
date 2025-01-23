import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { UserTypeSchema } from '@untr/apps-coip/types/user.type';
import Space from '@untr/apps-coip/components/Space';
import Text from '@untr/apps-coip/components/Text';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import { useCoipGetSyncHook } from '@untr/apps-coip/api/msCoip/hooks/coip/useCoipGetSyncHook';
import { syncronizingCoipDataUtil } from '@untr/apps-coip/utils/syncronizingCoipData.util';
import ReloadState from '@untr/apps-coip/states/reload.state';
import NewSubmitRefreshState from '@untr/apps-coip/states/newSubmitRefresh';
import normalizedDataApi from '@untr/apps-coip/utils/normalizedData.util';

type jobComponentProp = {
  setTotalDownload: (data: number) => void;
  tempJob: any;
  user: UserTypeSchema;
  doneDownload: boolean;
};

const DownloadCoipComponent = ({
  setTotalDownload,
  user,
  tempJob,
  doneDownload,
}: jobComponentProp) => {
  const {
    data: dataMasterCheeksheet,
    isError: isCoipError,
    isSuccess: isCoipSuccess,
    isPending: pendingJobCoipnync,
  } = useCoipGetSyncHook(
    {
      date: moment().format('YYYY-MM-DD'),
      customerCode: user?.customerCode,
    },
    {
      query: {
        enabled: doneDownload && user !== null,
        retry: (failureCount, _) => {
          return failureCount <= 3;
        },
        gcTime: 500,
        retryDelay: 30000,
        select: (data) => normalizedDataApi(data),
      },
    }
  );
  const connected = isConnectedState((state) => state.isConnect);
  const updateReload = ReloadState((state) => state.changeReloadState);
  const newRefreshJob = NewSubmitRefreshState((state) => state.refresh);
  const changeRefreshJob = NewSubmitRefreshState((state) => state.changeRefreshState);
  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);
  const setErrorDownload = DownloadComponentState((state) => state.changeErrorDownload);
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const downloadCoipMaster = async () => {
    if (dataMasterCheeksheet && connected) {
      try {
        await syncronizingCoipDataUtil({
          data: dataMasterCheeksheet,
          dataJob: tempJob,
          refreshCompleted: newRefreshJob,
          setProgress: (value) => setProgress(Number(value.toFixed(2))),
        });

        setTotalDownload(2 / 2);
        setTimeout(() => {
          updateReload(true);
          changeRefreshJob(false);
        }, 500);
      } catch (err) {
        setErrorDownload(true);
      } finally {
        setShowDownload(false);
      }
    } else {
      errorDownloadFunction();
    }
  };

  const exitSync = async () => {
    setShowDownload(false);
    await new Promise((_) =>
      setTimeout(() => {
        setErrorDownload(true);
      }, 500)
    );
  };

  const errorDownloadFunction = () => {
    if (isCoipError || !connected) {
      exitSync();
    }

    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
    } else {
      setShowDownload(false);
      setErrorDownload(true);
    }
  };

  useEffect(() => {
    if (isCoipSuccess && connected) downloadCoipMaster();
    if (isCoipError) exitSync();
  }, [isCoipSuccess, connected, isCoipError]);

  return (
    <View className="h-fit flex-col justify-center">
      <Progress.Bar
        width={null}
        color={ColorsApp.primary}
        borderColor={ColorsApp.primaryVariant}
        animated
        useNativeDriver
        animationType="timing"
        progress={progress}
      />
      <Space height={8} />
      <View className="flex-1 h-fit">
        {pendingJobCoipnync && (
          <Text size={CustomDimension.sizeInSp(10)} style={styles.boldStyleText}>
            Preparing COIP Data ...
          </Text>
        )}

        {isCoipSuccess && (
          <Text size={CustomDimension.sizeInSp(10)} style={styles.regularStyleText}>
            Percentage {progress * 100} %
          </Text>
        )}
        {isCoipError && (
          <Text size={CustomDimension.sizeInSp(10)} style={styles.regularStyleTextError}>
            Error Download due to network or server issues. Please check your connection and
            re-sync.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boldStyleText: { color: ColorsApp.primary, fontFamily: FontsUtils.bold },
  regularStyleText: { color: ColorsApp.primary, fontFamily: FontsUtils.regular },
  regularStyleTextError: { color: ColorsApp.errorColor, fontFamily: FontsUtils.regular },
});

export default DownloadCoipComponent;

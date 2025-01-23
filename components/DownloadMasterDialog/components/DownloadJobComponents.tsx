import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useJobCreationSyncsHook } from '@untr/apps-coip/api/jobCreation/hooks/jobCreation/useJobCreationSyncsHook';
import * as Progress from 'react-native-progress';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { UserTypeSchema } from '@untr/apps-coip/types/user.type';
import Space from '@untr/apps-coip/components/Space';
import Text from '@untr/apps-coip/components/Text';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { syncronizingJobDataUtil } from '@untr/apps-coip/utils/syncronizingJobData.util';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import normalizedDataApi from '@untr/apps-coip/utils/normalizedData.util';

type jobComponentProp = {
  userFetchSuccess: boolean;
  isFinishUpload: boolean;
  user: UserTypeSchema;
  setTotalDownload: (data: number) => void;
  setTempJob: (data: any) => void;
  setDoneDownloadJob: (data: boolean) => void;
};

const DownloadJobComponent = ({
  userFetchSuccess,
  isFinishUpload,
  user,
  setTotalDownload,
  setTempJob,
  setDoneDownloadJob,
}: jobComponentProp) => {
  const connected = isConnectedState((state) => state.isConnect);
  const [progress, setProgress] = useState(0);
  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);
  const setErrorDownload = DownloadComponentState((state) => state.changeErrorDownload);
  const [retryCount, setRetryCount] = useState(0);
  const {
    data: dataJobsSync,
    isSuccess: isJobSyncSuccess,
    isPending: pendingJobCreationSync,
    isError: isJobCreationError,
  } = useJobCreationSyncsHook(
    {
      date: moment().format('YYYY-MM-DD'),
      customerCode: user?.customerCode,
    },
    {
      query: {
        enabled: isFinishUpload && user !== null,
        retry: (failureCount, _) => {
          return failureCount <= 3;
        },
        retryDelay: 60000,
        gcTime: 500,
        select: (data) => normalizedDataApi(data),
      },
    }
  );
  const exitSync = async () => {
    setShowDownload(false);
    await new Promise((_) =>
      setTimeout(() => {
        setErrorDownload(true);
      }, 500)
    );
  };

  const errorDownloadFunction = () => {
    if (isJobCreationError || !connected) {
      exitSync();
    }

    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
    } else {
      setShowDownload(false);
      setErrorDownload(true);
    }
  };

  const downloadDataMaster = async () => {
    if (dataJobsSync && connected) {
      try {
        await syncronizingJobDataUtil({
          data: dataJobsSync,
          setProgress: (value) => setProgress(Number(value.toFixed(2))),
          setTempJobData: (value) => setTempJob(value),
        });
        setTotalDownload(1 / 2);
        setTimeout(() => {
          setDoneDownloadJob(true);
        }, 500);
      } catch (err) {
        setErrorDownload(true);
      }
    } else {
      errorDownloadFunction();
    }
  };

  useEffect(() => {
    downloadDataMaster();
  }, [dataJobsSync, connected]);

  useEffect(() => {
    if (isJobCreationError) {
      exitSync();
    }
  }, [isJobCreationError]);

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
        {pendingJobCreationSync && (
          <Text size={CustomDimension.sizeInSp(10)} style={styles.boldStyleText}>
            Preparing Job Data ...
          </Text>
        )}

        {isJobSyncSuccess && (
          <Text size={CustomDimension.sizeInSp(10)} style={styles.regularStyleText}>
            Percentage {progress * 100} %
          </Text>
        )}
        {isJobCreationError && (
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

export default DownloadJobComponent;

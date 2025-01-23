import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import * as Progress from 'react-native-progress';
import Space from '@untr/apps-coip/components/Space';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import { useJobCreationJobsPostHook } from '@untr/apps-coip/api/jobCreation/hooks/jobCreation';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import { SyncPostDatabase } from '@untr/apps-coip/utils/syncPostDatabase.util';
import DownloadCoipComponent from './components/DownloadCoipComponent';
import DownloadJobComponent from './components/DownloadJobComponents';

const DownloadMasterDialog = () => {
  const connected = isConnectedState((state) => state.isConnect);
  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);
  const setErrorDownload = DownloadComponentState((state) => state.changeErrorDownload);
  const [isFinishUpload, setIsFinishUpload] = useState(false);
  const [totalDataDownload, setTotalDataDownload] = useState(0);
  const [doneJobDownload, setDoneJobDownload] = useState(false);
  const [tempJob, setTempJob] = useState([]);
  const { data: user, isSuccess: userFetchSuccess } = useGetUserLocal();
  const uploadDataJob = useJobCreationJobsPostHook();

  useEffect(() => {
    const uploadData = async () => {
      try {
        if (user && connected) {
          await SyncPostDatabase({ uploadDataJob });
          setIsFinishUpload(true);
        }
      } catch (error) {
        console.log(error, 'err');
        setShowDownload(false);
        setErrorDownload(true);
      }
    };
    uploadData();
  }, [user, connected]);

  useEffect(() => {
    if (!connected) {
      setShowDownload(false);
      setErrorDownload(true);
    }
  }, [connected]);

  return (
    <View className="absolute h-full w-full" style={styles.bgStyleComponent}>
      <View
        className={`w-fit flex-col h-fit p-4 bg-white shadow-2xl shadow-[${ColorsApp.gray500}] me-5 ms-5 mb-9 rounded-lg absolute left-0 right-0 bottom-1 z-50`}
        style={styles.elevationStyleCard}
      >
        <Text style={{ fontFamily: FontsUtils.bold }}>Synchronizing ...</Text>
        <Space height={16} />
        <View className="h-fit flex-col justify-center">
          <Progress.Bar
            width={null}
            color={ColorsApp.primary}
            borderColor={ColorsApp.primaryVariant}
            animated
            useNativeDriver
            animationType="timing"
            progress={totalDataDownload}
          />
          <Space height={8} />
          <View>
            <Text
              size={CustomDimension.sizeInSp(10)}
              style={{ color: ColorsApp.primary, fontFamily: FontsUtils.bold }}
            >
              {doneJobDownload ? 'Syncronizing COIP Data...' : 'Syncronizing Job Data...'}
            </Text>
          </View>
          <Space height={16} />
          {doneJobDownload ? (
            <DownloadCoipComponent
              setTotalDownload={setTotalDataDownload}
              tempJob={tempJob}
              user={user}
              doneDownload={doneJobDownload}
            />
          ) : (
            <DownloadJobComponent
              userFetchSuccess={userFetchSuccess}
              isFinishUpload={isFinishUpload}
              user={user}
              setTotalDownload={setTotalDataDownload}
              setTempJob={setTempJob}
              setDoneDownloadJob={setDoneJobDownload}
            />
          )}
        </View>
      </View>
      <View className="w-full h-full items-center justify-center">
        <View className="w-12 h-12">
          <ActivityIndicator color={ColorsApp.primary} size="large" />
        </View>
        <Text
          size={CustomDimension.sizeInSp(16)}
          style={{ color: ColorsApp.primary, fontFamily: FontsUtils.bold }}
        >
          Loading ...
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bgStyleComponent: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  elevationStyleCard: {
    elevation: 5,
  },
});
export default DownloadMasterDialog;

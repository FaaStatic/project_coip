import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler, View } from 'react-native';
import { useCoipGetChecksheetReportsHook } from '@untr/apps-coip/api/msCoip/hooks/coip';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import normalizedDataApi from '@untr/apps-coip/utils/normalizedData.util';
import ScreenReport from './components/ScreenReport';
import LoadingCustom from '@untr/apps-coip/components/LoadingCustom';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { reportJobType } from '@untr/apps-coip/types/reportJob.types';
import ScreenEmpty from '@untr/apps-coip/components/ScreenEmpty';

const ReportDetail = () => {
  const params = useLocalSearchParams();
  const { jobId, typeCustomer } = params;
  const {
    data: reportData,
    isPending: loadingReport,
    isSuccess: successReport,
    isError: isReportError,
  } = useCoipGetChecksheetReportsHook(
    {
      JobId: String(jobId),
      ReportType: String(typeCustomer),
    },
    {
      query: {
        select: (data) => {
          const rawData = normalizedDataApi(data);
          return rawData as reportJobType;
        },
      },
    }
  );
  const changeLoading = LoadingState((state) => state.changeLoading);

  useFocusEffect(
    useCallback(() => {
      changeLoading(false);
      const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
        router.back();
        return true;
      });

      return () => {
        subscribe.remove();
      };
    }, [])
  );

  if (reportData && !loadingReport && successReport && !isReportError) {
    return <ScreenReport reportData={reportData} isLoading={loadingReport} />;
  } else if (isReportError && !loadingReport && reportData === undefined) {
    return (
      <View className="flex-1 flex-col items-center justify-center ">
        <ScreenEmpty
          title={"Can't load report job"}
          description={"Report job can't load cause data from server isn't provided"}
        />
      </View>
    );
  } else {
    return <LoadingCustom heightBg={CustomDimension.GET_HEIGHT()} showLoading={loadingReport} />;
  }
};

export default ReportDetail;

import { ScrollView, View } from 'react-native';
import { memo, useCallback, useMemo } from 'react';
import Text from '@untr/apps-coip/components/Text';
import { useFocusEffect } from 'expo-router';
import SyncButton from '@untr/apps-coip/components/SyncButton';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FlashList } from '@shopify/flash-list';
import JobCard from '@untr/apps-coip/components/JobCard';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import ReloadState from '@untr/apps-coip/states/reload.state';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@untr/apps-coip/lib/components/ui/skeleton';
import { useGetProgressJob } from '@untr/apps-coip/hooks/useGetProgressJob';
import ScreenEmpty from '@untr/apps-coip/components/ScreenEmpty';

const Jobs = () => {
  const changeLoading = LoadingState((state) => state.changeLoading);
  const queryClient = useQueryClient();
  const reload = ReloadState((state) => state.reloadFunc);
  const changeReload = ReloadState((state) => state.changeReloadState);
  const {
    data: jobCompletedData,
    refetch: jobCompletedRefetch,
    fetchNextPage: jobCompletedFetchNextPage,
    hasNextPage: jobCompletedHasNextPage,
    isFetching: jobCompletedFetching,
  } = useGetProgressJob('DSC', '', '', true);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  useFocusEffect(
    useCallback(() => {
      changeLoading(false);
      if (reload) {
        jobCompletedRefetch();
        changeReload(false);
        changeLoading(false);
      }
      return () => {
        queryClient.resetQueries({
          queryKey: ['jobListCompleted'],
          exact: true,
        });
      };
    }, [reload])
  );
  return (
    <View className="flex-1 flex-col" style={globalStyles().topSafeArea}>
      <View className="mx-5 my-2">
        <View className="max-w-full justify-between align-middle items-center flex-row">
          <Text size={CustomDimension.sizeInSp(22)} style={{ fontFamily: FontsUtils.bold }}>
            Reports
          </Text>
          <SyncButton />
        </View>
      </View>
      {jobCompletedData !== undefined && !jobCompletedFetching ? (
        <ScrollView
          className="flex-1 ps-5 pe-5"
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && jobCompletedHasNextPage) {
              jobCompletedFetchNextPage();
            }
          }}
          scrollEventThrottle={400}
          style={{
            backgroundColor: ColorsApp.background,
          }}
        >
          {jobCompletedData.length > 0 ? (
            <View
              style={{
                flexGrow: 1,
              }}
            >
              <FlashList
                estimatedFirstItemOffset={10}
                scrollEnabled={false}
                estimatedItemSize={jobCompletedData.length}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{
                  paddingTop: 16,
                }}
                data={jobCompletedData.flat()}
                renderItem={({ item, index }) => (
                  <JobCard
                    isCompleted={true}
                    isReport={true}
                    jobcard={item}
                    key={`${item.id}+${index}`}
                  />
                )}
              />
            </View>
          ) : (
            <View className="self-center h-full flex-grow">
              <ScreenEmpty
                title="Job is Empty"
                description="Job is Empty ..."
                heightView={CustomDimension.GET_HEIGHT()}
              />
            </View>
          )}
        </ScrollView>
      ) : null}
      {jobCompletedFetching ? (
        <FlashList
          estimatedItemSize={10}
          estimatedFirstItemOffset={10}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => `${item}+x`}
          renderItem={({ item, index }) => (
            <Skeleton
              key={`${item}+${index}`}
              className="dark:bg-white rounded-lg overflow-hidden min-w-96 min-h-48 flex-col my-2 shadow-lg border-transparent pt-4 ps-4 pe-4 pb-4 shadow-gray-400"
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default memo(Jobs);

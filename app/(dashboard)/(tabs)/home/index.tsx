import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useFocusEffect, Tabs } from 'expo-router';
import { Space } from 'lucide-react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ChooseUserLogin from '@untr/apps-coip/components/ChooseUserLogin/ChooseUserLogin';
import FilterBottomSheet from '@untr/apps-coip/components/FilterBottomSheet';
import StatusAlertDialog from '@untr/apps-coip/components/StatusAlertDialog';
import SyncButton from '@untr/apps-coip/components/SyncButton';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { useGetProgressJob } from '@untr/apps-coip/hooks/useGetProgressJob';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import { RadioGroup, Label } from '@untr/apps-coip/lib/components/primitives/dropdown-menu';
import { RadioGroupItem } from '@untr/apps-coip/lib/components/ui/radio-group';
import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import ReloadState from '@untr/apps-coip/states/reload.state';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { readSingleDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import ChangeUserBanner from './components/ChangeUserBanner';
import ContentListJob from './components/ContentListJob';
import CreateJobBtn from './components/CreateJobBtn';
import ListStatusJob from './components/ListStatusJob';
import Text from '@untr/apps-coip/components/Text';
import DatePickerBtn from '@untr/apps-coip/components/DatePickerButton';
const Home = () => {
  const { syncAgain } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const changeLoading = LoadingState((state) => state.changeLoading);
  const reload = ReloadState((state) => state.reloadFunc);
  const updateReload = ReloadState((state) => state.changeReloadState);
  const [calendarLoad, setCalendarLoad] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('in-progress');
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDate, setMarkedDate] = useState({});
  const [minDate, setMindate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [sorting, setSorting] = useState('DSC');
  const [openWarning, setOpenWarning] = useState(false);
  const [completedData, setCompletedData] = useState(false);
  const { data: userData, isFetching: loadingUser } = useGetUserLocal();

  const {
    data: jobProgressData,
    refetch: jobProgressRefetch,
    fetchNextPage: jobProgressFetchNextPage,
    hasNextPage: jobProgressHasNextPage,
    isFetching: jobProgressFetching,
    isFetchingNextPage: jobProgressIsFetchingNextPage,
  } = useGetProgressJob(
    sorting,
    minDate,
    maxDate,
    completedData,
    userData?.customerCode,
    userData?.isInternal
  );

  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);
  const [openChangeUser, setOpenChangeUser] = useState(false);

  const category: {
    id: string;
    title: string;
  }[] = [
    {
      id: 'in-progress',
      title: 'In Progress',
    },
    {
      id: 'job-completed',
      title: 'Job Completed',
    },
  ];

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const filterDateFunc = async () => {
    setCompletedData(!(selectedCategory === 'in-progress'));
    queryClient.resetQueries({
      queryKey: [
        'jobListProgress',
        sorting,
        minDate,
        maxDate,
        !(selectedCategory === 'in-progress'),
      ],
      exact: true,
    });
    jobProgressRefetch();
  };

  const dataMasterSyncFirst = async () => {
    const sync = !!syncAgain;
    const firstInstall = await readSingleDatafromDB(schemaDatabase.FirstInstall);
    if (firstInstall.isFirst || sync) {
      changeLoading(false);
      setShowDownload(true);
    }
  };

  useEffect(() => {
    dataMasterSyncFirst();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (reload) {
        changeLoading(false);
        updateReload(false);
      }
      return () => {
        queryClient.resetQueries({
          queryKey: ['jobListProgress'],
          exact: true,
        });
      };
    }, [reload])
  );

  return (
    <View className="relative pb-0 mb-0 flex-1" style={globalStyles().topSafeArea}>
      <ScrollView
        stickyHeaderIndices={[5]}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && jobProgressHasNextPage) {
            jobProgressFetchNextPage();
          }
        }}
        scrollEventThrottle={400}
        style={{
          backgroundColor: ColorsApp.white,
        }}
      >
        {userData?.isInternal && <ChangeUserBanner setOpenUser={setOpenChangeUser} />}

        <View className="mx-5 my-2">
          <View className="max-w-full justify-between align-middle items-center flex-row">
            <Text size={CustomDimension.sizeInSp(20)} style={{ fontFamily: FontsUtils.bold }}>
              Outstanding Job
            </Text>
            <SyncButton />
          </View>

          <Space height={5} />

          <Text
            size={CustomDimension.sizeInSp(12)}
            style={{
              fontFamily: FontsUtils.regular,
            }}
          >
            Check your work detail for today
          </Text>
          <Space height={10} />
          <ListStatusJob />
          <View style={styles.lineStyle} />
          <View style={styles.categoryViewStyle}>
            <Text size={CustomDimension.sizeInSp(18)} style={{ flex: 3 }} type="bold">
              Category
            </Text>
            <View className="flex-1 align-middle items-center justify-end gap-4 flex-row">
              <DatePickerBtn
                loading={calendarLoad}
                setSelectedDate={setSelectedDate}
                setLoading={setCalendarLoad}
                setMarkedDate={setMarkedDate}
                usingReset={true}
                selectDate={selectedDate}
                setMaxdate={setMaxDate}
                setMinDate={setMindate}
                callbackApply={filterDateFunc}
                minDate={minDate}
                maxDate={maxDate}
                markedDates={markedDate}
              />
              <Space width={CustomDimension.scaledHorizontal(10)} />
              <FilterBottomSheet isFilter={false} title="Sort Jobcard">
                <View className="w-full h-fit ps-5 pe-5 pb-10">
                  <RadioGroup value={sorting} onValueChange={setSorting} className="gap-3">
                    <View className={'flex-row gap-2 items-center h-9 mb-1'}>
                      <RadioGroupItem
                        aria-labelledby={`label-for-ASC`}
                        value={'ASC'}
                        style={{
                          width: 18,
                          borderColor:
                            sorting === 'ASC'
                              ? ColorsApp.primaryVariant
                              : ColorsApp.secondaryVariant,
                          height: 18,
                        }}
                      />
                      <Label
                        nativeID={`label-for-ASC`}
                        onPress={() => {
                          setSorting('ASC');
                          queryClient.resetQueries({
                            queryKey: ['jobListProgress', 'ASC', '', '', completedData],
                            exact: true,
                          });
                          jobProgressRefetch();
                        }}
                        style={{
                          fontSize: CustomDimension.sizeInSp(14),
                          fontFamily: sorting === 'ASC' ? FontsUtils.bold : FontsUtils.regular,
                        }}
                      >
                        Ascending
                      </Label>
                    </View>
                    <View className={'flex-row gap-2 items-center h-9'}>
                      <RadioGroupItem
                        aria-labelledby={`label-for-DSC`}
                        value={'DSC'}
                        style={{
                          width: 18,
                          borderColor:
                            sorting === 'DSC'
                              ? ColorsApp.primaryVariant
                              : ColorsApp.secondaryVariant,
                          height: 18,
                        }}
                      />
                      <Label
                        nativeID={`label-for-DSC`}
                        style={{
                          fontSize: CustomDimension.sizeInSp(14),
                          fontFamily: sorting === 'DSC' ? FontsUtils.bold : FontsUtils.regular,
                        }}
                        onPress={() => {
                          setSorting('DSC');
                          queryClient.resetQueries({
                            queryKey: ['jobListProgress', 'DSC', '', '', completedData],
                            exact: true,
                          });
                          jobProgressRefetch();
                        }}
                      >
                        Descending
                      </Label>
                    </View>
                  </RadioGroup>
                  <Space height={30} />
                </View>
              </FilterBottomSheet>
            </View>
          </View>
          <Tabs
            data={category}
            selected={selectedCategory}
            setSelected={(value) => {
              setCompletedData(!(value === 'in-progress'));

              queryClient.resetQueries({
                queryKey: ['jobListProgress', 'ASC', '', '', completedData],
                exact: true,
              });
              jobProgressRefetch();
              setSelectedCategory(value);
            }}
            withSticky
          />
        </View>
        <ContentListJob
          jobProgressFetching={jobProgressFetching}
          jobRefetch={jobProgressRefetch}
          reload={reload}
          jobProgressData={jobProgressData}
          jobProgressIsFetchingNextPage={jobProgressIsFetchingNextPage}
          category={selectedCategory}
        />
      </ScrollView>
      <CreateJobBtn setOpenWarning={setOpenWarning} />
      <StatusAlertDialog
        isError={true}
        title={"Can't Create Jobs!"}
        desc={'Cannot create Jobs cause Checksheet master not ready! Please try to re-sync'}
        titleBtn={'Back'}
        callbackCloseAlert={(_) => {
          setOpenWarning(false);
          changeLoading(false);
        }}
        isOpen={openWarning}
      />
      <ChooseUserLogin isOpen={openChangeUser} setIsOpen={setOpenChangeUser} isLogin={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryViewStyle: {
    marginVertical: CustomDimension.scaledVertical(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineStyle: {
    backgroundColor: ColorsApp.white,
    marginHorizontal: CustomDimension.scaledHorizontal(-25),
    paddingHorizontal: CustomDimension.scaledHorizontal(25),
  },
});
export default Home;

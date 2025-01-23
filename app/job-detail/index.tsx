import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BackHandler, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import AlertDialogCustom from '@untr/apps-coip/components/AlertDialogCustom';
import CustomHeaderApp from '@untr/apps-coip/components/CustomHeaderApp';
import LoadingCustom from '@untr/apps-coip/components/LoadingCustom';
import TabsJobDetail from '@untr/apps-coip/components/TabsJobDetail';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import ReloadState from '@untr/apps-coip/states/reload.state';
import {
  checksheetFormType,
  inputChecksheetType,
  jobIdentityType,
} from '@untr/apps-coip/types/inputCheckSheetType.type';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import Space from '@untr/apps-coip/components/Space';
import RenderRoute from './components/RenderRoute';
import StatusAlertDialog from '@untr/apps-coip/components/StatusAlertDialog';
import NewSubmitRefreshState from '@untr/apps-coip/states/newSubmitRefresh';
import { useGetFormDetail } from '@untr/apps-coip/hooks/useGetFormDetail';
import BtnSubmitForm from './components/BtnSubmitForm';
import BtnSaveForm from './components/BtnSaveForm';

const JobDetail = () => {
  const { assignId, fromCreateJob, isCompleted } = useLocalSearchParams();
  const { data, isSuccess, refetch, isPending } = useGetFormDetail({
    assignmentId: assignId,
  });
  const methodsForm = useForm<inputChecksheetType>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });
  const [index, setIndex] = useState(0);
  const keyTabIndex = 0;
  const layout = useWindowDimensions();
  const reload = ReloadState((state) => state.reloadFunc);
  const updateReload = ReloadState((state) => state.changeReloadState);
  const changeRefreshJob = NewSubmitRefreshState((state) => state.changeRefreshState);
  const changeLoading = LoadingState((state) => state.changeLoading);
  const loadingScreen = LoadingState((state) => state.isLoading);
  const [routes, setRoutes] = useState([{ key: 'job_identity', title: 'Job Identity' }]);
  const [loadingValidation, setLoadingValidation] = useState(false);
  const [saveProceess, setSaveProcess] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isSuccessStatus, setIsSuccessStatus] = useState(false);
  const [isErrorStatus, setIsErrorStatus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [exitScreen, setExitScreen] = useState(false);

  const closeAlertSuccess = async (value: boolean) => {
    if (isSubmit) {
      changeRefreshJob(true);
      updateReload(true);
      changeLoading(true);
      router.replace({
        pathname: '(dashboard)/home',
        params: {
          syncAgain: 1,
        },
      });
    } else {
      refetch();
      setIsSuccessStatus(value);
      setIsSubmit(value);
    }
  };

  const closeAlertFail = async (value: boolean) => {
    setIsSubmit(false);
    setIsErrorStatus(value);
  };

  const processForm = () => {
    if (!data || !isSuccess) {
      changeLoading(true);
      return;
    }

    // Extract required properties from data
    const formJob: checksheetFormType = data?.parsingFormJob;
    const jobIdentityForm: jobIdentityType = data?.parsingJobIdentity;
    const customerData = JSON.parse(data.customer);

    // Function to generate routeKey based on title
    const generateRouteKey = (title: string) => title.toLowerCase().replace(/ /g, '_');

    // Initialize routes and default values
    let tempRoutes = [
      {
        key: 'job_identity',
        title: 'Job Identity',
        keyRoute: generateRouteKey('Job Identity'),
      },
    ];

    let defaultValueForm = Object.keys(formJob).reduce(
      (acc, key) => {
        const title = formJob[key]?.title;
        tempRoutes.push({
          key,
          title,
          keyRoute: generateRouteKey(title),
        });
        acc[key] = formJob[key];
        return acc;
      },
      {} as Record<string, any>
    );

    // Merge job identity into the default values
    defaultValueForm = { ...defaultValueForm, job_identity: jobIdentityForm };

    // Set routes, customer data, and reset the form
    setRoutes(tempRoutes);
    setCustomerData(customerData);
    methodsForm.reset(defaultValueForm);

    // Stop loading after the form is processed
    changeLoading(false);
  };

  useEffect(() => {
    // If data is available and reload flag is false, process the form
    if (data && !reload) {
      processForm();
      return; // Exit early to avoid unnecessary execution of the next condition
    }

    // If reload is true, refetch and reset reload state
    if (reload) {
      refetch();
      updateReload(false);
    }
  }, [data, reload]);

  useFocusEffect(
    useCallback(() => {
      const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
        if (Number(isCompleted) === 1) {
          router.back();
        } else {
          setExitScreen(true);
        }
        return true;
      });
      return () => {
        subscribe.remove();
      };
    }, [])
  );

  return (
    <FormProvider {...methodsForm}>
      <View style={globalStyles().topSafeArea} className="flex-1 flex-col relative">
        <CustomHeaderApp
          title={isPending ? 'Loading ...' : data?.title}
          isCenter={false}
          useSync={true}
          callback={() => {
            if (Number(isCompleted) === 1) {
              router.back();
            } else {
              setExitScreen(true);
            }
          }}
        />

        <Space height={30} />
        {loadingScreen ? (
          <LoadingCustom heightBg={CustomDimension.GET_HEIGHT()} showLoading={loadingScreen} />
        ) : (
          <View className="flex-1">
            <TabView
              key={keyTabIndex}
              renderScene={({ route }: { route: any }) => (
                <RenderRoute section={route.key} data={data} customer={customerData} />
              )}
              swipeEnabled={false}
              renderTabBar={(props) => <TabsJobDetail props={props} methodForm={methodsForm} />}
              lazy={true}
              onIndexChange={setIndex}
              navigationState={{ index, routes }}
              initialLayout={{ width: layout.width }}
            />
            {data !== undefined && data.status !== 2 && (
              <View className="flex-row justify-between" style={styles.btnGripStyle}>
                <BtnSubmitForm
                  dataJob={data}
                  isSubmit={isSubmit}
                  setIsSubmit={setIsSubmit}
                  setLoadingValidation={setLoadingValidation}
                  loadingValidation={loadingValidation}
                  setIsErrorStatus={setIsErrorStatus}
                  setIsSuccessStatus={setIsSuccessStatus}
                  assignId={assignId as string}
                  isSync={data.isSync}
                  changeRefreshJob={changeRefreshJob}
                  setSaveProcess={setSaveProcess}
                  index={index}
                  setLoadingSubmit={setLoadingSubmit}
                />
                <BtnSaveForm
                  setSaveProcess={setSaveProcess}
                  setIsSubmit={setIsSubmit}
                  assignId={assignId as string}
                  isSync={data.isSync}
                  saveProcess={saveProceess}
                  setIsErrorStatus={setIsErrorStatus}
                  setIsSuccessStatus={setIsSuccessStatus}
                />
              </View>
            )}
          </View>
        )}
        <Space height={35} />
      </View>
      <AlertDialogCustom
        title="Are you sure to leave this screen?"
        description="Before you leave, make sure to save your work to keep your job updated!"
        usingAgree={true}
        usingCancel={true}
        titleAgree="Continue"
        titleCancel="Back"
        colorAgree={ColorsApp.gray300}
        colorDisAgree={ColorsApp.primary}
        callbackAgree={async () => {
          updateReload(true);
          changeLoading(true);
          if (Number(fromCreateJob) === 1) {
            router.replace('/home');
          } else {
            router.back();
          }
        }}
        callbackDisagree={() => {
          setExitScreen(false);
        }}
        openAlert={exitScreen}
      />

      <LoadingCustom
        title="Saving..."
        heightBg={CustomDimension.GET_HEIGHT()}
        showLoading={saveProceess && !isSubmit}
      />
      <LoadingCustom
        title={
          loadingValidation && loadingSubmit
            ? 'Submiting ...'
            : saveProceess && loadingValidation
              ? 'Saving ...'
              : 'Validating...'
        }
        heightBg={CustomDimension.GET_HEIGHT()}
        showLoading={loadingValidation}
      />
      <StatusAlertDialog
        isError={false}
        title={isSubmit ? 'Save and Submit Successfully' : 'Save Form is Success'}
        desc={
          isSubmit
            ? 'Your Job is Successfully Saved and submitted!'
            : 'Your Job is Successfully Saved!'
        }
        titleBtn={'OK'}
        callbackCloseAlert={closeAlertSuccess}
        isOpen={isSuccessStatus}
      />
      <StatusAlertDialog
        isError={true}
        title={isSubmit ? 'Save and Submit is Fail' : 'Save Form is Fail'}
        desc={
          isSubmit
            ? 'Your Job is Fail Saved and not submitted!, please check your connection and ensure form is completed fullfilled!'
            : 'Your Job is Fail Saved!'
        }
        titleBtn={'OK'}
        callbackCloseAlert={closeAlertFail}
        isOpen={isErrorStatus}
      />
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  btnGripStyle: {
    height: 48,
    paddingHorizontal: CustomDimension.scaledHorizontal(20),
    paddingTop: CustomDimension.scaledVertical(20),
    gap: 20,
  },
});

export default JobDetail;

import moment from 'moment';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import CustomHeaderApp from '@untr/apps-coip/components/CustomHeaderApp';
import Space from '@untr/apps-coip/components/Space';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { Separator } from '@untr/apps-coip/lib/components/ui/separator';
import EvidenceComponents from './EvidenceComponents';
import { reportJobType } from '@untr/apps-coip/types/reportJob.types';
import ScreenEmpty from '@untr/apps-coip/components/ScreenEmpty';
import { PositionLatLng } from '@untr/apps-coip/types/latlng.types';
import MapsWebview from '@untr/apps-coip/components/MapsWebview.config';

type ScreenReportProp = {
  reportData: reportJobType;
  isLoading: boolean;
};

const ScreenReport = ({ reportData, isLoading }: ScreenReportProp) => {
  const changeLoading = LoadingState((state) => state.changeLoading);
  const [jobCompletedReport, setJobCompletedReport] = useState<any>(null);
  const [jobPica, setJobPica] = useState<any>(null);
  const [markerPoin, setMarkerPoin] = useState<PositionLatLng>({ latitude: 0, longitude: 0 });

  const statusColor = (score?: number) => {
    if (reportData !== undefined && reportData !== null) {
      switch (score) {
        case 1:
          return {
            color: '#E35050',
            message: 'New Assignment',
          };
        case 2:
          return {
            color: '#FFB92E',
            message: 'In Progress',
          };
        case 3:
          return {
            color: '#FFD500',
            message: 'Completed',
          };
        case 4:
          return {
            color: '#94E590',
            message: 'Completed',
          };
        case 5:
          return {
            color: '#59AD24',
            message: 'Completed',
          };
        default:
          return {
            color: '#59AD24',
            message: 'New Assignment',
          };
      }
    }
  };

  const setupData = async () => {
    if (reportData !== undefined) {
      let jobListParam = [];
      let picaListParam = [];
      let picaListImage = [];
      await setMapsShow();
      for (let itemParam of reportData?.parameters) {
        for (let itemAsses of itemParam.assessmentAreas) {
          const checkSheetValue = itemAsses?.checksheetValues
            .filter((itemCheck) => itemCheck.score >= 4)
            .sort((a, b) => Number(a.sequence) - Number(b.sequence))
            .map((itemFixCheck) => {
              const { klausul, score, description } = itemFixCheck;
              return {
                klausul: klausul,
                description: description,
                imageString: null,
                score: score,
              };
            });
          if (checkSheetValue.length > 0) {
            const paramValue = {
              assessmentArea: itemAsses?.assessmentArea,
              parameter: itemParam.parameter,
              descriptionJob: checkSheetValue,
              statusColor: statusColor(Number(reportData?.coipReports?.customerLevel)),
              isPica: false,
              hasImage: false,
            };
            jobListParam.push(paramValue);
          }
        }
      }
      const picaList = [];
      for (let itemParent of reportData?.parameters) {
        for (let itemChild of itemParent.assessmentAreas) {
          const checkSheetValue = itemChild?.checksheetValues
            .filter((itemCheck) => itemCheck.score <= 3)
            .sort((a, b) => Number(a.sequence) - Number(b.sequence))
            .map((itemFixCheck) => {
              const { klausul, score, image, description } = itemFixCheck;
              return {
                klausul: klausul,
                description: description,
                imageString: image,
                score: score,
              };
            });
          picaList.push(...checkSheetValue);
        }
      }
      if (picaList.length > 0) {
        const paramValue = {
          assessmentArea: 'PICA',
          parameter: 'PICA',
          descriptionJob: picaList,
          statusColor: statusColor(Number(reportData?.coipReports?.customerLevel)),
          isPica: true,
          hasImage: null,
        };
        const imageList = {
          assessmentArea: 'PICA',
          parameter: 'PICA',
          descriptionJob: picaList,
          statusColor: statusColor(Number(reportData?.coipReports?.customerLevel)),
          isPica: false,
          hasImage: true,
        };
        picaListParam.push(paramValue);
        picaListImage.push(imageList);
      }

      setJobCompletedReport(jobListParam);
      setJobPica({
        picaItemList: picaListParam,
        picaImage: picaListImage,
      });
    }
  };

  const setMapsShow = async () => {
    if (reportData !== null) {
      const latitude = reportData?.coipReports.dataCustomer.spesificLocation.latitude;
      const longitude = reportData?.coipReports.dataCustomer.spesificLocation.longitude;
      setMarkerPoin({ latitude: Number(latitude), longitude: Number(longitude) });
      changeLoading(false);
    }
  };

  useEffect(() => {
    setupData();
  }, [reportData]);

  if (reportData !== null && reportData !== undefined) {
    return (
      <View className="flex-1 flex-col" style={globalStyles().topSafeArea}>
        <CustomHeaderApp title="Report Job" useSync={false} />
        {isLoading ? (
          <View
            className="flex-1 justify-center items-center"
            style={{
              backgroundColor: ColorsApp.background,
            }}
          >
            <ActivityIndicator size="large" color={ColorsApp.primary} />
          </View>
        ) : null}
        {!isLoading && reportData !== null ? (
          <>
            <View className="flex-col pe-5 ps-5">
              <View className="flex-row justify-between">
                <View
                  className="flex-col"
                  style={{
                    width: CustomDimension.WIDTH_PERCENTAGE(60),
                  }}
                >
                  <Text
                    color="#3E3E3E"
                    size={CustomDimension.sizeInSp(18)}
                    numberOfLines={2}
                    style={{
                      fontFamily: FontsUtils.bold,
                    }}
                  >
                    Report {reportData?.coipReports.dataCustomer.sector || ''}
                  </Text>
                  <Space height={8} />
                  <Text
                    color="#3E3E3E"
                    size={CustomDimension.sizeInSp(12)}
                    numberOfLines={2}
                    style={{
                      fontFamily: FontsUtils.medium,
                    }}
                  >
                    {reportData?.coipReports?.unitApplication || ''}
                  </Text>
                </View>
                <View
                  className="flex-col min-w-20  rounded-md shadow-lg justify-start"
                  style={{
                    height: 80,
                    backgroundColor: statusColor(reportData?.coipReports?.customerLevel).color,
                  }}
                >
                  <View
                    className="rounded-tl-md rounded-tr-md
                                            bg-white justify-center items-center pt-1 pb-1"
                  >
                    <Text
                      color="#3E3E3E"
                      size={CustomDimension.sizeInSp(10)}
                      style={{
                        fontFamily: FontsUtils.bold,
                      }}
                    >
                      Level
                    </Text>
                  </View>
                  <View className="justify-center items-center h-fit">
                    <Text
                      color="#3E3E3E"
                      size={CustomDimension.sizeInSp(28)}
                      style={{
                        fontFamily: FontsUtils.bold,
                      }}
                    >
                      {reportData?.coipReports.customerLevel || 0}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Space height={10} />
            <View
              className="flex-1"
              style={{
                backgroundColor: ColorsApp.background,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <Space height={10} />
                <View
                  className="w-fit h-fit bg-white mt-3 me-5 ms-5
                                rounded-md shadow-xl"
                >
                  <View
                    className="h-fit w-fit bg-transparent pt-7 pe-7 pb-7 ps-7
                                        rounded-tr-md rounded-br-md flex-col"
                    style={{
                      paddingEnd: 28,
                    }}
                  >
                    <Text
                      size={CustomDimension.sizeInSp(15)}
                      color="#3C3B3B"
                      style={{
                        fontFamily: FontsUtils.bold,
                      }}
                    >
                      Data Customer
                    </Text>
                    <Space height={14} />
                    <View
                      className="flex-col mt-3 mb-3"
                      style={{
                        width: CustomDimension.WIDTH_PERCENTAGE(50),
                      }}
                    >
                      <Text size={CustomDimension.sizeInSp(11)} color="#3E3E3E" style={{ gap: 8 }}>
                        Customer Name
                      </Text>
                      <Text
                        size={CustomDimension.sizeInSp(12)}
                        numberOfLines={2}
                        color="#3E3E3E"
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                      >
                        {reportData?.coipReports.dataCustomer.customerName || ''}
                      </Text>
                    </View>
                    <View
                      className="flex-col "
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text size={CustomDimension.sizeInSp(11)} color="#3E3E3E" style={{ gap: 8 }}>
                        Sector
                      </Text>
                      <Text
                        size={CustomDimension.sizeInSp(12)}
                        color="#3E3E3E"
                        numberOfLines={2}
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                      >
                        {reportData?.coipReports.dataCustomer.sector || ''}
                      </Text>
                    </View>

                    <View
                      className="flex-col mt-3 mb-3"
                      style={{
                        width: CustomDimension.WIDTH_PERCENTAGE(50),
                      }}
                    >
                      <Text size={CustomDimension.sizeInSp(11)} color="#3E3E3E" style={{ gap: 8 }}>
                        Site
                      </Text>
                      <Text
                        size={CustomDimension.sizeInSp(12)}
                        numberOfLines={2}
                        color="#3E3E3E"
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                      >
                        {reportData?.coipReports.dataCustomer.location || ''}
                      </Text>
                    </View>

                    <View
                      className="flex-col mb-3"
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        size={CustomDimension.sizeInSp(11)}
                        color="#3E3E3E"
                        style={{ gap: 8, marginBottom: 12 }}
                      >
                        Location
                      </Text>
                      <View className="w-full h-52 rounded-md">
                        <MapsWebview position={markerPoin} />
                      </View>
                    </View>
                  </View>

                  <View
                    className="max-h-full rounded-2xl bg-yellow-400 absolute left-0 top-0"
                    style={{
                      width: CustomDimension.WIDTH_PERCENTAGE(2),
                      backgroundColor: statusColor(reportData?.coipReports?.customerLevel).color,
                      height: '100%',
                    }}
                  />
                </View>
                <Space height={10} />
                <View className="w-fit h-fit bg-white mt-3 me-5 ms-5 rounded-md shadow-xl">
                  <View
                    className="h-fit w-fit bg-transparent pt-7 pe-7 pb-7 ps-7
                                        rounded-tr-md rounded-br-md flex-col"
                    style={{
                      paddingEnd: 28,
                    }}
                  >
                    <Text
                      size={CustomDimension.sizeInSp(15)}
                      color="#3C3B3B"
                      style={{
                        fontFamily: FontsUtils.bold,
                      }}
                    >
                      Data Observer
                    </Text>
                    <Space height={14} />
                    <View
                      className="flex-col mb-4"
                      style={{
                        width: CustomDimension.WIDTH_PERCENTAGE(50),
                      }}
                    >
                      <Text size={CustomDimension.sizeInSp(11)} color="#3E3E3E" style={{ gap: 8 }}>
                        COIP ID
                      </Text>
                      <Text
                        size={CustomDimension.sizeInSp(12)}
                        color="#3E3E3E"
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                      >
                        {reportData?.coipNumber}
                      </Text>
                    </View>
                    <View
                      className="flex-row justify-start items-center "
                      style={{
                        marginBottom: 14,
                      }}
                    >
                      <View
                        className="flex-col "
                        style={{
                          width: CustomDimension.GET_WIDTH(),
                        }}
                      >
                        <Text
                          size={CustomDimension.sizeInSp(11)}
                          color="#3E3E3E"
                          style={{ gap: 8 }}
                        >
                          Observer Name
                        </Text>
                        <Text
                          size={CustomDimension.sizeInSp(12)}
                          color="#3E3E3E"
                          style={{
                            fontFamily: FontsUtils.bold,
                          }}
                        >
                          {reportData?.coipReports.dataJobObserver.observerName || 'Unknown'}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-col ">
                      <Text size={CustomDimension.sizeInSp(11)} color="#3E3E3E" style={{ gap: 8 }}>
                        Execution Date
                      </Text>
                      <Text
                        size={CustomDimension.sizeInSp(12)}
                        color="#3E3E3E"
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                      >
                        {moment(
                          reportData?.coipReports?.dataJobObserver?.planExecutionDate || new Date()
                        ).format('DD-MM-yyyy')}
                      </Text>
                    </View>
                  </View>

                  <View
                    className="max-h-full rounded-2xl bg-yellow-400 absolute left-0 top-0"
                    style={{
                      width: CustomDimension.WIDTH_PERCENTAGE(2),
                      backgroundColor: statusColor(reportData?.coipReports?.customerLevel).color,

                      height: '100%',
                    }}
                  />
                </View>
                <Space height={10} />
                <View
                  className="items-center justify-center h-6 w-full ps-5
                                 pe-5 mt-2 mb-2"
                >
                  <Separator
                    decorative={true}
                    style={{
                      backgroundColor: '#BFBFBF',
                    }}
                  />
                </View>
                {jobCompletedReport !== null && jobCompletedReport.length > 0 ? (
                  <View className="w-full h-fit  mb-2  ps-4 pe-4">
                    {jobCompletedReport.map((item, index) => (
                      <EvidenceComponents key={`${index}+${item.klausul}+report`} itemData={item} />
                    ))}
                  </View>
                ) : null}
                {jobPica !== null && jobPica.picaItemList.length > 0 ? (
                  <View className="w-full h-fit   mb-2  ps-4 pe-4">
                    {jobPica.picaItemList.map((item, index) => (
                      <EvidenceComponents itemData={item} key={`${index}+${item.klausul}+PICA`} />
                    ))}
                  </View>
                ) : null}
                {jobPica !== null && jobPica.picaImage.length > 0 ? (
                  <View className="w-full h-fit  mb-2  ps-4 pe-4">
                    {jobPica.picaImage.map((item, index) => (
                      <EvidenceComponents
                        itemData={item}
                        key={`${index}+${item.klausul}+PICA_Image`}
                      />
                    ))}
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </>
        ) : (
          <ScreenEmpty title={'Data is Not Found'} description={'Data Not found'} />
        )}
      </View>
    );
  } else {
    return <></>;
  }
};

export default ScreenReport;

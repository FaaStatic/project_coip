import { TouchableOpacity, View } from 'react-native';
import { Card } from '@untr/apps-coip/lib/components/ui/card';
import moment from 'moment';
import Space from './Space';
import Text from './Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';

type cardTitleProp = {
  dataTitle: createJobItemType;
};

const CardTitle = ({ dataTitle }: cardTitleProp) => {
  const status = () => {
    switch (dataTitle.status) {
      case 0:
        return {
          color: ColorsApp.errorColor,
          message: 'New Assignment',
        };
      case 1:
        return {
          color: ColorsApp.primary,
          message: 'In Progress',
        };
      case 2:
        return {
          color: ColorsApp.successColor,
          message: 'Completed',
        };
      default:
        return {
          color: ColorsApp.errorColor,
          message: 'New Assignment',
        };
    }
  };

  return (
    <View className="flex-col max-w-full h-fit m-0">
      <View className="flex-row justify-between max-w-full h-fit">
        <Text
          numberOfLines={3}
          style={{
            fontSize: CustomDimension.sizeInSp(16),
            color: '#003780',
            fontFamily: FontsUtils.bold,
            flex: 2,
          }}
        >
          {dataTitle?.title || 'Coip Mining'}
        </Text>
        <View
          className="h-7 min-w-20  px-3 justify-center"
          style={{
            borderRadius: 100,
            backgroundColor: status()['color'],
          }}
        >
          <Text
            style={{
              fontSize: CustomDimension.sizeInSp(12),
              fontFamily: FontsUtils.medium,
              color: ColorsApp.white,
            }}
          >
            {status()['message']}
          </Text>
        </View>
      </View>
      <View
        className="flex-row justify-between mt-2 max-w-full h-fit"
        style={{
          marginBottom: 6,
        }}
      >
        <View className="flex-row align-middle items-center justify-start">
          <Text
            style={{
              color: ColorsApp.textColorSecondary,
              fontFamily: FontsUtils.regular,
              fontSize: CustomDimension.sizeInSp(12),
            }}
          >
            ID :
          </Text>
          <Text
            style={{
              color: ColorsApp.textColorPrimary,
              fontFamily: FontsUtils.bold,
              fontSize: CustomDimension.sizeInSp(12),
            }}
          >
            {`${dataTitle?.jobNumber}` || '-'}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FontsUtils.medium,
            fontSize: CustomDimension.sizeInSp(12),
          }}
        >
          {dataTitle?.planExecutionDate
            ? moment(dataTitle.planExecutionDate).format('dddd, DD MMM yyyy')
            : moment('2014-02-27T10:00:00').format('dddd, DD MMM yyyy')}
        </Text>
      </View>
    </View>
  );
};

type cardContentProp = {
  dataContent: createJobItemType;
};

const CardContent = ({ dataContent }: cardContentProp) => {
  const [dataList, setDataList] = useState([]);
  const [customerData, setCustomerData] = useState(null);

  const processCustomerAndList = () => {
    if (dataContent.equipmentIdentities !== undefined && dataContent.equipmentIdentities !== '') {
      const dataResult = JSON.parse(dataContent.equipmentIdentities);
      setDataList(dataResult);
    }

    if (dataContent.customer !== undefined) {
      const dataCustomer = JSON.parse(dataContent.customer);
      setCustomerData(dataCustomer);
    }
  };

  const status = () => {
    switch (dataContent.level) {
      case 1:
        return ColorsApp.errorColor;
      case 2:
        return ColorsApp.secondary;
      case 3:
        return ColorsApp.primary;
      case 4:
        return '#94E590';
      case 5:
        return ColorsApp.successColor;
      default:
        return '#F0F0F0';
    }
  };

  useEffect(() => {
    processCustomerAndList();
  }, []);

  return (
    <View
      className="flex-1 flex-col justify-start"
      style={{
        marginTop: 12,
      }}
    >
      <View className="flex-row justify-between max-w-full">
        <Text
          style={{
            color: ColorsApp.textColorSecondary,
            fontFamily: FontsUtils.bold,
            fontSize: CustomDimension.sizeInSp(10),
          }}
        >
          Unit Model
        </Text>
        <Text
          style={{
            color: ColorsApp.textColorSecondary,
            fontFamily: FontsUtils.bold,
            fontSize: CustomDimension.sizeInSp(10),
          }}
        >
          Level
        </Text>
      </View>
      <View className="flex-row justify-between w-full">
        <View
          className="flex-wrap flex-row "
          style={{
            width: CustomDimension.WIDTH_PERCENTAGE(50),
          }}
        >
          {dataContent.equipmentIdentities !== undefined ? (
            <>
              {dataList.length > 0 &&
                dataList?.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      fontFamily: FontsUtils.bold,
                      fontSize: CustomDimension.sizeInSp(12),
                    }}
                  >
                    {`${item?.equipment?.unitModel} ${index === dataList.length - 1 ? '' : ','} ` ||
                      '-'}
                  </Text>
                ))}
              {dataList.length === 0 ? (
                <Text
                  style={{
                    fontFamily: FontsUtils.bold,
                    fontSize: CustomDimension.sizeInSp(12),
                  }}
                >
                  -
                </Text>
              ) : null}
            </>
          ) : (
            <Text
              style={{
                fontFamily: FontsUtils.bold,
                fontSize: CustomDimension.sizeInSp(12),
              }}
            >
              -
            </Text>
          )}
        </View>

        <Card
          className="rounded-md w-5 h-5 border-transparent justify-center flex-col items-center self-center"
          style={{
            backgroundColor: status(),
            marginBottom: 17,
          }}
        >
          <Text
            style={{
              fontFamily: FontsUtils.bold,
              color: dataContent.level > 0 ? 'white' : 'black',
              fontSize: CustomDimension.sizeInSp(10),
            }}
          >
            {dataContent?.level || '-'}
          </Text>
        </Card>
      </View>
      <View
        className="max-w-full rounded-lg "
        style={{
          height: 0.5,
          backgroundColor: '#9A9A9A40',
        }}
      />
      {customerData !== null ? (
        <View className="flex-row justify-between items-center h-fit ps-2 pt-3 gap-2">
          <View className="flex-row justify-start items-center flex-1">
            <IconsApp.IconCompany width={20} height={20} color={ColorsApp.black} />
            <Space width={6} />
            <Text
              numberOfLines={2}
              style={{
                color: ColorsApp.textColorPrimaryVariant,
                fontFamily: FontsUtils.bold,
                fontSize: CustomDimension.sizeInSp(12),
              }}
            >
              {(customerData?.name as string) || '-'}
            </Text>
          </View>
          <Space width={20} />
          <View className="flex-row justify-start items-center flex-1">
            <IconsApp.IconUserFill width={20} height={20} color={'#0D1C2E'} />
            <Space width={6} />
            <Text
              numberOfLines={2}
              style={{
                color: ColorsApp.textColorPrimaryVariant,
                fontFamily: FontsUtils.bold,
                fontSize: CustomDimension.sizeInSp(12),
              }}
            >
              {dataContent.createdByName || '-'}
            </Text>
          </View>
        </View>
      ) : null}

      <Space height={8} />
    </View>
  );
};

interface JobCardParams {
  jobcard: createJobItemType;
  isCompleted?: boolean;
  isReport?: boolean;
}

const JobCard = ({ jobcard, isReport = false, isCompleted = false }: Readonly<JobCardParams>) => {
  const changeLoading = LoadingState((state) => state.changeLoading);

  const config = isReport
    ? {
        pathname: '/report-detail',
        params: { jobId: jobcard.id, typeCustomer: 'internal' },
      }
    : {
        pathname: '/job-detail',
        params: {
          assignId: jobcard.id as string,
          fromCreateJob: 0,
          isCompleted: isCompleted ? 1 : 0,
        },
      };

  return (
    <TouchableOpacity
      key={jobcard.id}
      onPress={() => {
        changeLoading(true);
        router.push(config);
      }}
      className="bg-white rounded-lg overflow-hidden min-w-96 min-h-48 flex-col my-2 shadow-lg border-transparent pt-4 ps-4 pe-4 pb-4 shadow-gray-400"
    >
      <CardTitle dataTitle={jobcard} />
      <CardContent dataContent={jobcard} />
    </TouchableOpacity>
  );
};

export default JobCard;

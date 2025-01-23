import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { X } from '@untr/apps-coip/lib/icons/X';
import CustomerListSelect from './CustomerListSelect';
import { useState, useEffect } from 'react';
import LoadingCustom from '@untr/apps-coip/components/LoadingCustom';
import ScreenEmpty from '@untr/apps-coip/components/ScreenEmpty';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import { useListCustomer } from '@untr/apps-coip/hooks/useListCustomer';
import useUpdateUserLocal from '@untr/apps-coip/hooks/useUpdateUserLocal';
import { addRemoveCustomerList } from '@untr/apps-coip/utils/customer.util';

import Text from '@untr/apps-coip/components/Text';

import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import { useQueryClient } from '@tanstack/react-query';
import ReloadState from '@untr/apps-coip/states/reload.state';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import {
  readAllDataWithFilter,
  updateData,
  deleteSpesificSchema,
} from '@untr/apps-coip/utils/operationStorageDb.util';
import { router } from 'expo-router';

type contentProp = {
  setIsOpen: (data: boolean) => void;
  isLogin: boolean;
  setDeleteUserFail: (data: boolean) => void;
};

const ContentChooseUser = ({ setIsOpen, isLogin, setDeleteUserFail }: contentProp) => {
  const queryClient = useQueryClient();
  const [change, setChange] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isSuccess, refetch, isPending } = useListCustomer(false, 1);
  const { data: localUser, refetch: refetchLocal, isLoading: loadingUser } = useGetUserLocal();
  const { mutateAsync: mutateProcess } = useUpdateUserLocal();
  const updateReload = ReloadState((state) => state.changeReloadState);
  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);

  useEffect(() => {
    if (localUser) {
      refetch();
    } else {
      refetchLocal();
    }
  }, [localUser]);

  const processRemove = async (idUser: string) => {
    setLoading(true); // Add loading state
    try {
      const previousActive = (
        await readAllDataWithFilter(schemaDatabase.CustomerList, 'isActive = true')
      ).at(0);
      if (previousActive.id === idUser) {
        setDeleteUserFail(true);
      } else {
        await addRemoveCustomerList(idUser, true).then(() => {
          refetch();
        });
      }
    } catch (error) {
      console.error('Error removing customer:', error);
    } finally {
      setLoading(false); // Remove loading after process
    }
  };

  const chooseUser = async (item: any) => {
    try {
      const previousActive = (
        await readAllDataWithFilter(schemaDatabase.CustomerList, 'isActive = true')
      ).at(0);
      if (previousActive) {
        await updateData(
          schemaDatabase.CustomerList,
          previousActive.id as string,
          { isActive: false },
          'id'
        );
      }

      const nameParts = item.title.split('-');
      const titlePart = nameParts[0];
      const title = titlePart.split(' ');
      const firstName = title[0];
      const lastName = title.slice(1).join(' ');

      const param = {
        id: localUser.id,
        data: {
          branchSupportArea: 'BLP',
          customerCode: item.userCode,
          firstName: firstName,
          lastName: lastName,
        },
      };

      await mutateProcess(param);
      if (isLogin) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        await updateData(
          schemaDatabase.CustomerList,
          item.id as string,
          { isActive: true },
          'id'
        ).then(() => {
          setLoading(false);
          router.replace({ pathname: '(dashboard)/home' });
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 50));
        await updateData(
          schemaDatabase.CustomerList,
          item.id as string,
          { isActive: true },
          'id'
        ).then(() => {
          queryClient.resetQueries({
            queryKey: ['getLocalCustomerActive'],
          });
          queryClient.resetQueries({
            queryKey: ['getLocalToken'],
          });
          queryClient.resetQueries({
            queryKey: ['getCustomerData'],
          });
          queryClient.resetQueries({
            queryKey: ['jobListProgress'],
          });
          queryClient.resetQueries({
            queryKey: ['jobStatus'],
          });
          queryClient.fetchQuery({
            queryKey: ['getLocalCustomerActive'],
          });
          queryClient.fetchQuery({
            queryKey: ['getCustomerData'],
          });
          queryClient.fetchQuery({
            queryKey: ['getLocalToken'],
          });
          queryClient.fetchQuery({
            queryKey: ['jobListProgress'],
          });
          queryClient.fetchQuery({
            queryKey: ['jobStatus'],
          });
          setShowDownload(true);
          updateReload(true);
          setIsOpen(false);
        });
      }
    } catch (error) {
      console.error('Error choosing user:', error);
      // Optionally show feedback to user about error
    } finally {
      setLoading(false);
    }
  };

  const deleteLoginData = async () => {
    await deleteSpesificSchema(schemaDatabase.Login);
  };
  return (
    <>
      <View className="w-full h-[48px] flex-row mb-[22px] items-center justify-center">
        <View>
          <X
            width={24}
            height={24}
            fontWeight={'900'}
            color={ColorsApp.gray300}
            onPress={async () => {
              if (isLogin) {
                await deleteLoginData();
              } else {
                queryClient.resetQueries({
                  queryKey: ['getCustomerData'],
                });
                queryClient.fetchQuery({
                  queryKey: ['getLocalCustomerActive'],
                });
              }
              setIsOpen(false);
            }}
          />
        </View>
        <View className="flex flex-1 justify-center items-center">
          <Text
            size={CustomDimension.sizeInSp(18)}
            style={{
              color: ColorsApp.black,
              fontWeight: '700',
              fontFamily: FontsUtils.bold,
            }}
          >
            {change ? 'Edit Customer List' : 'Customer List'}
          </Text>
        </View>
      </View>
      {change && <CustomerListSelect />}
      {localUser && !loadingUser && (
        <ScrollView className="flex flex-col min-h-[200px]">
          {isPending && <LoadingCustom showLoading={true} />}
          {isSuccess &&
            data?.length > 0 &&
            data?.map((item, index) => (
              <TouchableOpacity
                onPress={async () => {
                  setLoading(true);
                  if (change) {
                    await processRemove(item.id);
                  } else {
                    await chooseUser(item);
                  }
                }}
                key={index}
                className="flex-row w-full items-center justify-between h-[49px] border-[#9A9A9A40] border-b-[0.5px]"
              >
                <Text
                  style={{
                    fontFamily: FontsUtils.medium,
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                  color="black"
                >
                  {item.title}
                </Text>
                {change && (
                  <View>
                    <IconsApp.IconTrash width={18} height={18} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          {isSuccess && data?.length === 0 && (
            <View className="flex-1 flex-col items-center justify-center ">
              <ScreenEmpty
                title={'Customer Not found'}
                description={'Customer is empty please add some customer!'}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!localUser && loadingUser && (
        <View className="flex flex-col bg-white items-center justify-center ">
          <ActivityIndicator size={'small'} />
        </View>
      )}
      {loading && (
        <View className="absolute left-0 right-0 bottom-0 top-0 flex flex-col items-center justify-center bg-white opacity-40 ">
          <ActivityIndicator size={'small'} />
        </View>
      )}
      {isSuccess && data?.length === 5 && (
        <View className="w-full h-[36px] flex-row rounded-[8px] bg-[#FFF8D6] border-[1px] justify-around items-center border-[#FFD500]">
          <IconsApp.IconAlert width={18} height={18} />
          <Text
            size={10}
            color="#2B2B2B"
            style={{
              fontWeight: '600',
            }}
          >
            You have reached the limit of 5 customers.
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          setChange(!change);
        }}
        disabled={change ? false : data?.length === 5 ? true : false}
        className={`w-full h-[48px] rounded-[9px] items-center justify-center bg-[#FFD500]`}
      >
        <Text
          size={14}
          style={{
            fontFamily: FontsUtils.medium,
          }}
          type={'medium'}
          color="black"
        >
          {change ? 'Save' : 'Change'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ContentChooseUser;

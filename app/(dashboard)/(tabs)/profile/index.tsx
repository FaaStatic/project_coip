import {
  ActivityIndicator,
  Platform,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import Space from '@untr/apps-coip/components/Space';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { VersionApp } from '@untr/apps-coip/constants/versionApp.constants';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { useState } from 'react';
import AlertDialogCustom from '@untr/apps-coip/components/AlertDialogCustom';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import { useLogoutApp } from '@untr/apps-coip/hooks/useLogoutApp';
import { ImagesApp } from '@untr/apps-coip/themes/imagesApp.theme';

const Profile = () => {
  const queryClient = useQueryClient();
  const { isPending, data } = useGetUserLocal();
  const { mutate } = useLogoutApp();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <View style={[globalStyles().topSafeArea]} className="mx-5 flex-col flex-1 h-full">
      <View className="my-5">
        <Text size={34} type="bold" color={ColorsApp.primary}>
          Profile
        </Text>
      </View>
      {data?.photo !== null && data?.photo !== undefined && (
        <Image source={{ uri: data.photo as string }} style={styles.stylingAvatarProfile} />
      )}
      {data?.photo === null && (
        <Image source={ImagesApp.person} style={styles.stylingAvatarProfile} />
      )}
      <Space height={35} />
      <View style={styles.btnStylingProfile}>
        {data !== undefined ? (
          <Text size={20} type="bold" color="black">
            {(data?.firstname as string) || 'Loading ...'} {(data?.lastname as string) || ''}
          </Text>
        ) : null}
        {data === null ? (
          <Text size={20} type="bold">
            Loading ...
          </Text>
        ) : null}

        <Space height={10} />
        {data !== undefined ? (
          <Text size={16} color={ColorsApp.gray300}>
            {(data?.email as string) || 'Loading ...'}
          </Text>
        ) : null}
        {data === undefined ? (
          <Text size={16} color={ColorsApp.gray300}>
            Loading ...
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => {
          setOpenDialog(true);
        }}
        style={styles.btnStylingProfile}
      >
        <View style={styles.btnStylingIconProfile}>
          <IconsApp.IconExit height={24} width={31} />
          <Text size={17} type="medium">
            Logout
          </Text>
        </View>
      </TouchableOpacity>
      <View className="flex-1 justify-self-end items-center justify-end mb-16">
        <Text
          size={CustomDimension.sizeInSp(12)}
          style={{
            fontFamily: FontsUtils.bold,
          }}
        >
          Version : {Platform.OS === 'android' ? VersionApp() : '1.0.0'}
        </Text>
      </View>
      {isPending ? (
        <View className="flex-1 w-full h-full bg-white opacity-80 absolute top-0 right-0 left-0 bottom-0 justify-center items-center">
          <ActivityIndicator color={ColorsApp.primary} size={'large'} />
          <Text
            color={ColorsApp.primary}
            size={CustomDimension.sizeInSp(14)}
            style={{
              fontFamily: FontsUtils.bold,
            }}
          >
            Loading ...
          </Text>
        </View>
      ) : null}
      <AlertDialogCustom
        openAlert={openDialog}
        title={'Logout Confirmation'}
        description={'Are you Sure to logout from Coip Mobile?'}
        titleAgree="Yes"
        titleCancel="Cancel"
        usingAgree={true}
        colorDisAgree={ColorsApp.primary}
        colorAgree={ColorsApp.gray300}
        usingCancel={true}
        callbackAgree={() => {
          mutate(null, {
            onSuccess: async (_) => {
              try {
                queryClient.clear();
                router.replace({ pathname: 'login-connect' });
              } catch (error) {
                console.log(error);
              }
            },
          });
        }}
        callbackDisagree={() => {
          setOpenDialog(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnStylingProfile: {
    borderBottomWidth: 2,
    borderBottomColor: ColorsApp.background,
    paddingBottom: 25,
    marginBottom: 25,
  },
  btnStylingIconProfile: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  stylingAvatarProfile: { height: 142, width: 142, borderRadius: 142 / 7 },
});

export default Profile;

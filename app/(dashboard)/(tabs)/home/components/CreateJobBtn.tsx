import { router } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useGetStatusJob } from '@untr/apps-coip/hooks/useGetStatusJob';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';

type BtnJobCreateProp = {
  setOpenWarning: (value: boolean) => void;
};

const CreateJobBtn = ({ setOpenWarning }: BtnJobCreateProp) => {
  const changeLoading = LoadingState((state) => state.changeLoading);
  const { data: userData } = useGetUserLocal();
  const { data: dataStatusJob } = useGetStatusJob(userData?.customerCode, userData?.isInternal);
  return (
    <TouchableOpacity
      onPress={() => {
        changeLoading(true);
        if (dataStatusJob.isReadyCheckSheet) {
          router.push({ pathname: 'create-jobs' });
        } else {
          setOpenWarning(true);
        }
      }}
      className="shadow-md shadow-yellow-300"
      style={styles.btnAddJobStyle}
    >
      <IconsApp.IconPlus width={28} height={28} color={ColorsApp.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnAddJobStyle: {
    backgroundColor: ColorsApp.primary,
    padding: 15,
    position: 'absolute',
    bottom: 10,
    right: 15,
    borderRadius: 99,
  },
});

export default CreateJobBtn;

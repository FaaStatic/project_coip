import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';

type checkSheetIsFullProp = {
  score: number;
  image: string;
  recomendation: string;
  comment: string;
};

const CheckIsFullFilled = ({ score, image, recomendation, comment }: checkSheetIsFullProp) => {
  useEffect(() => {}, [score, image, recomendation, comment]);

  const getIconSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      return (
        <View className="h-fit w-fit justify-center items-center">
          <IconsApp.IconAlertSuccess
            width={14}
            height={14}
            color={ColorsApp.successColor}
            style={styles.iconAppStyle}
          />
        </View>
      );
    } else {
      return (
        <View className="h-fit w-fit justify-center items-center">
          <IconsApp.IconAlertError
            width={14}
            height={14}
            color={ColorsApp.errorColor}
            style={styles.iconAppStyle}
          />
        </View>
      );
    }
  };

  return getIconSuccess(
    (score > 0 && score >= 4 && image?.length > 0) ||
      (score > 0 &&
        score <= 3 &&
        image?.length > 0 &&
        recomendation?.length > 3 &&
        comment?.length > 3)
  );
};

const styles = StyleSheet.create({
  iconAppStyle: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});

export default memo(CheckIsFullFilled);

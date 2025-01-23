import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import Text from '@untr/apps-coip/components/Text';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { GetCurretLocation } from '@untr/apps-coip/utils/location.util';
import { LocationPermission } from '@untr/apps-coip/utils/permission.util';
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { jobIdentityErrorsType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import Space from '@untr/apps-coip/components/Space';
import TextInput from '@untr/apps-coip/components/TextInput';
import MapsWebview from '@untr/apps-coip/components/MapsWebview.config';
import { PositionLatLng } from '@untr/apps-coip/types/latlng.types';

type mapScreenProp = {
  section: string;
  isDisabled: boolean;
  status: number;
};

const MapsScreen = ({ isDisabled, section, status }: mapScreenProp) => {
  const formInfo = useFormContext();
  let errorsField: FieldErrors<jobIdentityErrorsType> = formInfo.formState.errors;
  const isOnline = isConnectedState((state) => state.isConnect);

  const [markerPoin, setMarkerPoin] = useState<PositionLatLng>({
    latitude: formInfo.getValues(`${section}.latitude`) || 0,
    longitude: formInfo.getValues(`${section}.longitude`) || 0,
  });

  const getMarkerPoin = async () => {
    if (status === 2) return; // Early exit if status is 2

    try {
      const permission = await LocationPermission();
      if (!permission.status) {
        return startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS); // Request permission if not granted
      }

      const location = await GetCurretLocation();
      const { longitude, latitude } = location;

      const position: PositionLatLng = {
        latitude: latitude,
        longitude: longitude,
      };

      setMarkerPoin(position);
      formInfo.setValue(`${section}.latitude`, position.latitude);
      formInfo.setValue(`${section}.longitude`, position.longitude);

      // Trigger form validation and clear errors
      await formInfo.trigger(`${section}.latitude`);
      await formInfo.trigger(`${section}.longitude`);
      formInfo.clearErrors([`${section}.latitude`, `${section}.longitude`]);
    } catch (err) {
      console.error(err); // Log errors
    }
  };

  const reset = async () => {
    const position: PositionLatLng = {
      latitude: 0,
      longitude: 0,
    };

    setMarkerPoin(position);
    formInfo.setValue(`${section}.latitude`, position.latitude);
    formInfo.setValue(`${section}.longitude`, position.longitude);
    await formInfo.trigger(`${section}.latitude`);
    await formInfo.trigger(`${section}.longitude`);
  };

  return (
    <View className="flex-1 w-full h-52">
      {isOnline ? (
        <View className="flex-1 w-full h-52">
          <View className="w-full h-52 absolute overflow-hidden top-0 bottom-0 left-0 right-0 rounded-md">
            <MapsWebview position={markerPoin} />
            <TouchableOpacity
              className="absolute bg-white rounded-md flex-row bottom-3  gap-2 items-center left-2 z-50 w-fit ps-2 pe-2 pb-2 pt-2 h-fit"
              disabled={isDisabled}
              onPress={() => {
                if (!isDisabled) {
                  getMarkerPoin();
                }
              }}
            >
              <IconsApp.IconMyLocation
                className="me-2"
                color={ColorsApp.black}
                width={14}
                height={14}
              />

              <Text style={styles.labelTextFieldLocation}>Set Your Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute bg-white rounded-md flex-row bottom-3  gap-2 items-center right-2 z-50 w-fit ps-2 pe-2 pb-2 pt-2 h-fit"
              disabled={isDisabled}
              onPress={() => {
                if (!isDisabled) {
                  reset();
                }
              }}
            >
              <IconsApp.IconReset color={ColorsApp.black} width={14} height={14} className="me-2" />

              <Text style={styles.labelTextFieldLocation}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {isOnline &&
      Object.keys(errorsField).length > 0 &&
      errorsField?.job_identity?.latitude?.message &&
      errorsField?.job_identity?.longitude?.message ? (
        <View className="mt-2">
          <Text size={CustomDimension.sizeInSp(14)} color={ColorsApp.errorColor}>
            {(errorsField?.job_identity?.latitude?.message as string) || ''}
          </Text>
        </View>
      ) : null}

      {!isOnline ? (
        <View className="flex-col gap-2">
          <View className="flex-row items-start justify-start mb-6">
            <View
              className="flex-col"
              style={{
                width: CustomDimension.WIDTH_PERCENTAGE(45),
              }}
            >
              <Text
                numberOfLines={1}
                size={CustomDimension.sizeInSp(12)}
                type="reguler"
                color="#707070"
              >
                Latitude
              </Text>
              <Space height={7} />
              <View>
                <TextInput
                  value={String(formInfo.watch(`${section}.latitude`))}
                  editable={false}
                  keyboardType="number-pad"
                  onChange={(value) => {
                    const textIsNotRight = value.match(/[,.-]/g);
                    if (!textIsNotRight) {
                      formInfo.setValue(`${section}.latitude`, Number(value));
                      const position: PositionLatLng = {
                        latitude: Number(value),
                        longitude: formInfo.getValues(`${section}.longitude`),
                      };

                      setMarkerPoin(position);

                      formInfo.clearErrors(`${section}.latitude`);
                    }
                  }}
                  placeholder="Input Latitude Your Location"
                  placeholderColor={ColorsApp.grey}
                  stylesBox={styles.fieldTextStyle}
                  error={
                    errorsField?.job_identity?.latitude?.message
                      ? errorsField?.job_identity?.latitude?.message
                      : ''
                  }
                  textStyle={styles.textFieldStyle}
                />
              </View>
            </View>
            <View
              className="flex-col"
              style={{
                width: CustomDimension.WIDTH_PERCENTAGE(45),
              }}
            >
              <Text
                numberOfLines={1}
                size={CustomDimension.sizeInSp(12)}
                type="reguler"
                color="#707070"
              >
                Longitude
              </Text>
              <Space height={7} />
              <View>
                <TextInput
                  value={String(formInfo.watch(`${section}.longitude`))}
                  editable={false}
                  keyboardType="number-pad"
                  onChange={(value) => {
                    const textIsNotRight = value.match(/[,.-]/g);
                    if (!textIsNotRight) {
                      formInfo.setValue(`${section}.longitude`, Number(value));
                      formInfo.clearErrors(`${section}.longitude`);
                      const position: PositionLatLng = {
                        latitude: formInfo.getValues(`${section}.latitude`),
                        longitude: Number(value),
                      };
                      setMarkerPoin(position);
                    }
                  }}
                  placeholder="Input Longitude Your Location"
                  placeholderColor={ColorsApp.grey}
                  stylesBox={styles.fieldTextStyle}
                  error={
                    errorsField?.job_identity?.longitude?.message
                      ? errorsField?.job_identity?.longitude?.message
                      : ''
                  }
                  textStyle={styles.textFieldStyle}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={isDisabled}
            onPress={() => {
              if (!isDisabled) {
                getMarkerPoin();
              }
            }}
            className="bg-white rounded-md flex-row gap-2 items-center justify-center w-full ps-2 pe-2 pb-2 pt-2 h-fit"
            style={styles.styleBtnOfflineLocation}
          >
            <IconsApp.IconMyLocation
              color={ColorsApp.black}
              width={14}
              height={14}
              className="me-2"
            />

            <Text style={styles.labelTextFieldLocation}>Your Location</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {!isOnline &&
      Object.keys(errorsField).length > 0 &&
      errorsField?.job_identity?.latitude?.message &&
      errorsField?.job_identity?.longitude?.message ? (
        <View className="mt-2">
          <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
            {(errorsField?.job_identity?.latitude?.message as string) || ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mapsStyle: { height: 175, borderRadius: 16 },
  labelTextFieldLocation: {
    color: 'black',
    fontSize: CustomDimension.sizeInSp(14),
  },
  labelTextField: {
    fontSize: CustomDimension.sizeInSp(11),
    fontWeight: '400',
    marginBottom: 4,
    color: '#9A9A9A',
  },
  mapboxViewStyle: {
    height: 175,
    borderRadius: 16,
    overflow: 'hidden',
  },
  styleBtnOfflineLocation: {
    backgroundColor: ColorsApp.primary,
  },
  textFieldStyle: {
    marginLeft: -5,
    fontWeight: '600',
    color: '#707070',
    fontSize: CustomDimension.sizeInSp(12),
  },
  fieldTextStyle: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: ColorsApp.black,
    marginLeft: -5,
    marginTop: -5,
    width: '80%',
  },
});
export default MapsScreen;

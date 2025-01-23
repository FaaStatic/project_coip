import { memo } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { inputChecksheetType } from '@untr/apps-coip/types/inputCheckSheetType.type';

export enum SectionField {
  Location = 'Location',
  AverageSpeed = 'AverageSpeed',
  DetailInformation = 'DetailInformation',
}

type CheckJobIsFilledProps = {
  sectionField: SectionField;
};

const getValidationResult = (
  form: UseFormReturn<inputChecksheetType>,
  sectionField: SectionField
) => {
  switch (sectionField) {
    case SectionField.Location:
      const latitude = form.getValues('job_identity.latitude');
      const longitude = form.getValues('job_identity.longitude');
      const location = form.getValues('job_identity.location');
      return latitude !== 0 && longitude !== 0 && location.length !== 0;

    case SectionField.DetailInformation:
      const startHour = form.getValues('job_identity.start_hour');
      const endHour = form.getValues('job_identity.end_hour');
      return startHour.length > 0 && endHour.length > 0;

    case SectionField.AverageSpeed:
      const averageSpeed = form.getValues('job_identity.averageSpeed');
      return averageSpeed !== undefined && averageSpeed !== 0;

    default:
      return false;
  }
};

const IconDisplay = ({ isValid }: { isValid: boolean }) => (
  <View style={styles.iconContainer}>
    {isValid ? (
      <IconsApp.IconAlertSuccess
        width={18}
        height={18}
        color={ColorsApp.successColor}
        style={styles.iconStyles}
      />
    ) : (
      <IconsApp.IconAlertError
        width={18}
        height={18}
        color={ColorsApp.errorColor}
        style={styles.iconStyles}
      />
    )}
  </View>
);

const CheckJobIsFilled = ({ sectionField }: CheckJobIsFilledProps) => {
  const form = useFormContext();

  const isValid = getValidationResult(form, sectionField);
  return <IconDisplay isValid={isValid} />;
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyles: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});

export default memo(CheckJobIsFilled);

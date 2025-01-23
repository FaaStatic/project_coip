import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import TextInput from '@untr/apps-coip/components/TextInput';
import { TestUnitIDConstant } from '@untr/apps-coip/constants/testUnitID.constants';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { testProps } from '@untr/apps-coip/utils/idComponentHelper.util';

type InputLoginProp = {
  name: string;
  label: string;
  usingForPassword?: boolean;
};

const InputLogin = ({ name, label, usingForPassword = false }: InputLoginProp) => {
  const formInput = useFormContext();

  return (
    <View className="pe-5 ps-5 h-fit">
      <Text size={CustomDimension.sizeInSp(13)} style={styles.colorLabelField}>
        {label}
      </Text>
      <Controller
        name={name}
        control={formInput.control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            {...testProps(TestUnitIDConstant.LOGINCONNECT_FORM_USERNAME)}
            value={value}
            onChange={onChange}
            secureTextEntry={usingForPassword}
            placeholder={`Input Your ${label}`}
            placeholderColor="#787878"
            autoCapitalize="none"
            stylesBox={styles.styleBoxField}
            textStyle={styles.textStyleField}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  styleBoxField: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginLeft: -5,
    marginTop: -5,
    width: '100%',
  },
  textStyleField: {
    marginLeft: -5,
    fontWeight: '700',
    color: '#1D1D1D',
    fontSize: CustomDimension.sizeInSp(14),
  },
  colorLabelField: {
    color: '#787878',
  },
});

export default InputLogin;

import { memo, useState } from 'react';
import type {
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputContentSizeChangeEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { icons } from 'lucide-react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { Input } from '@untr/apps-coip/lib/components/ui/input';

interface Props {
  placeholder: string;
  onChange?: (e: any) => void;
  value: any;
  type?: 'input' | 'textarea';
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'numeric';
  error?: any;
  secureTextEntry?: boolean;
  onClearButton?: boolean;
  onClear?: () => void;
  borderLess?: boolean;
  label?: string;
  useRef?: any;
  editable?: boolean;
  labelColor?: any;
  bold?: boolean;
  isPhone?: boolean;
  maxLength?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  isRequired?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'characters';
  focusInput?: boolean;
  confirmPasword?: boolean;
  textAreaHeight?: any;
  placeholderColor?: string;
  customBorder?: boolean;
  customText?: boolean;
  stylesBox?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  customButton?: boolean;
  customIcon?: ImageSourcePropType | any;
  customStyle?: ImageStyle | ImageStyle[];
  customPress?: () => void;
  wrapStyle?: any;
  heightBox?: number;
  customTextSecure?: boolean;
  onContentSizeChange?: (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void;
  onChangeEvent?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  multiline?: boolean;
  onSubmitEditing?: (e: any) => void;
  visiblePassword?: boolean;
}

const Component = ({
  onChange,
  placeholder,
  secureTextEntry = false,
  value,
  type = 'input',
  borderLess,
  error,
  keyboardType = 'default',
  useRef,
  editable = true,
  bold,
  isPhone,
  maxLength,
  onBlur,
  onFocus,
  autoCapitalize,
  focusInput,
  confirmPasword,
  textAreaHeight,
  placeholderColor,
  customBorder,
  customText,
  stylesBox,
  textStyle,
  customButton,
  customIcon,
  customStyle,
  customPress,
  wrapStyle,
  heightBox,
  customTextSecure = false,
  onContentSizeChange,
  onChangeEvent,
  multiline = false,
  onSubmitEditing,
  visiblePassword = false,
}: Props) => {
  const [visible, setVisible] = useState(visiblePassword);
  return (
    <>
      <View
        style={[
          styles.container,
          borderLess && styles.borderLess,
          !borderLess ? {} : {},
          customBorder ? { borderWidth: 1, borderColor: ColorsApp.primary } : {},
          error ? styles.borderError : {},
          heightBox ? { minHeight: heightBox } : { minHeight: 45 },
          stylesBox,
          {
            marginTop: 4,
            marginBottom: 4,
          },
        ]}
      >
        <View style={[styles.wrapInput, wrapStyle]}>
          {isPhone && (focusInput || value) ? (
            <Text
              size={16}
              style={{
                alignSelf: 'center',
                paddingBottom: Platform.OS === 'android' ? 2 : 0,
                marginRight: 4,
              }}
            >
              +62
            </Text>
          ) : (
            <></>
          )}
          <Input
            ref={useRef}
            style={[
              customText ? { fontSize: 15, height: 40, color: ColorsApp.black } : styles.textInput,
              type === 'textarea' && {
                minHeight: textAreaHeight || 84,
                textAlignVertical: 'top',
              },
              bold && { fontWeight: 'bold' },
              isPhone ? { width: '80%' } : { width: confirmPasword ? '80%' : '100%' },
              editable
                ? { paddingLeft: 0 }
                : { paddingLeft: CustomDimension.scaledHorizontal(-10) },
              textStyle,
              {
                borderWidth: 0,
              },
            ]}
            placeholderTextColor={placeholderColor ? placeholderColor : ColorsApp.white}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !visible}
            value={value}
            multiline={multiline ? multiline : type === 'textarea'}
            editable={editable}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onFocus={onFocus}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            onContentSizeChange={(e) => onContentSizeChange && onContentSizeChange(e)}
            onChange={(e) => onChangeEvent && onChangeEvent(e)}
            onSubmitEditing={(e) => onSubmitEditing && onSubmitEditing(e)}
          />

          <View style={{ flexDirection: 'row', flex: 1 }}>
            {customButton ? (
              <TouchableOpacity activeOpacity={0.7} style={[styles.wrapIcon]} onPress={customPress}>
                <Image source={customIcon} style={customStyle} resizeMode="contain" />
              </TouchableOpacity>
            ) : null}

            {secureTextEntry && !customTextSecure && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.wrapIcon}
                onPress={() => setVisible(!visible)}
              >
                {visible ? <icons.Eye style={styles.icon} color={ColorsApp.black} /> : null}
                {!visible ? <icons.EyeOff style={styles.icon} color={ColorsApp.black} /> : null}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {error && error !== '' ? (
        <View className="mb-2 h-fit w-full ">
          <Text style={styles.errorText} numberOfLines={5}>
            {error}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>{''}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: CustomDimension.scaledVertical(9),
  },
  textInput: {
    fontSize: CustomDimension.sizeInSp(15),
    height: 40,
    color: ColorsApp.white,
  },
  borderError: {
    borderColor: 'red',
  },
  borderLess: {
    borderBottomWidth: 1,
    borderColor: ColorsApp.white,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: ColorsApp.black,
    borderRadius: 8,
  },
  label: {
    paddingBottom: 3,
  },
  wrapInput: {
    flexDirection: 'row',
  },
  wrapIcon: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    top: 0,
    justifyContent: 'center',
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: ColorsApp.white,
  },
  clearIcon: {
    height: 16,
    width: 16,
    tintColor: ColorsApp.white,
  },
  errorText: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
    fontSize: CustomDimension.sizeInSp(12),
    color: 'red',
  },
  iconSvg: {
    height: 20,
    width: 20,
    color: ColorsApp.white,
  },
  contentSvg: {
    position: 'absolute',
  },
});

export default memo(Component);

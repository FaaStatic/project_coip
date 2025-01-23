import { memo, useRef, useState } from 'react';
import GuidanceCard from '@untr/apps-coip/components/GuidanceCard';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import Dropdown from '@untr/apps-coip/components/Dropdown';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { base64Header } from '@untr/apps-coip/constants/dummyData.constants';
import AnimationScorePicker from './AnimationScorePicker';
import Text from '@untr/apps-coip/components/Text';
import TextInput from '@untr/apps-coip/components/TextInput';
import ScoreRound from './ScoreRound';
import Toast from 'react-native-toast-message';
import CheckIsFullfilled from './CheckIsFullfilled';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { Controller, FieldErrors, useFormContext } from 'react-hook-form';
import { openCameraPicker } from '@untr/apps-coip/utils/cameraPicker.util';
import { base64Util } from '@untr/apps-coip/utils/imgToBase64Util.util';
import { deleteOperation } from '@untr/apps-coip/utils/fileSystemOperation.util';
import Space from '@untr/apps-coip/components/Space';
import { openEditorPick } from '@untr/apps-coip/utils/editorPhoto.util';
import { ConfigScoreUtil } from '@untr/apps-coip/utils/configScore.util';
import { checkInputErrorsType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { useKeyboard } from '@untr/apps-coip/lib';

type RenderCheckSheetProp = {
  item: any;
  index: number;
  section: string;
  idOpenParent: string | number;
  isDisabled: boolean;
  status: number;
  idOpenChild: string | number;
  setIdOpenParent: (data: string | number) => void;
  setIdOpenChild: (data: string | number) => void;
  errors: FieldErrors<checkInputErrorsType>;
};

const RenderChecksheet = ({
  item,
  index,
  errors,
  section,
  idOpenParent,
  idOpenChild,
  status,
  isDisabled,
  setIdOpenChild,
  setIdOpenParent,
}: RenderCheckSheetProp) => {
  const form = useFormContext();
  const TextInputCommentRef = useRef(null);
  const TextInputRecomendRef = useRef(null);
  const [tempImgSize, setTempImgSize] = useState([]);
  const { dismissKeyboard } = useKeyboard();

  const attachFunction = async (key: string) => {
    let data = await openCameraPicker();
    form?.setValue(key, data.base64, { shouldValidate: true });
    setTempImgSize([data.width, data.height]);
    await form?.trigger(key);
  };

  const editFoto = async (key) => {
    const dataPhoto = form?.getValues(key);
    const uri = await base64Util.decodeBase64ToFile(dataPhoto);
    const result = await openEditorPick(uri, tempImgSize[0], tempImgSize[1]);
    form?.setValue(key, result, { shouldValidate: true });
    await deleteOperation(uri);
    await form?.trigger(key);
  };

  return (
    <Dropdown
      key={item.id}
      idOpenContent={idOpenParent}
      callOpen={(value) => {
        setIdOpenParent(value);
      }}
      tagOpen={item.id}
      leftChildren={
        <Text
          style={{
            width: CustomDimension.WIDTH_PERCENTAGE(75),
            fontFamily: FontsUtils.bold,
          }}
          color={
            errors !== undefined
              ? Object.keys(errors).length !== 0
                ? errors?.[section]?.data?.[index]
                  ? ColorsApp.errorColor
                  : ColorsApp.black
                : ColorsApp.black
              : ColorsApp.black
          }
        >
          {item?.desc}
        </Text>
      }
      isOpenFirst={idOpenParent === item?.id}
    >
      {item?.data &&
        item?.data?.map((itm, idx) => {
          return (
            <Dropdown
              key={itm.id}
              idOpenContent={idOpenChild}
              callOpen={(value) => {
                setIdOpenChild(value);
              }}
              tagOpen={itm.id}
              leftChildren={
                <View style={styles.styleLeftChildren}>
                  <CheckIsFullfilled
                    score={form.getValues(`${section}.data.${index}.data.${idx}.score`)}
                    image={form.getValues(`${section}.data.${index}.data.${idx}.image`)}
                    recomendation={form.getValues(
                      `${section}.data.${index}.data.${idx}.recommendation`
                    )}
                    comment={form.getValues(`${section}.data.${index}.data.${idx}.comment`)}
                  />
                  <View className="ms-2 flex-1">
                    <Text
                      numberOfLines={3}
                      size={14}
                      style={{
                        width: CustomDimension.WIDTH_PERCENTAGE(45),
                        fontFamily: FontsUtils.medium,
                      }}
                      color={
                        Object.keys(errors).length !== 0 && errors !== undefined
                          ? errors?.[section]?.data?.[index]?.data?.[idx]?.comment?.message
                              ?.length > 0 ||
                            errors?.[section]?.data?.[index]?.data?.[idx]?.image?.message?.length >
                              0 ||
                            errors?.[section]?.data?.[index]?.data?.[idx]?.recommendation?.message
                              ?.length > 0 ||
                            errors?.[section]?.data?.[index]?.data?.[idx]?.score?.message?.length >
                              0
                            ? ColorsApp.errorColor
                            : ColorsApp.black
                          : ColorsApp.black
                      }
                    >
                      {itm.klausul + '.   ' + itm.description}
                    </Text>
                  </View>

                  <View style={styles.styleViewScoreRound} />
                  <ScoreRound
                    score={form.watch(`${section}.data.${index}.data.${idx}.score`)}
                    configScore={form.getValues(`${section}.data.${index}.data.${idx}.configScore`)}
                  />
                </View>
              }
              isOpenFirst={itm.id === idOpenChild}
              withBorderBottom={false}
            >
              <View
                style={{
                  marginVertical: CustomDimension.scaledVertical(15),
                  paddingHorizontal: CustomDimension.scaledHorizontal(10),
                }}
              >
                <GuidanceCard
                  data={[
                    {
                      id: 1,
                      title: 'Operations Standard',
                      guidance_list: itm.operationStandard,
                    },
                    {
                      id: 2,
                      title: 'Guidance',
                      guidance_list: itm.guidance,
                    },
                  ]}
                />
                <View
                  style={{
                    marginTop: CustomDimension.scaledVertical(15),
                  }}
                >
                  <Text type="medium">Score : </Text>
                  <Space height={10} />
                  <AnimationScorePicker
                    disabled={isDisabled}
                    scoreData={ConfigScoreUtil(itm.configScore)}
                    controllerName={`${section}.data.${index}.data.${idx}.score`}
                    score={form.watch(`${section}.data.${index}.data.${idx}.score`)}
                    clearError={() => {
                      form.clearErrors(`${section}.data.${index}.data.${idx}.score`);
                    }}
                    control={form?.control}
                    trigger={form?.trigger}
                  />
                  {Object.keys(errors).length !== 0 && errors !== undefined ? (
                    errors?.[section]?.data?.[index]?.data?.[idx]?.score?.message ? (
                      <View className="mt-2">
                        <Text size={CustomDimension.sizeInSp(14)} color={ColorsApp.errorColor}>
                          {(errors?.[section]?.data?.[index]?.data?.[idx]?.score
                            ?.message as string) || ''}
                        </Text>
                      </View>
                    ) : null
                  ) : null}
                </View>
                <View>
                  <Space height={20} />
                  <Text numberOfLines={1} size={12} type="bold">
                    Comment
                    {form.watch(`${section}.data.${index}.data.${idx}.score`) < 4 ? (
                      <Text style={styles.styleColorReqiredMark}>*</Text>
                    ) : null}
                  </Text>
                  <Space height={7} />
                  <View className="h-14">
                    <View className="flex-col justify-start items-start">
                      <TextInput
                        useRef={TextInputCommentRef}
                        value={form.watch(`${section}.data.${index}.data.${idx}.comment`)}
                        maxLength={250}
                        editable={!isDisabled}
                        onChange={(text) => {
                          if (isDisabled) {
                            Toast.show({
                              type: 'error',
                              text1: 'Error can`t edit comment',
                              text2: 'You can`t remove this comment because is final',
                              position: 'bottom',
                            });
                          } else {
                            form.setValue(`${section}.data.${index}.data.${idx}.comment`, text);
                            form.clearErrors(`${section}.data.${index}.data.${idx}.comment`);
                          }
                        }}
                        placeholder="Input Comment"
                        placeholderColor={
                          Object.keys(errors).length !== 0 && errors !== undefined
                            ? errors?.[section]?.data?.[index]?.data?.[idx]?.comment
                              ? ColorsApp.errorColor
                              : ColorsApp.silver
                            : ColorsApp.silver
                        }
                        stylesBox={[
                          styles.styleFieldForm,
                          {
                            borderBottomColor:
                              Object.keys(errors).length !== 0 && errors !== undefined
                                ? errors?.[section]?.data?.[index]?.data?.[idx]?.comment
                                  ? ColorsApp.errorColor
                                  : ColorsApp.silver
                                : ColorsApp.silver,
                          },
                        ]}
                        textStyle={styles.styleTextField}
                        error={
                          Object.keys(errors).length !== 0 && errors !== undefined
                            ? errors?.[section]?.data?.[index]?.data?.[idx]?.comment
                              ? errors?.[section]?.data?.[index]?.data?.[idx]?.comment?.message
                              : ''
                            : ''
                        }
                      />
                    </View>
                    {Object.keys(errors).length !== 0 && errors !== undefined ? (
                      errors?.[section]?.data?.[index]?.data?.[idx]?.comment?.message ? (
                        <Space height={10} />
                      ) : null
                    ) : null}
                  </View>
                  {Object.keys(errors).length !== 0 && errors !== undefined ? (
                    errors?.[section]?.data?.[index]?.data?.[idx]?.comment?.message ? (
                      <Space height={60} />
                    ) : (
                      <Space height={10} />
                    )
                  ) : (
                    <Space height={10} />
                  )}

                  <Text numberOfLines={1} size={12} type="bold">
                    Recommendation
                    {form.watch(`${section}.data.${index}.data.${idx}.score`) < 4 ? (
                      <Text style={styles.styleColorReqiredMark}>*</Text>
                    ) : null}
                  </Text>
                  <Space height={4} />
                  <View className="h-14">
                    <View className="flex-col justify-start items-start">
                      <TextInput
                        useRef={TextInputRecomendRef}
                        value={form.watch(`${section}.data.${index}.data.${idx}.recommendation`)}
                        maxLength={250}
                        editable={!isDisabled}
                        onChange={(text) => {
                          if (isDisabled) {
                            Toast.show({
                              type: 'error',
                              text1: 'Error can`t edit recommendation',
                              text2: 'You can`t remove this recommendation because is final',
                              position: 'bottom',
                            });
                          } else {
                            form.setValue(
                              `${section}.data.${index}.data.${idx}.recommendation`,
                              text
                            );
                            form.clearErrors(`${section}.data.${index}.data.${idx}.recommendation`);
                          }
                        }}
                        placeholder="Input Recommendation"
                        placeholderColor={
                          Object.keys(errors).length !== 0 && errors !== undefined
                            ? errors?.data?.[index]?.data?.[idx]?.comment
                              ? ColorsApp.errorColor
                              : ColorsApp.silver
                            : ColorsApp.silver
                        }
                        stylesBox={[
                          styles.styleFieldForm,
                          {
                            borderBottomColor:
                              Object.keys(errors).length !== 0 && errors !== undefined
                                ? errors?.[section]?.data?.[index]?.data?.[idx]?.recommendation
                                  ? ColorsApp.errorColor
                                  : ColorsApp.silver
                                : ColorsApp.silver,
                          },
                        ]}
                        textStyle={styles.styleTextField}
                        error={
                          Object.keys(errors).length !== 0 && errors !== undefined
                            ? errors?.[section]?.data?.[index]?.data?.[idx]?.recommendation
                              ? errors?.[section]?.data?.[index]?.data?.[idx]?.recommendation
                                  ?.message
                              : ''
                            : ''
                        }
                      />
                    </View>
                  </View>
                  {Object.keys(errors).length !== 0 && errors !== undefined ? (
                    errors?.[section]?.data?.[index]?.data?.[idx]?.recommendation?.message ? (
                      <Space height={10} />
                    ) : null
                  ) : null}
                </View>

                {Object.keys(errors).length !== 0 && errors !== undefined ? (
                  errors?.[section]?.data?.[index]?.data?.[idx]?.recommendation?.message ? (
                    <Space height={60} />
                  ) : (
                    <Space height={10} />
                  )
                ) : (
                  <Space height={10} />
                )}
                <Text
                  numberOfLines={1}
                  size={12}
                  type="bold"
                  style={{
                    fontFamily: FontsUtils.bold,
                  }}
                >
                  Attachment
                  <Text style={styles.styleColorReqiredMark}>*</Text>
                </Text>
                <Space height={10} />

                <Controller
                  name={`${section}.data.${index}.data.${idx}.image`}
                  control={form?.control}
                  render={({ field: { name } }) => {
                    return (
                      <View className="flex-col ">
                        <TouchableOpacity
                          disabled={isDisabled}
                          onPress={() => {
                            dismissKeyboard();
                            attachFunction(name);
                          }}
                          className="gap-2"
                          style={[
                            styles.btnStyle,
                            {
                              borderColor:
                                Object.keys(errors).length !== 0 && errors !== undefined
                                  ? errors?.[section]?.data?.[index]?.data?.[idx]?.image
                                    ? ColorsApp.errorColor
                                    : ColorsApp.transparent
                                  : ColorsApp.transparent,
                            },
                          ]}
                        >
                          <Text
                            color={
                              Object.keys(errors).length !== 0 && errors !== undefined
                                ? errors?.[section]?.data?.[index]?.data?.[idx]?.image
                                  ? ColorsApp.errorColor
                                  : ColorsApp.black
                                : ColorsApp.black
                            }
                            size={CustomDimension.sizeInSp(12)}
                            style={{ fontFamily: FontsUtils.bold }}
                          >
                            Attach File
                          </Text>
                          <IconsApp.IconCamera
                            width={18}
                            className="ms-1"
                            color={ColorsApp.black}
                            height={18}
                          />
                        </TouchableOpacity>
                        {Object.keys(errors).length !== 0 && errors !== undefined ? (
                          errors?.[section]?.data?.[index]?.data?.[idx]?.image ? (
                            <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
                              {errors?.data?.[index]?.data?.[idx]?.image?.message}
                            </Text>
                          ) : null
                        ) : null}
                        {Object.keys(errors).length !== 0 && errors !== undefined ? (
                          errors?.[section]?.data?.[index]?.data?.[idx]?.image ? (
                            <Space height={24} />
                          ) : null
                        ) : null}
                      </View>
                    );
                  }}
                />

                {form.watch(`${section}.data.${index}.data.${idx}.image`)?.length > 0 ? (
                  <View className="justify-center w-full items-center flex-col mt-8">
                    <View className="relative flex-col">
                      <Image
                        source={{
                          uri: `${base64Header}${form?.getValues(`${section}.data.${index}.data.${idx}.image`)}`,
                        }}
                        style={styles.imageStyle}
                      />
                    </View>
                    <View className="flex-row  absolute bottom-2 left-0 right-0 justify-center items-end z-10 ">
                      <TouchableOpacity
                        className="me-5"
                        onPress={() => {
                          if (status !== 2) {
                            editFoto(`${section}.data.${index}.data.${idx}.image`);
                          } else {
                            Toast.show({
                              type: 'error',
                              text1: 'Error edit photo',
                              text2: 'You can`t edit this photo because is final evidence',
                              position: 'bottom',
                            });
                          }
                        }}
                      >
                        <IconsApp.IconEdit
                          height={28}
                          width={28}
                          color={ColorsApp.secondaryVariant}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={async () => {
                          if (status !== 2) {
                            form.setValue(`${section}.data.${index}.data.${idx}.image`, '');
                            await form.trigger(`${section}.data.${index}.data.${idx}.image`);
                          } else {
                            Toast.show({
                              type: 'error',
                              text1: 'Error remove photo',
                              text2: 'You can`t remove this photo because is final evidence',
                              position: 'bottom',
                            });
                          }
                        }}
                      >
                        <IconsApp.IconEmptyData
                          height={28}
                          width={28}
                          color={ColorsApp.errorColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            </Dropdown>
          );
        })}
    </Dropdown>
  );
};
const styles = StyleSheet.create({
  styleLeftChildren: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  styleViewScoreRound: {
    flex: 1,
    borderWidth: 1,
    borderColor: ColorsApp.background,
    borderStyle: 'dashed',
    height: 1,
    marginLeft: CustomDimension.scaledHorizontal(3),
    marginRight: CustomDimension.scaledHorizontal(2),
    marginTop: CustomDimension.scaledVertical(3),
  },
  styleColorReqiredMark: {
    color: ColorsApp.errorColor,
  },
  styleFieldForm: {
    borderBottomWidth: 1,
    marginLeft: -5,
    height: 45,
    marginTop: -5,
    marginBottom: 0,
    width: '100%',
  },
  styleTextField: {
    marginLeft: -5,
    fontWeight: '500',
    color: ColorsApp.black,
    fontSize: 14,
  },
  imageStyle: {
    aspectRatio: 1 / 1,
    width: '100%',
    height: 'auto',
    resizeMode: 'stretch',
  },
  btnStyle: {
    height: 35,
    backgroundColor: ColorsApp.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 1,
    borderRadius: 5,
  },
});

export default memo(RenderChecksheet);

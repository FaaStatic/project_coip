import { memo } from 'react';
import { Image, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import Space from '@untr/apps-coip/components/Space';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { base64Header } from '@untr/apps-coip/constants/dummyData.constants';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@untr/apps-coip/lib/components/ui/table';

type descriptionJob = {
  klausul: string;
  description: string;
  imageString?: string;
  score: string;
};

type EvidenceitemProps = {
  assessmentArea: string;
  parameter: string;
  descriptionJob?: descriptionJob[];
  statusColor?: any;
  isPica?: boolean;
  hasImage?: boolean;
};
type EvidenceComponentsProps = {
  itemData: EvidenceitemProps;
};

const EvidenceComponents = ({ itemData }: EvidenceComponentsProps) => {
  const { assessmentArea, parameter, descriptionJob, statusColor, isPica, hasImage } = itemData;

  return (
    <View className="flex-1 h-fit flex-col mt-1">
      <View className="flex-row items-center justify-start mb-4">
        <View
          className={`h-4 w-1 me-2`}
          style={{
            backgroundColor: hasImage
              ? ColorsApp.primary
              : isPica
                ? ColorsApp.errorColor
                : statusColor?.color,
          }}
        />
        <Text
          style={{
            fontSize: CustomDimension.sizeInSp(15),
            color: hasImage ? ColorsApp.primary : isPica ? ColorsApp.errorColor : '#3E3E3E',
            fontFamily: FontsUtils.bold,
          }}
        >
          {hasImage ? 'Evidence' : isPica ? 'PICA' : String(parameter).toLocaleUpperCase()}
        </Text>
      </View>
      <View
        className="flex-col flex-1 rounded-xl h-fit w-full"
        style={{
          backgroundColor: 'white',
        }}
      >
        {!hasImage ? (
          <View className="overflow-hidden">
            <Table className="rounded-t-xl">
              <TableHeader
                className="rounded-t-xl"
                style={{
                  backgroundColor: isPica ? ColorsApp.errorColor : statusColor?.color,
                }}
              >
                <TableRow>
                  <TableHead style={{ width: CustomDimension.WIDTH_PERCENTAGE(15) }}>
                    <Text>{''}</Text>
                  </TableHead>
                  <TableHead style={{ width: CustomDimension.WIDTH_PERCENTAGE(45) }}>
                    <Text
                      style={{
                        fontSize: CustomDimension.sizeInSp(14),
                        fontFamily: FontsUtils.bold,
                        color: isPica ? 'white' : 'black',
                      }}
                    >
                      Description
                    </Text>
                  </TableHead>
                  <TableHead style={{ width: CustomDimension.WIDTH_PERCENTAGE(25) }}>
                    <Text
                      style={{
                        fontSize: CustomDimension.sizeInSp(14),
                        fontFamily: FontsUtils.bold,
                        color: isPica ? 'white' : 'black',
                      }}
                    >
                      Score
                    </Text>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {!isPica ? (
                <TableHeader
                  style={{
                    backgroundColor: '#FFF6D1',
                  }}
                >
                  <TableRow>
                    <TableHead style={{ width: CustomDimension.WIDTH_PERCENTAGE(15) }}>
                      <Text>{''}</Text>
                    </TableHead>
                    <TableHead style={{ width: CustomDimension.WIDTH_PERCENTAGE(45) }}>
                      <Text
                        style={{
                          fontFamily: FontsUtils.bold,
                          fontSize: CustomDimension.sizeInSp(14),
                          color: ColorsApp.secondary,
                        }}
                      >
                        {String(assessmentArea).toLocaleUpperCase()}
                      </Text>
                    </TableHead>
                    <TableHead style={{ width: CustomDimension.WIDTH_PERCENTAGE(25) }}>
                      <Text>{''}</Text>
                    </TableHead>
                  </TableRow>
                </TableHeader>
              ) : null}

              <TableBody>
                {descriptionJob.map((item, index) => {
                  return (
                    <TableRow
                      key={
                        isPica
                          ? `${index} + ${item.klausul}+pica_report`
                          : `${index} + ${item.klausul}+good_report`
                      }
                    >
                      <TableCell style={{ width: CustomDimension.WIDTH_PERCENTAGE(15) }}>
                        <Text
                          style={{
                            fontFamily: FontsUtils.bold,
                            fontSize: CustomDimension.sizeInSp(12),
                            color: '#3E3E3E',
                          }}
                        >
                          {item.klausul}
                        </Text>
                      </TableCell>
                      <TableCell style={{ width: CustomDimension.WIDTH_PERCENTAGE(45) }}>
                        <Text
                          style={{
                            fontFamily: FontsUtils.regular,
                            fontSize: CustomDimension.sizeInSp(12),
                            color: '#3E3E3E',
                          }}
                        >
                          {item.description}
                        </Text>
                      </TableCell>
                      <TableCell style={{ width: CustomDimension.WIDTH_PERCENTAGE(25) }}>
                        <Text
                          style={{
                            fontFamily: FontsUtils.regular,
                            fontSize: CustomDimension.sizeInSp(12),
                            color: '#3E3E3E',
                          }}
                        >
                          {item.score}
                        </Text>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </View>
        ) : null}

        {hasImage
          ? descriptionJob.map((item, index) => {
              return (
                <View
                  key={`${index} + ${item.klausul}+PICA_image`}
                  className="p-5 flex-col w-full items-center justify-center h-fit mt-12"
                >
                  <View
                    className="rounded-xl relative w-full"
                    style={{
                      height: 175,
                      width: 255,
                    }}
                  >
                    <Image
                      className="rounded-xl self-center"
                      src={`${base64Header}${item?.imageString}`}
                      style={{
                        width: 255,
                        height: 175,
                        resizeMode: 'stretch',
                      }}
                    />
                    <View
                      className="rounded-full absolute items-center justify-center -top-4 -left-4"
                      style={{
                        backgroundColor: ColorsApp.primary,
                        height: 35,
                        width: 35,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FontsUtils.bold,
                          fontSize: CustomDimension.sizeInSp(14),
                          color: '#3E3E3E',
                        }}
                      >
                        {item.klausul}
                      </Text>
                    </View>
                  </View>
                  <Space height={13} />
                  <Text
                    style={{
                      fontSize: CustomDimension.sizeInSp(14),
                      fontFamily: FontsUtils.medium,
                      color: '#3E3E3E',
                    }}
                  >
                    {`${item.description} (${item.score})`}
                  </Text>
                </View>
              );
            })
          : null}
        {hasImage ? <Space height={48} /> : null}
      </View>
      <Space height={16} />
    </View>
  );
};

export default memo(EvidenceComponents);

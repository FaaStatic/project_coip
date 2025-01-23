import { FlashList } from "@shopify/flash-list";
import { Space } from "lucide-react-native";
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import JobCard from "@untr/apps-coip/components/JobCard";
import ScreenEmpty from "@untr/apps-coip/components/ScreenEmpty";
import { FontsUtils } from "@untr/apps-coip/configs/fonUtils.config";
import { Skeleton } from "@untr/apps-coip/lib/components/ui/skeleton";
import { ColorsApp } from "@untr/apps-coip/themes/colorApp.theme";
import { createJobItemType } from "@untr/apps-coip/types/createJobItemType.type";
import { CustomDimension } from "@untr/apps-coip/utils/customDimension.util";
import Text from "@untr/apps-coip/components/Text";

type ContentListJobProp = {
  jobProgressFetching: boolean;
  jobProgressData: createJobItemType[];
  jobRefetch: any;
  jobProgressIsFetchingNextPage: boolean;
  category: string;
  reload: boolean;
};

const ContentListJob = ({
  jobProgressFetching,
  jobProgressData,
  jobRefetch,
  jobProgressIsFetchingNextPage,
  category,
  reload,
}: ContentListJobProp) => {
  useEffect(() => {
    jobRefetch();
  }, [reload]);
  return (
    <View className="flex-1">
      {jobProgressFetching ? (
        <View
          className="flex-1 min-h-max h-fit ps-5 pe-5 pt-3"
          style={{
            backgroundColor: ColorsApp.background,
            minHeight: CustomDimension.HEIGHT_PERCENTAGE(60),
          }}
        >
          <FlashList
            estimatedItemSize={10}
            estimatedFirstItemOffset={10}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            keyExtractor={(item) => `${item} + y`}
            renderItem={(_) => (
              <Skeleton className="dark:bg-white rounded-lg overflow-hidden min-w-96 min-h-48 flex-col my-2 shadow-lg border-transparent pt-4 ps-4 pe-4 pb-4 shadow-gray-400" />
            )}
          />
        </View>
      ) : (
        <View className="w-full">
          <View
            className="flex-1 min-h-max pe-5 ps-5 h-fit"
            style={{
              backgroundColor: ColorsApp.background,
              minHeight: CustomDimension.HEIGHT_PERCENTAGE(60),
            }}
          >
            <Space height={15} />
            {jobProgressData !== undefined && jobProgressData.length > 0 ? (
              <View style={styles.flashListStyle}>
                <FlashList
                  estimatedItemSize={jobProgressData.length}
                  scrollEnabled={false}
                  estimatedFirstItemOffset={10}
                  data={jobProgressData.flat()}
                  contentContainerStyle={{
                    backgroundColor: ColorsApp.background,
                  }}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item, index }) => (
                    <JobCard
                      isCompleted={!(category === 'in-progress')}
                      jobcard={item}
                      key={`${item.id}+${index}`}
                    />
                  )}
                />
              </View>
            ) : (
              <ScreenEmpty
                title="Job is Empty"
                description="Job is Empty ..."
                heightView={CustomDimension.HEIGHT_PERCENTAGE(40)}
              />
            )}
            {jobProgressIsFetchingNextPage ? (
              <View
                className="w-full h-24 justify-center items-center z-50"
                style={{
                  backgroundColor: ColorsApp.transparent,
                }}
              >
                <ActivityIndicator color={ColorsApp.primary} size={'large'} />
                <Space height={8} />
                <Text
                  size={CustomDimension.sizeInSp(12)}
                  style={{
                    color: ColorsApp.primary,
                    fontFamily: FontsUtils.medium,
                  }}
                >
                  Load Data ...
                </Text>
              </View>
            ) : null}
            <Space height={110} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flashListStyle: { flexGrow: 1 },
});

export default ContentListJob;

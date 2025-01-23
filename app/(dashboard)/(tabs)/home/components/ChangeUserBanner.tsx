import { ArrowRightIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { FontsUtils } from "@untr/apps-coip/configs/fonUtils.config";
import { useActiveCustomer } from "@untr/apps-coip/hooks/useActiveCustomer";
import { ColorsApp } from "@untr/apps-coip/themes/colorApp.theme";
import { IconsApp } from "@untr/apps-coip/themes/iconApp.theme";
import Text from "@untr/apps-coip/components/Text";

type openUser = {
  setOpenUser: (stat: boolean) => void;
};

const ChangeUserBanner = ({ setOpenUser }: openUser) => {
  const { data, isLoading } = useActiveCustomer();

  return (
    <TouchableOpacity
      onPress={() => {
        setOpenUser(true);
      }}
      className="flex flex-row h-fit rounded-[8px] items-center justify-between"
      style={{
        backgroundColor: ColorsApp.black,
        marginHorizontal: 20,
        marginVertical: 13,
        padding: 8,
      }}
    >
      <View className="flex flex-row">
        <IconsApp.IconCompanyUser
          width={32}
          height={32}
          style={{
            backgroundColor: '#FFFFFF4D',
            marginEnd: 8,
          }}
        />

        {!data && (
          <Text
            style={{
              fontFamily: FontsUtils.bold,
              fontSize: 14,
              color: ColorsApp.primary,
            }}
          >
            Loading ...
          </Text>
        )}
        {data && (
          <View className="flex flex-col">
            <Text
              style={{
                fontFamily: FontsUtils.bold,
                fontSize: 14,
                color: ColorsApp.primary,
              }}
            >
              {`${data.activeCustomer.userName}`}
            </Text>
            <Text
              style={{
                fontFamily: FontsUtils.regular,
                fontSize: 12,
                marginTop: 2,
                color: ColorsApp.white,
              }}
            >
              {`+ ${data.countCustomer} More`}
            </Text>
          </View>
        )}
      </View>
      <ArrowRightIcon size={24} color={ColorsApp.white} />
    </TouchableOpacity>
  );
};

export default ChangeUserBanner;

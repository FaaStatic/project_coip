import Jsona from 'jsona';

const normalizedDataApi = (data: any) => {
  try {
    const normalizedUtil = new Jsona();
    return normalizedUtil.deserialize(data);
  } catch (error) {
    return undefined;
  }
};
export default normalizedDataApi;

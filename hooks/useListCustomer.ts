import { useInfiniteQuery } from '@tanstack/react-query';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { LIST_SIZE } from '@untr/apps-coip/constants/dummyData.constants';
import CustomerList from '@untr/apps-coip/schemas/CustomerList/CustomerList.schema';
import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';

const getUserList = async (start, limit, queryKey) => {
  const [_, isSearch, type] = queryKey;
  try {
    let result = (await readAllDatafromDB<CustomerList[]>(schemaDatabase.CustomerList)) ?? [];

    if (result.length === 0) return [];

    let userList = result
      .filter((item) => (type === 1 ? item.isChoose === true : item.isChoose === false))
      .reduce((acc, item, _) => {
        if (!acc.some((existingItem) => existingItem.userName === item.userName)) {
          acc.push({
            id: item.id,
            title: `${item.userName} - ${item.userCode}`,
            userCode: item.userCode,
          });
        }
        return acc;
      }, []);
    if (isSearch) {
      return userList;
    } else {
      const limitLength = start + limit;
      const compareLength = userList.length - limitLength;
      if (userList.length < 10) {
        return userList;
      } else {
        if (userList.length >= 10 || compareLength > limitLength) {
          return userList.slice(start, limitLength);
        } else {
          return userList.slice(start, start + compareLength + 1);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useListCustomer = (isSearch = false, type = 0) => {
  return useInfiniteQuery({
    queryKey: ['getUserList', isSearch, type],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getUserList(pageParam * LIST_SIZE, LIST_SIZE, queryKey),
    initialPageParam: 0,
    refetchOnMount: false,
    staleTime: Infinity,
    networkMode: 'always',
    getNextPageParam: (lastPage, _pages, lastPageParam, _allPages) => {
      if (lastPage.length === 0 || lastPage.length < 10) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => {
      return data?.pages.reduce((acc, page) => {
        return [...acc, ...page];
      }, []);
    },
  });
};

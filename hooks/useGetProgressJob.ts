import { useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';
import { LIST_SIZE } from '@untr/apps-coip/constants/dummyData.constants';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';
import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';

const getJobCardListProgress = async (start: number, limit: number, queryKey: any[]) => {
  try {
    const [_, sortBy, minDate, maxDate, isCompleted, customerCode] = queryKey;

    const result = await readAllDatafromDB<createJobItemType[]>(schemaDatabase.CreateJobsItem);

    // Helper function to filter jobs based on status
    const filterByStatus = (item: createJobItemType) => {
      return isCompleted ? item.status === 2 : item.status < 2;
    };

    // Helper function to filter jobs by date range
    const filterByDateRange = (item: createJobItemType) => {
      const dateProcess = new Date(item.updatedAt as Date).getTime();

      // Parse minDate and maxDate correctly using moment and convert them to timestamps
      const compareMinDate = moment(minDate, 'YYYY-MM-DD').startOf('day').valueOf(); // start of min date
      const compareMaxDate = moment(maxDate, 'YYYY-MM-DD').endOf('day').valueOf(); // end of max date

      return dateProcess >= compareMinDate && dateProcess <= compareMaxDate;
    };

    // Filter, sort, and map data
    const filteredData = result
      .filter((item) => filterByStatus(item)) // Filter by completion status
      .filter(minDate && maxDate ? filterByDateRange : () => true) // Filter by date range if provided
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt as Date).getTime();
        const dateB = new Date(b.updatedAt as Date).getTime();
        return sortBy === 'ASC' ? dateA - dateB : dateB - dateA;
      });

    if (customerCode) {
      const result = filteredData
        .filter((item) => JSON.parse(item.customer).code === customerCode)
        .map((item) => item);
      const end = start + limit;
      const slicedData = result.slice(start, Math.min(end, filteredData.length));
      return slicedData;
    }

    // Slice the data based on pagination logic
    const end = start + limit;
    const slicedData = filteredData.slice(start, Math.min(end, filteredData.length));

    return slicedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useGetProgressJob = (
  sortBy = 'ASC',
  minDate = '',
  maxDate = '',
  isCompleted = false,
  customerCode = null,
  isInternal = false
) => {
  return useInfiniteQuery({
    queryKey: ['jobListProgress', sortBy, minDate, maxDate, isCompleted, customerCode],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getJobCardListProgress(pageParam * LIST_SIZE, LIST_SIZE, queryKey),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam, _allPages) => {
      if (lastPage.length === 0 || lastPage.length < 10) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    networkMode: 'always',
    enabled: customerCode !== null || !isInternal,
    select: (data) => {
      return data?.pages.reduce((acc, page) => {
        return [...acc, ...page];
      }, []);
    },
  });
};

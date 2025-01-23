import { useGetStatusJob } from '@untr/apps-coip/hooks/useGetStatusJob';
import { View, StyleSheet } from 'react-native';
import CardJobs from '@untr/apps-coip/components/CardJob';
import ReloadState from '@untr/apps-coip/states/reload.state';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';

const ListStatusJob = () => {
  const queryClient = useQueryClient();
  const { data: userData, isFetching: loadingUser } = useGetUserLocal();
  const reload = ReloadState((state) => state.reloadFunc);
  const {
    data: dataStatusJob,
    refetch: jobStatusRefetch,
    isFetching: jobStatusFetching,
  } = useGetStatusJob(userData?.customerCode, userData?.isInternal);

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ['jobStatus'],
      exact: true,
    });
    jobStatusRefetch();
  }, [reload]);

  return (
    <View style={styles.viewRootStyle}>
      <CardJobs
        isLoading={jobStatusFetching}
        title={'Total Job'}
        total={dataStatusJob?.newJob || 0}
        key={1}
      />
      <CardJobs
        isLoading={jobStatusFetching}
        title={'In Progress'}
        total={dataStatusJob?.progress || 0}
        key={2}
      />
      <CardJobs
        isLoading={jobStatusFetching}
        title={'Job Completed'}
        total={dataStatusJob?.completed || 0}
        key={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewRootStyle: { flexDirection: 'row', gap: 10 },
});

export default ListStatusJob;

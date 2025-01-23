import JobIdentity from './job-identity/_layout';
import FormInputScreen from './form-input-screen/_layout';
import { OutputDetail } from '@untr/apps-coip/hooks/useGetFormDetail';

type RenderRouteProps = {
  section: string;
  data: OutputDetail;
  customer: any;
};

const getStatusProps = (status: number) => ({
  status,
  isDisabled: status === 2,
});

const RenderRoute = ({ section, data, customer }: RenderRouteProps) => {
  const { status, isDisabled } = getStatusProps(Number(data?.status));

  if (section === 'job_identity') {
    return (
      <JobIdentity
        section={section}
        date={data?.planExecutionDate ?? ''}
        jobId={data?.id ?? ''}
        title={data?.title ?? ''}
        customer={customer}
        status={status}
        isDisabled={isDisabled}
        assignId={String(data?.jobNumber)}
      />
    );
  }

  return <FormInputScreen section={section} status={status} isDisabled={isDisabled} />;
};

export default RenderRoute;

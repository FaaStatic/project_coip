import { useFieldArray, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { jobItemSchema } from '@untr/apps-coip/types/createJobForm.type';
import Text from '@untr/apps-coip/components/Text';
import SelectedSectionJob from '@untr/apps-coip/components/SelectionSectionJob';
import Space from '@untr/apps-coip/components/Space';
import LineHorizontal from '@untr/apps-coip/components/Line';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

const ListComponenetJob = () => {
  const formJob = useFormContext();

  const { fields: listMainJob } = useFieldArray({
    control: formJob.control,
    shouldUnregister: true,
    name: `main_job`,
  });

  const { fields: listDetailJob } = useFieldArray({
    control: formJob.control,
    shouldUnregister: true,
    name: `detail_job`,
  });

  const onSelectedParent = async (type: string, parentIndex: number) => {
    let tempData: jobItemSchema[] | null = null;
    if (type === 'main_job') {
      tempData = formJob.getValues('main_job');
    } else {
      tempData = formJob.getValues('detail_job');
    }
    const newJobs = [...tempData];
    const parent = newJobs[parentIndex];
    const newSelected = !parent.selected;

    newJobs[parentIndex] = {
      ...parent,
      selected: newSelected,
      child: parent.child.map((child) => ({
        ...child,
        selected: newSelected,
      })),
    };

    if (type === 'main_job') {
      formJob.setValue('main_job', newJobs);
    } else {
      formJob.setValue('detail_job', newJobs);
    }
  };

  const onSelectedChild = async (type: string, parentIndex: number, childIndex: number) => {
    let tempData: jobItemSchema[] | null = null;
    if (type === 'main_job') {
      tempData = formJob.getValues('main_job');
    } else {
      tempData = formJob.getValues('detail_job');
    }
    const newJobs = [...tempData];
    const parent = newJobs[parentIndex];
    const newChild = [...parent.child];
    const child = newChild[childIndex];
    const newChildSelected = !child.selected;
    newChild[childIndex] = {
      ...child,
      selected: newChildSelected,
    };

    const allChildrenSelected = newChild.every((child) => child.selected);
    newJobs[parentIndex] = {
      ...parent,
      selected: allChildrenSelected,
      child: newChild,
    };
    if (type === 'main_job') {
      formJob.setValue('main_job', newJobs);
    } else {
      formJob.setValue('detail_job', newJobs);
    }
  };

  return (
    <View>
      <View style={styles.styleLabelJob}>
        <Text type="bold" style={styles.styleTextLabelJob}>
          Main Job
        </Text>
      </View>
      {listMainJob.map((item, index) => (
        <SelectedSectionJob
          type={'main_job'}
          item={item}
          section="main_job"
          key={index}
          onSelectedChild={onSelectedChild}
          onSelectedParent={onSelectedParent}
          index={index}
        />
      ))}

      <Space height={20} />
      <LineHorizontal height={10} />
      <Space height={20} />
      <View style={styles.styleLabelJob}>
        <Text type="bold" style={styles.styleTextLabelJob}>
          Detail Job
        </Text>
      </View>
      {listDetailJob.map((item, index) => (
        <View key={`${item.id}+${index}`}>
          <SelectedSectionJob
            type={'detail_job'}
            item={item}
            section="detail_job"
            key={index}
            onSelectedChild={onSelectedChild}
            onSelectedParent={onSelectedParent}
            index={index}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  styleLabelJob: {
    borderBottomWidth: 1,
    borderBottomColor: ColorsApp.background,
    paddingBottom: CustomDimension.scaledVertical(20),
  },
  styleTextLabelJob: {
    fontFamily: FontsUtils.bold,
  },
});

export default ListComponenetJob;

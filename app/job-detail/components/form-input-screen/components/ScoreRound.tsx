import { StyleSheet, View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { useEffect } from 'react';
import { ConfigScoreUtil } from '@untr/apps-coip/utils/configScore.util';

type ScoreRoundProp = {
  score: number;
  configScore: any;
};

const ScoreRound = ({ score, configScore }: ScoreRoundProp) => {
  useEffect(() => {}, [score]);
  if (score === 0) {
    return (
      <View style={styles.viewScoreRoot}>
        <Text size={10} type="medium" textAlign="center" color={ColorsApp.black}>
          {score}
        </Text>
      </View>
    );
  } else {
    return (
      <View
        className="rounded-full"
        style={[
          styles.viewScore,
          {
            backgroundColor: ConfigScoreUtil(configScore).filter((item) => item.value === score)[0]
              ?.color,
          },
        ]}
      >
        <Text
          size={10}
          type="medium"
          textAlign="center"
          color={ConfigScoreUtil(configScore).filter((item) => item.value === score)[0]?.fontColor}
        >
          {score}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewScore: {
    height: 16,
    width: 16,
    justifyContent: 'center',
  },
  viewScoreRoot: {
    height: 16,
    width: 16,
    justifyContent: 'center',
  },
});

export default ScoreRound;

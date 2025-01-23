import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, UseFormTrigger } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from '@untr/apps-coip/components/Text';

type AnimationPropScorePicker = {
  scoreData: Array<any>;
  controllerName: string;
  disabled?: boolean;
  score: number;
  clearError: () => void;
  control: Control<FieldValues, any>;
  trigger: UseFormTrigger<FieldValues>;
};

const AnimationScorePicker = ({
  scoreData,
  controllerName,
  clearError,
  score,
  control,
  disabled,
  trigger,
}: AnimationPropScorePicker) => {
  const [showScore, setShowScore] = useState(false);
  const [firstPick, setFirstPick] = useState(true);

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const scoreBtn = useSharedValue(0);
  const itemScoreBtn = useSharedValue(1);

  const animatedBtn = useAnimatedStyle(() => ({
    opacity: scoreBtn.value,
  }));
  const animatedItemScore = useAnimatedStyle(() => ({
    opacity: itemScoreBtn.value,
  }));

  useEffect(() => {
    setFirstPick(true);
  }, [score]);

  const animatedProcess = (typePick: number) => {
    switch (typePick) {
      case 1:
        scoreBtn.value = withTiming(0, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        itemScoreBtn.value = withTiming(1, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        break;
      case 2:
        scoreBtn.value = withTiming(1, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        itemScoreBtn.value = withTiming(0, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        break;

      default:
        scoreBtn.value = withTiming(1, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        itemScoreBtn.value = withTiming(0, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });
        break;
    }
  };

  if (score === 0 && firstPick) {
    return (
      <View className="flex-row gap-5 relative">
        {scoreData.map((itemConfigScore, indexConfigScore) => {
          return (
            <Controller
              key={indexConfigScore}
              name={controllerName}
              control={control}
              render={({ field: { onChange, name } }) => (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={async () => {
                    onChange(itemConfigScore.value);
                    clearError();
                    await trigger(name);
                    setFirstPick(false);
                    setShowScore(false);
                    animatedProcess(2);
                  }}
                  key={indexConfigScore}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 6,
                    backgroundColor: itemConfigScore.color,
                    justifyContent: 'center',
                    borderWidth: score === itemConfigScore.value ? 2 : 0,
                    borderColor: 'black',
                  }}
                >
                  <Text size={20} textAlign="center" type="bold" color={itemConfigScore.fontColor}>
                    {itemConfigScore.value}
                  </Text>
                </TouchableOpacity>
              )}
            />
          );
        })}
      </View>
    );
  } else if (score > 0 && firstPick) {
    return (
      <View className="flex-row gap-5 relative">
        {scoreData
          .filter((element) => {
            if (element.value === score) {
              return element;
            }
          })
          .map((elementNumber) => {
            return (
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  setFirstPick(false);
                  setShowScore(false);
                  animatedProcess(2);
                }}
                key={elementNumber.id + 'XX'}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 6,
                  backgroundColor: elementNumber.color,
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: 'black',
                }}
              >
                <Text size={20} textAlign="center" type="bold" color={elementNumber.fontColor}>
                  {elementNumber.value}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  } else if (score > 0 && !firstPick) {
    return (
      <Animated.View className="flex-row gap-5 relative">
        {showScore
          ? scoreData.map((itemConfigScore, indexConfigScore) => {
              return (
                <Controller
                  key={indexConfigScore}
                  name={controllerName}
                  control={control}
                  render={({ field: { onChange, name } }) => (
                    <AnimatedTouchable
                      disabled={disabled}
                      onPress={async () => {
                        onChange(itemConfigScore.value);
                        clearError();
                        await trigger(name);
                        setShowScore(false);
                        animatedProcess(2);
                      }}
                      key={indexConfigScore}
                      style={[
                        animatedItemScore,
                        {
                          height: 40,
                          width: 40,
                          borderRadius: 6,
                          backgroundColor: itemConfigScore.color,
                          justifyContent: 'center',
                          borderWidth: score === itemConfigScore.value ? 2 : 0,
                          borderColor: 'black',
                        },
                      ]}
                    >
                      <Text
                        size={20}
                        textAlign="center"
                        type="bold"
                        color={itemConfigScore.fontColor}
                      >
                        {itemConfigScore.value}
                      </Text>
                    </AnimatedTouchable>
                  )}
                />
              );
            })
          : scoreData
              .filter((element) => {
                if (element.value === score) {
                  return element;
                }
              })
              .map((elementNumber) => {
                return (
                  <AnimatedTouchable
                    disabled={disabled}
                    onPress={() => {
                      setShowScore(true);
                      animatedProcess(1);
                    }}
                    key={elementNumber.id + 'XX'}
                    style={[
                      animatedBtn,
                      {
                        height: 40,
                        width: 40,
                        borderRadius: 6,
                        backgroundColor: elementNumber.color,
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: 'black',
                      },
                    ]}
                  >
                    <Text size={20} textAlign="center" type="bold" color={elementNumber.fontColor}>
                      {elementNumber.value}
                    </Text>
                  </AnimatedTouchable>
                );
              })}
      </Animated.View>
    );
  }
};

export default AnimationScorePicker;

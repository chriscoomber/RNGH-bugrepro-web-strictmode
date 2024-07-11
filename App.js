import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';


export default function App() {
  return (
    <React.StrictMode>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
          <DragSquare/>
        </View>
      </GestureHandlerRootView>
    </React.StrictMode>
  );
}

function DragSquare() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const style = useAnimatedStyle(
    () => ({ left: x.value, top: y.value }),
    [x, y]
  );

  const pan = Gesture.Pan().onUpdate((e) => {
    x.value = e.translationX;
    y.value = e.translationY;
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            height: 20,
            width: 20,
            backgroundColor: 'red',
            borderRadius: 5,
            position: 'absolute',
          },
          style,
        ]}
      />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';


export default function App() {
  const [state, setState] = useState({});
  const renderCount = ++(useRef(0).current);

  return <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Button title={`Force rerender (this is render ${renderCount})`} onPress={() => setState({})} />

      <Text>Strict draggable</Text>
      <React.StrictMode>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <DragSquare/>
        </View>
      </React.StrictMode>

      <Text>Non-strict draggable</Text>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <DragSquare/>
      </View>
    </View>
  </GestureHandlerRootView>
}

function DragSquare() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const style = useAnimatedStyle(
    () => ({ left: x.value, top: y.value }),
    [x, y]
  );

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      console.log('onUpdate', e.x, e.y);
      x.value = e.translationX;
      y.value = e.translationY;
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
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

import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function App() {
  const [renderCounter, setRenderCounter] = useState(1);

  return (
    <View style={styles.container}>
      <Button title={`Force rerender (this is render ${renderCounter})`} onPress={() => setRenderCounter(old => old+1)} />

      <Text>With strict mode (click square to animate it)</Text>
      <React.StrictMode>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <SlidingSquare log />
        </View>
      </React.StrictMode>

      <Text>Without strict mode  (click square to animate it)</Text>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <SlidingSquare />
      </View>
    </View>
  );
}

function SlidingSquare(props) {

  const x = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    props.log && console.log(x.value);
    return ({ left: x.value });
  }, [x]);

  return (
    <Animated.View
      style={style}
    >
      <Pressable 
        onPress={() => { x.value = withSpring(x.value + 100); }}
        style={{ height: 100, width: 100, backgroundColor: 'red', borderRadius: 5 }}
      />
    </Animated.View>
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

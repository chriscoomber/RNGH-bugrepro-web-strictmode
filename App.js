import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function App() {
  const [renderCounter, setRenderCounter] = useState(1);

  return (
    <View style={styles.container}>
      <Button title={`Force rerender (this is render ${renderCounter})`} onPress={() => setRenderCounter(old => old+1)} />

      <Text>With strict mode</Text>
      <React.StrictMode>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <DragSquare x={renderCounter * 100} log />
        </View>
      </React.StrictMode>

      <Text>Without strict mode</Text>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <DragSquare x={renderCounter * 100} />
      </View>
    </View>
  );
}

function DragSquare(props) {

  const x = useSharedValue(0);

  useEffect(() => {
    x.value = withSpring(props.x);
  })

  const style = useAnimatedStyle(() => {
    props.log && console.log(x.value);
    return ({ left: x.value });
  }, [x]);

  return (
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

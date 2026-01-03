import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameScene, { GameSceneRef } from './src/components/GameScene';
import Joystick from './src/components/Joystick';

export default function App() {
  const sceneRef = useRef<GameSceneRef>(null);

  const handleJoystickMove = (x: number, y: number) => {
    sceneRef.current?.setJoystickInput(x, y);
  };

  const handleJoystickRelease = () => {
    sceneRef.current?.setJoystickInput(0, 0);
  };

  return (
    <View style={styles.container}>
      <GameScene ref={sceneRef} />
      
      <View style={styles.joystickContainer}>
        <Joystick
          onMove={handleJoystickMove}
          onRelease={handleJoystickRelease}
          size={140}
        />
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  joystickContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
  },
});

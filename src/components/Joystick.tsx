import React, { useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';

type JoystickProps = {
  onMove: (x: number, y: number) => void;
  onRelease: () => void;
  size?: number;
};

export default function Joystick({ onMove, onRelease, size = 120 }: JoystickProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const maxDistance = size / 2 - 20;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: 0, y: 0 });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        let { dx, dy } = gestureState;
        
        // Limit to circle
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxDistance) {
          dx = (dx / distance) * maxDistance;
          dy = (dy / distance) * maxDistance;
        }

        pan.setValue({ x: dx, y: dy });
        
        // Normalize values to -1 to 1
        const normalizedX = dx / maxDistance;
        const normalizedY = -dy / maxDistance; // Invert Y for intuitive control
        onMove(normalizedX, normalizedY);
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          friction: 5,
        }).start();
        onRelease();
      },
    })
  ).current;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.base, { width: size, height: size, borderRadius: size / 2 }]}>
        <Animated.View
          style={[
            styles.stick,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  base: {
    backgroundColor: 'rgba(61, 46, 36, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(92, 74, 58, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stick: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 166, 86, 0.9)',
    borderWidth: 2,
    borderColor: '#5c4a3a',
  },
});

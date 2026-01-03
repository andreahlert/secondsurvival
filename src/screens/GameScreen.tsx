import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TavernScene, { TavernSceneRef } from '../components/TavernScene';
import Joystick from '../components/Joystick';

type GameScreenProps = {
  onBack: () => void;
};

export default function GameScreen({ onBack }: GameScreenProps) {
  const sceneRef = useRef<TavernSceneRef>(null);

  const handleJoystickMove = (x: number, y: number) => {
    sceneRef.current?.setJoystickInput(x, y);
  };

  const handleJoystickRelease = () => {
    sceneRef.current?.setJoystickInput(0, 0);
  };

  return (
    <View style={styles.container}>
      {/* 3D Tavern Scene */}
      <TavernScene ref={sceneRef} />

      {/* HUD Overlay */}
      <View style={styles.hud}>
        {/* Top Bar - Resources */}
        <View style={styles.topBar}>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceIcon}>🪙</Text>
            <Text style={styles.resourceValue}>0</Text>
          </View>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceIcon}>🌾</Text>
            <Text style={styles.resourceValue}>0</Text>
          </View>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceIcon}>⭐</Text>
            <Text style={styles.resourceValue}>0</Text>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Menu</Text>
        </TouchableOpacity>

        {/* Joystick - Bottom Left */}
        <View style={styles.joystickContainer}>
          <Joystick
            onMove={handleJoystickMove}
            onRelease={handleJoystickRelease}
            size={120}
          />
        </View>

        {/* Bottom Bar - Actions */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🍺</Text>
            <Text style={styles.actionLabel}>Brewing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionLabel}>Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔨</Text>
            <Text style={styles.actionLabel}>Upgrades</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1210',
  },
  hud: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    pointerEvents: 'box-none',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 10,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 46, 36, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5c4a3a',
  },
  resourceIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  resourceValue: {
    color: '#d4a656',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: 'rgba(61, 46, 36, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5c4a3a',
  },
  backButtonText: {
    color: '#d4a656',
    fontSize: 14,
  },
  joystickContainer: {
    position: 'absolute',
    bottom: 100,
    left: 30,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    paddingTop: 10,
    paddingRight: 20,
    gap: 10,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(61, 46, 36, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5c4a3a',
    minWidth: 70,
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  actionLabel: {
    color: '#d4a656',
    fontSize: 10,
    fontWeight: '600',
  },
});

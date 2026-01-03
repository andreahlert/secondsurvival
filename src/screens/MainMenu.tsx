import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

type MenuButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

function MenuButton({ title, onPress, disabled = false }: MenuButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.menuButton, disabled && styles.menuButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.menuButtonInner}>
        <Text style={[styles.menuButtonText, disabled && styles.menuButtonTextDisabled]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type MainMenuProps = {
  onNewGame: () => void;
  onContinue: () => void;
  onSettings: () => void;
  hasSaveData?: boolean;
};

export default function MainMenu({ 
  onNewGame, 
  onContinue, 
  onSettings,
  hasSaveData = false 
}: MainMenuProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1210', '#2d1f1a', '#1a1210']}
        style={styles.background}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleIcon}>🍺</Text>
            <Text style={styles.title}>Tavern</Text>
            <Text style={styles.titleAnd}>&</Text>
            <Text style={styles.title}>Tales</Text>
            <View style={styles.subtitleContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.subtitle}>Idle Tavern Manager</Text>
              <View style={styles.dividerLine} />
            </View>
          </View>

          {/* Menu Buttons */}
          <View style={styles.menuContainer}>
            <MenuButton title="New Game" onPress={onNewGame} />
            <MenuButton title="Continue" onPress={onContinue} disabled={!hasSaveData} />
            <MenuButton title="Settings" onPress={onSettings} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.version}>v1.0.0</Text>
          </View>
        </View>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  titleIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#d4a656',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 4,
  },
  titleAnd: {
    fontSize: 28,
    color: '#8b7355',
    fontStyle: 'italic',
    marginVertical: -5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
  dividerLine: {
    width: 40,
    height: 2,
    backgroundColor: '#5c4a3a',
  },
  subtitle: {
    fontSize: 14,
    color: '#8b7355',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 16,
  },
  menuButton: {
    backgroundColor: '#3d2e24',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5c4a3a',
    overflow: 'hidden',
  },
  menuButtonDisabled: {
    opacity: 0.5,
  },
  menuButtonInner: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d4a656',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  menuButtonTextDisabled: {
    color: '#6b5a4a',
  },
  footer: {
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#5c4a3a',
  },
});

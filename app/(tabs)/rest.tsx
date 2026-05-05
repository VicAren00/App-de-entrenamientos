import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function RestScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.timerContainer}>
        <View style={[styles.circle, { borderColor: theme.tint }]}>
          <Text style={[styles.timeText, { color: theme.text }]}>01:30</Text>
          <Text style={[styles.nextText, { color: theme.cardSecondaryText }]}>Descansando...</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>-10s</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.playButton, { backgroundColor: theme.primaryButton }]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={32} color={theme.primaryButtonText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>+30s</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.resetButton}>
        <Text style={[styles.resetText, { color: theme.cardSecondaryText }]}>Reiniciar temporizador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  nextText: {
    fontSize: 16,
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 40,
    padding: 10,
  },
  resetText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

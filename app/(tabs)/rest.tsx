import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const presets = [
  { label: '30s', seconds: 30 },
  { label: '60s', seconds: 60 },
  { label: '90s', seconds: 90 },
  { label: '2min', seconds: 120 },
  { label: '3min', seconds: 180 },
];

export default function RestScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [isRunning, setIsRunning] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(90);
  const [remainingSeconds, setRemainingSeconds] = useState(90);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const applyPreset = (seconds: number) => {
    setInitialSeconds(seconds);
    setRemainingSeconds(seconds);
    setIsRunning(false);
    setCustomMinutes('');
    setCustomSeconds('');
  };

  const handleStartPause = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(initialSeconds);
      setIsRunning(true);
      return;
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setRemainingSeconds(initialSeconds);
    setIsRunning(false);
  };

  const handleAddTime = (delta: number) => {
    setRemainingSeconds((prev) => Math.max(0, prev + delta));
  };

  const applyCustomTime = () => {
    const minutes = Number(customMinutes) || 0;
    const seconds = Number(customSeconds) || 0;
    const total = minutes * 60 + seconds;
    if (total <= 0) {
      return;
    }
    setInitialSeconds(total);
    setRemainingSeconds(total);
    setIsRunning(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.timerContainer}>
        <View style={[styles.circle, { borderColor: theme.tint }]}> 
          <Text style={[styles.timeText, { color: theme.text }]}>{formatTime(remainingSeconds)}</Text>
          <Text style={[styles.nextText, { color: theme.cardSecondaryText }]}>Descansando...</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => handleAddTime(-10)}
          disabled={remainingSeconds === 0}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>-10s</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.primaryButton }]}
          onPress={handleStartPause}
        >
          <Ionicons name={isRunning ? 'pause' : 'play'} size={32} color={theme.primaryButtonText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => handleAddTime(30)}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>+30s</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => handleAddTime(60)}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>+1min</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.presetsContainer}>
        {presets.map((preset) => {
          const isSelected = remainingSeconds === preset.seconds && !customMinutes && !customSeconds;
          return (
            <TouchableOpacity
              key={preset.label}
              style={[
                styles.presetButton,
                { backgroundColor: isSelected ? theme.primaryButton : theme.card, borderColor: theme.border },
              ]}
              onPress={() => applyPreset(preset.seconds)}
            >
              <Text
                style={[
                  styles.presetText,
                  { color: isSelected ? theme.primaryButtonText : theme.text },
                ]}
              >
                {preset.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.customContainer, { borderColor: theme.border, backgroundColor: theme.card }]}> 
        <Text style={[styles.customLabel, { color: theme.text }]}>Tiempo personalizado</Text>
        <View style={styles.customInputs}>
          <View style={styles.customField}>
            <Text style={[styles.customFieldLabel, { color: theme.cardSecondaryText }]}>Min</Text>
            <TextInput
              value={customMinutes}
              onChangeText={setCustomMinutes}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={theme.cardSecondaryText}
              style={[styles.customInput, { color: theme.text, borderColor: theme.border }]}
            />
          </View>
          <View style={styles.customField}>
            <Text style={[styles.customFieldLabel, { color: theme.cardSecondaryText }]}>Seg</Text>
            <TextInput
              value={customSeconds}
              onChangeText={setCustomSeconds}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={theme.cardSecondaryText}
              style={[styles.customInput, { color: theme.text, borderColor: theme.border }]}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: theme.primaryButton }]}
          onPress={applyCustomTime}
        >
          <Text style={[styles.applyButtonText, { color: theme.primaryButtonText }]}>Aplicar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={[styles.resetText, { color: theme.cardSecondaryText }]}>Reiniciar temporizador</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
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
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 24,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  presetButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  presetText: {
    fontWeight: 'bold',
  },
  customContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  customInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  customField: {
    flex: 1,
  },
  customFieldLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  customInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  applyButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    padding: 10,
  },
  resetText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

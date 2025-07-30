import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { baseStyles } from '@/constants/BaseStyles';
import { Login } from '@/hooks/hooks';
import { saveToken } from '@/utils/authStorage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleLogin = async () => {
    setLoading(true);
    console.log('Attempting to log in with:', { email, password });

    try {
      const response = await Login(email, password);

      // Store auth token 
      if (response) {
        const token = response?.data?.token;

        if (token) {
          await saveToken(token);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      // Display a generic error message
    } finally {
      setLoading(false);
    }
  };

  function debug() {
    router.push('/(auth)/index')
  }

  return (
    <ThemedView style={baseStyles.container}>
      <ThemedView style={baseStyles.headerContainer}>
        <ThemedText type="title" onPress={debug}>Welcome Back!</ThemedText>
        <ThemedText type="subtitle">Login to your LinkMatch account</ThemedText>
      </ThemedView>

      <ThemedView style={baseStyles.formContainer}>
        <TextInput
          style={baseStyles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          keyboardType="default"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading} // Disable input when loading
        />
        <TextInput
          style={baseStyles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading} // Disable input when loading
        />

        <TouchableOpacity
          style={[baseStyles.button, loading && baseStyles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          <ThemedText style={baseStyles.buttonText}>
            {loading ? 'Logging In...' : 'Login'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={baseStyles.linkButton}>
          <ThemedText type="link">Forgot Password?</ThemedText>
        </TouchableOpacity>

        <View style={baseStyles.registerContainer}>
          <ThemedText>Don&apos;t have an account? </ThemedText>
          <TouchableOpacity style={baseStyles.linkButton}>
            <ThemedText style={baseStyles.linkButtonText}>Register here</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

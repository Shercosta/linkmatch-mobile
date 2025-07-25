import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { baseStyles } from '@/constants/BaseStyles';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for error messages

  const handleRegister = async () => {
    setError(''); // Clear previous errors
    // 1. Basic input validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    console.log('Attempting to register with:', { username, password });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Placeholder for actual registration logic
      // In a real app, you would make an API call to your Go backend:
      // const response = await fetch('YOUR_GO_BACKEND_REGISTER_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, email, password }),
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   console.log('Registration successful!', data);
      //   // Navigate to login or home screen
      // } else {
      //   setError(data.message || 'Registration failed. Please try again.');
      // }

      // Simulate successful registration
      if (username && password === confirmPassword) {
        console.log('Registration successful!');
        // You might want to navigate to the login page here
        // router.replace('/login'); // Assuming you have expo-router setup
      } else {
        setError('Registration failed. Please check your details.');
      }

    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={baseStyles.container}>
      <ScrollView contentContainerStyle={baseStyles.scrollContent}>
        <ThemedView style={baseStyles.headerContainer}>
          <ThemedText type="title">Join LinkMatch!</ThemedText>
          <ThemedText type="subtitle">Create your account to get started</ThemedText>
        </ThemedView>

        <ThemedView style={baseStyles.formContainer}>
          {error ? <ThemedText style={baseStyles.errorMessage}>{error}</ThemedText> : null}

          <TextInput
            style={baseStyles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
          <TextInput
            style={baseStyles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <TextInput
            style={baseStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />

          <TouchableOpacity
            style={[baseStyles.button, loading && baseStyles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <ThemedText style={baseStyles.buttonText}>
              {loading ? 'Registering...' : 'Register'}
            </ThemedText>
          </TouchableOpacity>

          <View style={baseStyles.loginContainer}>
            <ThemedText>Already have an account? </ThemedText>
            <TouchableOpacity style={baseStyles.linkButton}>
              <ThemedText style={baseStyles.linkButtonText}>Login here</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}


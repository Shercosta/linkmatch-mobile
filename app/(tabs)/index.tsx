import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// Assuming you have a basic Button component or will use TouchableOpacity directly
// For simplicity, I'll use TouchableOpacity with ThemedText inside for the button.
// If you have a dedicated Button component, you can replace this.

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleLogin = async () => {
    // In a real app, you would:
    // 1. Validate inputs (e.g., email format, password length)
    // 2. Set loading state to true
    // 3. Make an API call to your Go backend for authentication
    // 4. Handle success (e.g., navigate to home screen, save auth token)
    // 5. Handle errors (e.g., display error message to user)
    // 6. Set loading state to false

    setLoading(true);
    console.log('Attempting to log in with:', { email, password });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Placeholder for actual login logic
      if (email === 'test@example.com' && password === 'password123') {
        console.log('Login successful!');
        // Navigate to main app screen (e.g., using router.replace('/home'))
        // For now, we'll just log success.
      } else {
        console.log('Login failed: Invalid credentials');
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Login error:', error);
      // Display a generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title">Welcome Back!</ThemedText>
        <ThemedText type="subtitle">Login to your LinkMatch account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          keyboardType="default"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading} // Disable input when loading
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading} // Disable input when loading
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Logging In...' : 'Login'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton}>
          <ThemedText type="link">Forgot Password?</ThemedText>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <ThemedText>Don&apos;t have an account? </ThemedText>
          <TouchableOpacity style={styles.linkButton}>
            <ThemedText style={styles.linkButtonText}>Register here</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9', // Light background for input
    color: '#333', // Dark text color for input
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF4D6D', // Your brand color for the button
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#FF8A9E', // Lighter shade when disabled
  },
  buttonText: {
    color: '#fff', // White text for the button
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkButton: {
    marginBottom: 10,
  },
  linkButtonText: {
    color: Colors.light.tabIconDefault, // Your brand color for the link
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

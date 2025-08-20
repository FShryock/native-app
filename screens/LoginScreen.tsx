import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { MainStackParamList } from '../navigation/MainNavigator';
import logo from '../assets/logo.png';

interface LoginScreenProps {
  handleLogin: (value: boolean) => void
}

export default function LoginScreen(props: LoginScreenProps) {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const userIDRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);  

  return (
    <View style={styles.container}>
      {/* Display Logo */}
      <Image source={logo} style={styles.logo} resizeMode={'contain'}/>

      <Text style={styles.title}>Volley-Connect</Text>


        {/* UserId */}
        <TextInput
        ref={userIDRef}
        style={styles.input}
        placeholder={'User ID'}
        placeholderTextColor={'#673ab7'}
        value={userID}
        onChangeText={setUserID}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        />

        {/* Password */}
        <TextInput
        ref={passwordRef}
        style={styles.input}
        secureTextEntry={true}  // <-- this makes it a password input
        placeholder={'Password'}
        placeholderTextColor={'#673ab7'}
        value={password}
        onChangeText={setPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="done"
        onSubmitEditing={() => console.log('Submit login')}
        />
     

      {/* Forgot Password */}
      {/* TODO 
        Add logic to handle the request to unlock
      */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* LoginButton */}
      {/* TODO 
        Add logic to handle User login
      */}
      <TouchableOpacity style={styles.buttonContainer} onPress={() => props.handleLogin(true)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

       {/* Signup link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}> Sign up</Text>
        </TouchableOpacity>
      </View>
                    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1D21',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    color: '#ffeb3b',
    marginBottom: 20
  },
  input: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    color: '#181818',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 20
  },
  inputFocus: {
    borderColor: '#FF5722',
    borderWidth: 2,
    backgroundColor: '#817f7f',

  },
  forgotContainer:{
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  forgotText: {
    color: '#ccc',
    fontSize: 14
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30
  }, 
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    borderRadius: 8,
    textAlign: 'center',
    // backgroundColor: '#166088'
    backgroundColor: '#ff5722'
  },
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
    padding: 5
  },
  signupText: {
    color: '#ccc',
    fontSize: 16, 
    marginBottom: 14
  },
  signupLink: {
    color: '#ffeb3b',
    fontWeight: '800',
    fontSize: 18
  }
})

// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Login Screen</Text>
    //   <Button title="Go to Map" onPress={() => navigation.navigate('Map')} />
    // </View>
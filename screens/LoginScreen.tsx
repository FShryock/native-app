import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { getLogin } from '../api/getLogin';
import logo from '../assets/logo.png';
import BottomSheetModal from '../components/BottomSheetModal';
import SignUp from './SignUpScreen';

interface LoginScreenProps {
  handleLogin: (value: boolean) => void
}

export default function LoginScreen(props: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleLogin = async () => {
    try{
      await getLogin(username, password);
      props.handleLogin(true);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* Display Logo */}
      <View style={styles.mainScreen}>
      <Image source={logo} style={styles.logo} resizeMode={'contain'}/>

      <Text style={styles.title}>Volley-Connect</Text>


      {/* UserId */}
      <TextInput
      style={styles.input}
      placeholder={'User ID'}
      placeholderTextColor={'#673ab7'}
      onChangeText={setUsername}
      returnKeyType="next"
      />

      {/* Password */}
      <TextInput
      style={styles.input}
      secureTextEntry={true}  // <-- this makes it a password input
      placeholder={'Password'}
      placeholderTextColor={'#673ab7'}
      onChangeText={setPassword}
      returnKeyType="done"
      />
     
     {error ? <Text style={styles.error}>{error}</Text> : null}

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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

       {/* Signup link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {setIsBottomSheetOpen(true)}}>
          <Text style={styles.signupLink}> Sign up</Text>
        </TouchableOpacity>
      </View>

      </View>
        <BottomSheetModal
          visible={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <SignUp onClose={() => setIsBottomSheetOpen(false)}/>
        </BottomSheetModal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1D21',
    // padding: 20
  },
  mainScreen: {
    flex: 1,
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
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center'
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

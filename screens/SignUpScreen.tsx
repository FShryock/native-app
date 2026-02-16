import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import signUp from "../api/signup";

interface SignUpProps {
    onClose: () => void,
}

export default function SignUp(props: SignUpProps) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        const response = await signUp({first_name: firstname, last_name: lastname, email, username, password});
        if (response.success) {
            Alert.alert("Success", "Your Account has been created!");
            props.onClose();
        } else {
            Alert.alert("Error", response.error || "Something went wrong");
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Volley Account</Text>

            {/* input form requirements */}
            <TextInput style={styles.input} placeholder={'First Name'} value={firstname} onChangeText={setFirstname} placeholderTextColor="#aaa"/>
            <TextInput style={styles.input} placeholder={'Last Name'} value={lastname} onChangeText={setLastname} placeholderTextColor="#aaa"/>
            <TextInput style={styles.input} placeholder={'Email'} value={email} onChangeText={setEmail} placeholderTextColor="#aaa"/>
            <TextInput style={styles.input} placeholder={'Username'} value={username} onChangeText={setUsername} placeholderTextColor="#aaa"/>
            <TextInput secureTextEntry={true}  style={styles.input} placeholder={'Password'} value={password} onChangeText={setPassword} placeholderTextColor="#aaa"/>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up 🏐</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1d21ff",
    padding: 20,
    alignItems: "center",
    marginTop: 50,
    borderRadius: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 60,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#2C2F36",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ff6b3580'
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF6B35",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
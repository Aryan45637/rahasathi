import React, { useState } from 'react';
import { Text, TextInput, Image, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Detailscreen from './detailscreen'; // Ensure this is correct

const Login = ({ navigation }) => {
  const [text, settext] = useState('');
  const [password, setpassword] = useState('');
  const [submittedtext, setsubmittedtext] = useState('');

  const handlesubmit = () => {
    // if (text === 'admin' && password === '1234') {
      setsubmittedtext(text);
      settext('');
      setpassword('');
      navigation.navigate("detailscreen" ,{ submittedText: text });
    // } else {
    //   Alert.alert("Invalid Credentials", "Please enter a valid ID and password.");
    // }
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={require('../../assets/images/rahasathi.png')}
      />
      
      <TextInput
        placeholder="Enter your ID"
        style={styles.input}
        value={text}
        onChangeText={settext}
      />
      <TextInput
        placeholder="Enter your password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setpassword}
      />
      
      <TouchableOpacity style={styles.buttoncontainer} onPress={handlesubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 50,
    marginBottom: 80,
  },
  input: {
    width: 300,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttoncontainer: {
    width: 80,
    height: 40,
    marginStart: 220,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default Login;

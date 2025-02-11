import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Locationscreen from './Locationscreen';

const Detailscreen = ({ route, navigation }) => {
  const { submittedText } = route.params || {};
  const [selectedValue, setSelectedValue] = useState("");
  const [submittedtext, setsubmittedtext] = useState("");


  const handleSubmit = () => {
    if (selectedValue) {
      setsubmittedtext(selectedValue);
      // Alert.alert("Route Submitted", `You selected: ${selectedValue}`);
      navigation.navigate("Locationscreen", { selectedroute: selectedValue, selectedname: submittedText })

      setSelectedValue("");
    } else {
      Alert.alert("No Selection", "Please select a route first.");
    }
  };

  return (
    <View>
      <Text style={styles.text}>Hello, {submittedText || "Guest"}!</Text>
      <Text style={styles.busNo}>Bus No: UPXX AC XXXX</Text>

      <Text style={styles.label}>Please select the route:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Please select an option..." value="" enabled={false} />
          <Picker.Item label="Route 1" value="Route 1" />
          <Picker.Item label="Route 2" value="Route 2" />
          <Picker.Item label="Route 3" value="Route 3" />
        </Picker>
      </View>


      <TouchableOpacity style={styles.buttoncontainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Route</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Detailscreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  busNo: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
    color: 'blue',
  },
  label: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 50,
  },
  pickerContainer: {
    marginLeft: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 20,
  },
  buttoncontainer: {
    width: '40%',   // Makes the button responsive
    height: 45, 
    // alignSelf: 'center',  // Centers button horizontally
    marginTop: 40,
    marginRight: 20, 
    marginLeft: 190,
    borderRadius: 10, 
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center', // Centers text inside button
    elevation: 5,  // Adds shadow effect on Android
    shadowColor: '#000',  // Adds shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
});

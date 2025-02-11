import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Ticketscreen from './Ticketscreen';

const Locationscreen = ({ route , navigation}) => {
  const { selectedroute, selectedname } = route.params || {};  

  // State variables for pickers
  const [boardingLocation, setBoardingLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");

  // Function to handle submit
  const handleSubmit = () => {
    if (!boardingLocation || !destinationLocation) {
      Alert.alert("Missing Selection", "Please select both Boarding and Destination locations.");
      return;
    } 
    else{
      navigation.navigate('Ticketscreen' , {name : selectedname , routename : selectedroute , boardingLocation : boardingLocation , destinationLocation : destinationLocation});
    }
    Alert.alert("Route Confirmed", `Boarding: ${boardingLocation}\nDestination: ${destinationLocation}`);
  };

  return (
    <View>
      <Text style={styles.text}>Hello, {selectedname || "Guest"}</Text>
      <Text style={styles.routeText}>Selected Route: {selectedroute}</Text>

      {/* Boarding Location Picker */}
      <Text style={styles.label}>Enter Boarding Location:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={boardingLocation}
          onValueChange={(itemValue) => setBoardingLocation(itemValue)}
        >
          <Picker.Item label="Please select an option..." value="" enabled={false} />
          <Picker.Item label="Location A" value="Location A" />
          <Picker.Item label="Location B" value="Location B" />
          <Picker.Item label="Location C" value="Location C" />
        </Picker>
      </View>

      {/* Destination Location Picker */}
      <Text style={styles.label}>Enter Destination Location:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={destinationLocation}
          onValueChange={(itemValue) => setDestinationLocation(itemValue)}
        >
          <Picker.Item label="Please select an option..." value="" enabled={false} />
          <Picker.Item label="Location X" value="Location X" />
          <Picker.Item label="Location Y" value="Location Y" />
          <Picker.Item label="Location Z" value="Location Z" />
        </Picker>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.buttoncontainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Locationscreen;

// Styles
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  routeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 20,
    marginLeft: 20,
  },
  label: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 50,
    fontWeight: 'bold',
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
    width: '40%',
    height: 45,
    // alignSelf: 'center',
    marginTop: 40,
    marginRight:20,
    marginLeft: 190,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Ticketscreen = ({ route }) => {
  const { name, routename, boardingLocation, destinationLocation } = route.params || {};

  // State for tickets and children count
  const [ticketCount, setTicketCount] = useState('');
  const [childCount, setChildCount] = useState('');

  // Function to handle numeric input
  const handleInputChange = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
    setter(numericValue);
  };

  const handleSubmit = () => {

    setTicketCount('');
    setChildCount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {name || 'Guest'}</Text>

      <Text style={styles.heading}>Please confirm the following details:</Text>

      <Text style={styles.routeName}>Route Name: {routename}</Text>

      <Text style={styles.locations}>
        {boardingLocation} ➝ {destinationLocation}
      </Text>

      {/* Ticket Input Row */}
      <View style={styles.ticketRow}>
        <Text style={styles.label}>No. of Tickets:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0"
          value={ticketCount}
          onChangeText={(value) => handleInputChange(value, setTicketCount)}
          maxLength={2}
        />
      </View>

      {/* Child Ticket Input Row */}
      <View style={styles.ticketRow}>
        <Text style={styles.label}>No. of Children:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0"
          value={childCount}
          onChangeText={(value) => handleInputChange(value, setChildCount)}
          maxLength={2}
        />
      </View>

      <Text style ={{marginTop:40 , fontSize:20, fontWeight:'bold'}}>Total Fare:    ₹...</Text>

      <TouchableOpacity style={styles.buttoncontainer} onPress={handleSubmit} >

        <Text style={styles.buttonText}>Submit Route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ticketscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  routeName: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20,
  },
  locations: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    width: 60,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'blue',
    textAlign: 'center',
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

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ticketscreen = ({ route }) => {
  const { name, routename, boardingLocation, destinationLocation, distance , busno} = route.params || {};
  const staticBusNumber = "AA"; // Static bus number for all requests

  const [ticketCount, setTicketCount] = useState('');
  const [childCount, setChildCount] = useState('');
  const [fare, setFare] = useState(0);

  const API_BASE_URL = 'http://192.168.211.234.6:8080/users';

  const handleInputChange = (value, setter, maxLimit) => {
    let numericValue = value.replace(/[^0-9]/g, '');
    let number = parseInt(numericValue) || 0;
    if (number > maxLimit) {
      Alert.alert("Limit Exceeded", `You cannot book more than ${maxLimit} tickets.`);
      number = maxLimit;
    }
    setter(number.toString());
  };

  const fareCalculator = () => {
    const tickets = parseInt(ticketCount) || 0;
    const children = parseInt(childCount) || 0;
    const parsedDistance = parseFloat(distance) || 0;

    const calculatedFare = parsedDistance * (tickets + (children / 2)) * 1.54;
    setFare(calculatedFare.toFixed(2));
  };

  useEffect(() => {
    fareCalculator();
  }, [ticketCount, childCount, distance]);

  const handleSubmit = async () => {
    Alert.alert(
      "Confirm Your Journey",
      `🚌 Bus: ${busno || "Unknown"}\n📍 From: ${boardingLocation}\n📍 To: ${destinationLocation}\n🎟️ Tickets: ${ticketCount}\n👶 Children: ${childCount}\n💰 Fare: ₹${fare}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              await axios.put(`${API_BASE_URL}/collect-ticket`, {
                busNo: busno,  // ✅ Now using passed bus number
                location: destinationLocation?.trim(),
                tickets: Number(ticketCount) || 0,
                children: Number(childCount) || 0,
              });
              console.log("✅ Ticket collected successfully");
            } catch (error) {
              console.error("❌ Error updating ticket collection:", error.response?.data || error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bus No : {busno || 'Guest'}</Text>
      <Text style={styles.heading}>Please confirm the following details:</Text>
      <Text style={styles.routeName}>Route Name: {routename}</Text>
      <Text style={styles.locations}>{boardingLocation} ➝ {destinationLocation}</Text>
      <View style={styles.ticketRow}>
        <Text style={styles.label}>No. of Tickets:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0"
          value={ticketCount}
          onChangeText={(value) => handleInputChange(value, setTicketCount, 8)}
          maxLength={2}
        />
      </View>
      <View style={styles.ticketRow}>
        <Text style={styles.label}>No. of Children:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0"
          value={childCount}
          onChangeText={(value) => handleInputChange(value, setChildCount, 8)}
          maxLength={2}
        />
      </View>
      <Text style={styles.fareText}>Total Fare: ₹ {fare}</Text>
      <TouchableOpacity style={styles.buttoncontainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ticketscreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginLeft: 20, paddingTop: 20 },
  text: { fontSize: 24, fontWeight: 'bold' },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 30 },
  routeName: { fontSize: 20, color: 'blue', fontWeight: 'bold', marginTop: 20 },
  locations: { fontSize: 20, color: 'blue', fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  ticketRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  input: { width: 60, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: 'blue', textAlign: 'center' },
  fareText: { marginTop: 40, fontSize: 20, fontWeight: 'bold', color: 'green' },
  buttoncontainer: { width: '40%', height: 45, marginTop: 40, marginLeft: 190, borderRadius: 10, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const GOOGLE_MAP_KEY = "AIzaSyCnpNJCA6Jo4tKgWzCYqo963XqBLQiVd_U";

const Locationscreen = ({ route }) => {
  const { selectedroute, busNumber } = route.params || {}; // ✅ Extract busNumber
  const navigation = useNavigation();
  
  const [boardingLocation, setBoardingLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  // Fetch distance from Google Maps Directions API
  const fetchDistance = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${GOOGLE_MAP_KEY}`
      );
      const data = await response.json();
      
      if (data.routes.length > 0) {
        const routeDistance = data.routes[0].legs[0].distance.text;
        setDistance(routeDistance);
      } else {
        Alert.alert("Error", "Could not fetch route distance.");
        setDistance(null);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get distance.");
      console.error(error);
    }
  };

  const handleLocationSelect = (type, data, details) => {
    const location = {
      name: data.structured_formatting.main_text,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
    };

    if (type === "boarding") {
      setBoardingLocation(location);
      if (destinationLocation) fetchDistance(location, destinationLocation);
    } else {
      setDestinationLocation(location);
      if (boardingLocation) fetchDistance(boardingLocation, location);
    }
  };

  const handleSubmit = () => {
    if (!boardingLocation || !destinationLocation || !distance) {
      Alert.alert("Error", "Please select both locations.");
      return;
    }
    
    navigation.navigate("Ticketscreen", {
      boardingLocation: boardingLocation.name,
      destinationLocation: destinationLocation.name,
      distance: distance,
      busno:busNumber,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bus No: {busNumber || 'Unknown'}</Text> 

      <Text style={styles.label}>Enter Boarding Location:</Text>
      <GooglePlacesAutocomplete
        placeholder="Search City"
        query={{ key: GOOGLE_MAP_KEY, types: "(cities)" }}
        fetchDetails={true}
        onPress={(data, details) => handleLocationSelect("boarding", data, details)}
        styles={autoCompleteStyles}
      />

      <Text style={styles.label}>Enter Destination Location:</Text>
      <GooglePlacesAutocomplete
        placeholder="Search City"
        query={{ key: GOOGLE_MAP_KEY, types: "(cities)" }}
        fetchDetails={true}
        onPress={(data, details) => handleLocationSelect("destination", data, details)}
        styles={autoCompleteStyles}
      />

      {distance && <Text style={styles.distanceText}>Distance: {distance}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Locationscreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  text: { fontSize: 24, fontWeight: 'bold' },
  routeText: { fontSize: 20, fontWeight: 'bold', color: 'blue', marginTop: 10 },
  label: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
  distanceText: { fontSize: 18, marginTop: 10, fontWeight: 'bold', color: 'green' },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

const autoCompleteStyles = {
  container: { flex: 0, marginTop: 10 },
  textInput: { height: 50, fontSize: 16 },
};

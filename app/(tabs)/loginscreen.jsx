import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.BASE_URL;





const LoginScreen = ({ navigation }) => {
  const [busNumber, setBusNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let locationInterval;
    if (busNumber) {
      locationInterval = setInterval(updateLocation, 20000); // Update location every 10 seconds
    }
    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [busNumber]);

  const loginUser = async () => {
    if (!busNumber || !password) {
      Alert.alert("Error", "Please enter both bus number and password.");
      return;
    }

    if (password !== "1111") {
      Alert.alert("Error", "Incorrect password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users/login`, { // ✅ Fixed API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ busNo: busNumber, userid: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Store bus number for location updates
      await AsyncStorage.setItem("busNumber", busNumber);

      // ✅ Update location immediately after login
      await updateLocation();

      // ✅ Navigate to Location Screen
      navigation.navigate("Locationscreen", { busNumber });

    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async () => {
    let storedBusNumber = await AsyncStorage.getItem("busNumber");
    if (!storedBusNumber) return;
  
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please enable location services in settings.");
      return;
    }
  
    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      let { latitude, longitude } = location.coords;

      // ✅ Fixed API method (PUT instead of POST)
      await fetch(`${BASE_URL}/users/update-location`, { 
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          busNumber: storedBusNumber,
          latitude,
          longitude,
        }),
      });

      console.log(`Updated location for ${storedBusNumber}: (${latitude}, ${longitude})`);
    } catch (error) {
      console.error("Error updating location:", error.message || error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Bus Login</Text>

      <TextInput
        placeholder="Enter Bus Number"
        value={busNumber}
        onChangeText={setBusNumber}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      {loading ? <ActivityIndicator size="large" color="blue" /> : <Button title="Login" onPress={loginUser} />}
    </View>
  );
};

export default LoginScreen;

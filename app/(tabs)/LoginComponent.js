import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [busNumber, setBusNumber] = useState(null);

  useEffect(() => {
    const fetchBusNumber = async () => {
      const storedBusNo = await AsyncStorage.getItem("busNumber");
      setBusNumber(storedBusNo);
    };

    fetchBusNumber();

    let locationInterval;

    const startLocationUpdates = async () => {
      setErrorMsg(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied. Enable location access.");
        setLoading(false);
        return;
      }

      getLocation();
      locationInterval = setInterval(getLocation, 10000);
    };

    const getLocation = async () => {
      try {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation(location.coords);
        updateLocationInDatabase(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        setErrorMsg("Error fetching location. Make sure GPS is enabled.");
      }
      setLoading(false);
    };

    const updateLocationInDatabase = async (latitude, longitude) => {
      console.log(`Updating location: ${latitude}, ${longitude}`);
      if (!busNumber) return;
      try {
        await fetch("http://192.168.57.6:8080/users/update-location", { 
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ busNumber, latitude, longitude }),
        });
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    startLocationUpdates();

    return () => clearInterval(locationInterval);
  }, [busNumber]);

  return (
    <View style={{ padding: 20 }}>
      <Text>GPS Coordinates</Text>
      {loading ? <ActivityIndicator size="large" color="blue" /> : location && <Text>Lat: {location.latitude}, Lon: {location.longitude}</Text>}
    </View>
  );
};

export default LocationScreen;

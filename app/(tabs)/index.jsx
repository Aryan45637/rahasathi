
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import loginscreen from "./loginscreen";
import detailscreen from "./detailscreen";
import Locationscreen from "./Locationscreen";
import Ticketscreen from "./Ticketscreen";  
import SplashScreen from "./SplashScreen";


const Stack = createStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />

        <Stack.Screen name="loginscreen" component={loginscreen} />
        <Stack.Screen name="detailscreen" component={detailscreen} />
        <Stack.Screen name="Locationscreen" component={Locationscreen} />
        <Stack.Screen name ="Ticketscreen" component ={Ticketscreen} />

      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;

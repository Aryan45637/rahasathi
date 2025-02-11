import React, { useEffect } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    if (!navigation) {
      console.error("Navigation prop is undefined in SplashScreen.");
      return;
    }

    const timer = setTimeout(() => {
      navigation.replace('loginscreen'); // Change to your home screen name
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={require('../../assets/images/rahasathi.png')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',      
    backgroundColor: '#fff',   
  },

  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',  
    alignSelf: 'center',   
  }
});

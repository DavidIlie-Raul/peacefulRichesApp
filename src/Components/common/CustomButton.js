import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ title, destination, url }) => {
  const [buttonColor, setButtonColor] = useState('black');
  const navigation = useNavigation();
  const handleButtonPress = () => {
    
    if (destination === '') { console.log('The ' + title + ' button has no destination set')};
    if (url === '') { console.log('The ' + title + ' button has no url set')};
    if (url !== '' && destination === '') { 
        
        console.log('This button has a url and no destination, redirecting to url! URL:' + url);
        Linking.openURL(url);

    } else if (destination !== '' && url === '') {


        console.log('This button has a destination and no url, redirecting to destination! Destination: ' + destination);
        navigation.navigate(destination);

    };


  };

  const pressFunctionality = () => {



  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={handleButtonPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

export default CustomButton;

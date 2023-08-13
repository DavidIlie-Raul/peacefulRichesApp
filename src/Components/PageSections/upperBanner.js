import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';



const UpperBanner = () => {
return(
    


     <LinearGradient colors={['#D954E5', '#82B4F9']} style={[styles.gradientBackground, {width: Dimensions.get('window').width}]}>
        
         <Image style={styles.bigBannerImage} source={require('../../images/Varianta2-12.png')}></Image>
         <Text style={styles.title}>PEACEFUL RICHES</Text>
        
     </LinearGradient>


)};

const styles = StyleSheet.create({

    gradientBackground: {
height: Dimensions.get('window').height * 0.35,
justifyContent: 'center',
alignItems: 'center',


},

bigBannerImage: {

    maxWidth: 150,
    maxHeight: 150,
    resizeMode: 'center',
    marginTop: '0%',
    
      },

title: {
fontSize: 25,
marginTop: '3%',
color: 'white',
fontFamily: 'Nimbus-Sans-Bold',

},
});

export default UpperBanner;
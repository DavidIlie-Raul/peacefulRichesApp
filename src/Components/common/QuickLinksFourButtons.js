import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';

import CustomButton from './CustomButton';

const QuickLinksFourButtons = () => {

    

  return (
    <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Image source={require('../../images/image1.png')} style={styles.image} />
            <TouchableOpacity>
            <CustomButton title={'WebSite'} url={'http://www.peacefulriches.com'} destination={''}></CustomButton>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <Image source={require('../../images/discordLogo.jpg')} style={styles.image} />
            <CustomButton title={'Discord'} url={'https://discord.gg/TZmha3AUzW'} destination={''}></CustomButton>
          </View>
          <View style={styles.gridItem}>
            <Image source={require('../../images/newsIconImage.jpg')} style={styles.image} />
            <CustomButton title={'News'} destination={'News'} url={''}></CustomButton>
          </View>
          <View style={styles.gridItem}>
            <Image source={require('../../images/bookIconImage.png')} style={styles.image} />
            <CustomButton title={'Courses'} destination={'Course'} url={''}></CustomButton>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {



  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '40%',
    aspectRatio: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  
});

export default QuickLinksFourButtons;

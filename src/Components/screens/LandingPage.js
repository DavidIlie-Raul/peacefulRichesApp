import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, VirtualizedList } from 'react-native';
import QuickLinksFourButtons from '../common/QuickLinksFourButtons';
import UpperBanner from '../PageSections/upperBanner';


const LandingPage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
      
      <View style={styles.upperContainer}>
      <UpperBanner></UpperBanner>
      </View>
        
      <View style={styles.lowerContainer}>
    
    <View style={styles.textBox}>
          <Text style={styles.textBoxText}>Welcome to the Peaceful Riches Community! </Text>
          <Text style={styles.textBoxTextTwo}>Let's get you started!</Text>
          </View>
      </View>
      <View style={styles.buttonContainer}>
    <QuickLinksFourButtons></QuickLinksFourButtons>
    </View>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },

  lowerContainer: {
    
    alignItems: 'center',
    
  },

  buttonContainer: {

marginTop: 100,

  },
    
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
  },
  textBox: {
    width: '80%',
    height: 80,
    backgroundColor: 'transparent',
    marginTop: 32,
    textAlign: 'center',
    height: 150,
  },
  textBoxText: {
    height: '100%',
    textAlign: 'center',
    fontFamily: 'Nimbus-Sans-Bold',
    fontSize: 22,
    color: '#707070',
  },
  textBoxTextTwo: {
    height: '100%',
    textAlign: 'center',
    fontFamily: 'Nimbus-Sans-Bold',
    fontSize: 22,
    color: '#707070',
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
    resizeMode: 'stretch',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bigBannerImage: {

maxWidth: '95%',
maxHeight: 200,
resizeMode: 'center',
marginTop: '10%',

  },
});

export default LandingPage;

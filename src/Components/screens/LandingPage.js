import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import QuickLinksFourButtons from '../common/QuickLinksFourButtons';

const LandingPage = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image style={styles.bigBannerImage} source={require('../../images/Varianta2-10.png')}></Image>
      <Text style={styles.title}>Welcome to the Peaceful Riches App!</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textBox}>
          <Text style={styles.textBoxText}>Welcome to the Peaceful Riches App! 
          Below you can see some information about the app to get you started!
          And a few links!
          
          </Text>
        </View>
        <QuickLinksFourButtons></QuickLinksFourButtons>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'whitesmoke',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 32,
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
    borderRadius: 8,
    backgroundColor: 'whitesmoke',
    marginVertical: 32,
    textAlign: 'center',
  },
  textBoxText: {
    textAlign: 'center',
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

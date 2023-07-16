import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Self-Development Course App!</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textBox}>
          {/* Add your text input component here */}
        </View>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Image source={require('../../images/image1.png')} style={styles.image} />
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Button 1</Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <Image source={require('../../images/image2.png')} style={styles.image} />
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Button 2</Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <Image source={require('../../images/image3.png')} style={styles.image} />
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Button 3</Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <Image source={require('../../images/image4.png')} style={styles.image} />
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Button 4</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginVertical: 32,
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
});

export default LandingPage;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here we will have the News and Announcements!</Text>
      {/* Add your content for the landing page here */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default NewsPage;
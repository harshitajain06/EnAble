import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Care Page</Text>
    </View>
  );
};

export default CarePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

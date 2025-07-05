import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

        {/* Title and Subtitle */}
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>EnAble</Text>
        <Text style={styles.author}>Created by Shaunak Soni</Text>
        <Text style={styles.description}>
          EnAble is a mobile app that helps individuals with disabilities easily find accessible
          housing. It features listings of disability-friendly homes and shows nearby
          transportation, hospitals, and essential services. EnAble empowers users to make safe,
          informed decisions that support mobility and independence.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#567396',
  },
  subtitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
  },
  author: {
    fontSize: 16,
    color: '#567396',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#567396',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomePage;

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

        {/* Title and Subtitle */}
        <Text style={styles.subtitle}>About EnAble</Text>
        <Text style={styles.author}>Created by Shaunak Soni</Text>

        {/* Description */}
        <Text style={styles.description}>
          EnAble is a mobile app that helps individuals with disabilities easily find accessible
          housing. It features listings of disability-friendly homes and shows nearby transportation, 
          hospitals, and essential services. EnAble empowers users to make safe, informed decisions 
          that support mobility and independence.
        </Text>

        <Text style={styles.description}>
          EnAble started with a single interaction. During my time volunteering at a local hospital, 
          I grew close with a quadriplegic patient who shared his challenges and experiences with me. 
          Soon, as he started getting better, he began searching for a new place to stay. However, 
          we found that the search was not easy, as finding houses that fit his accessibility needs 
          proved to be a challenge. It was this experience that gave me the motivation to begin developing EnAble.
        </Text>

        <Text style={styles.description}>
          However, the obstacles he and others with disabilities face go much beyond just housing. 
          The mission with EnAble is to create a hub to make the world more accessible for those with disabilities. 
          Thank you for being a part of this mission by using EnAble!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCE9FE',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
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
    fontSize: 14,
    color: '#567396',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#567396',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default HomePage;

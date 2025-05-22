import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase'; // adjust if path differs

const CarePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchCareServices = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'careServices'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(data);
      } catch (error) {
        console.error('Error fetching care services:', error);
      }
    };

    fetchCareServices();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.serviceName}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.serviceLink)}>
        <Text style={styles.link}>View Location</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Care Services</Text>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CarePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

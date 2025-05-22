import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust if your path differs

const TransportPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'transportServices'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(data);
      } catch (error) {
        console.error('Error fetching transport services:', error);
      }
    };

    fetchServices();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.serviceName}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.serviceLink)}>
        <Text style={styles.link}>Open Service</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transport Services</Text>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default TransportPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

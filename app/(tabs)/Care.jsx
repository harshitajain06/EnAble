import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Linking, Platform, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

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

      {Platform.OS === 'web' ? (
        <TouchableOpacity onPress={() => window.open(item.serviceLink, '_blank')}>
          <Text style={styles.link}>Open Service</Text>
        </TouchableOpacity>
      ) : (
        <WebView
          source={{ uri: item.serviceLink }}
          style={styles.mapView}
        />
      )}
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
    marginBottom: 20,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  mapView: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

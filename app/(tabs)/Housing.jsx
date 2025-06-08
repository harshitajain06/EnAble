import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const HousingPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'housingListings'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{item.address}</Text>
      <View style={styles.row}>
        <FontAwesome5 name="bed" size={16} color="#555" />
        <Text style={styles.detail}>Bed: {item.bed}</Text>
        <FontAwesome5 name="bath" size={16} color="#555" style={styles.iconSpacing} />
        <Text style={styles.detail}>Bath: {item.bath}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="attach-money" size={18} color="#555" />
        <Text style={styles.detail}>Rent: {item.rent}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="document-scanner" size={18} color="#555" />
        <Text style={styles.detail}>Deposit: {item.deposit}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="content-paste" size={18} color="#555" />
        <Text style={styles.detail}>Application Fees: {item.applicationFees}</Text>
      </View>
      {/*
      <View style={styles.row}>
        <MaterialIcons name="calendar-today" size={18} color="#555" />
        <Text style={styles.detail}>Lease: {item.lease}</Text>
      </View>
      */}
      
      <View style={styles.row}>
        <MaterialIcons name="accessible" size={18} color="#555" />
        <Text style={styles.detail}>Accessibility: {item.accessibility}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="elderly" size={18} color="#555" />
        <Text style={styles.detail}>Age Requirement: {item.ageRequirement}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="money" size={18} color="#555" />
        <Text style={styles.detail}>Income Requirement: {item.incomeRequirement}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="pets" size={18} color="#555" />
        <Text style={styles.detail}>Pets: {item.pets}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="person" size={18} color="#555" />
        <Text style={styles.detail}>Contact Name: {item.contactName}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="phone" size={18} color="#555" />
        <Text style={styles.link} onPress={() => handleCall(item.contactPhone)}>
          {item.contactPhone}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="email" size={18} color="#555" />
        <Text style={styles.link} onPress={() => handleEmail(item.contactEmail)}>
          {item.contactEmail}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default HousingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    flexWrap: 'wrap',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginLeft: 6,
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  iconSpacing: {
    marginLeft: 16,
  },
});

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const HousingPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [selectedBed, setSelectedBed] = useState('Any');
  const [selectedBath, setSelectedBath] = useState('Any');
  const [applicationFeesFilter, setApplicationFeesFilter] = useState('Any');
  const [accessibilityFilter, setAccessibilityFilter] = useState('Any');
  const [ageRequirementFilter, setAgeRequirementFilter] = useState('Any');
  const [incomeRequirementFilter, setIncomeRequirementFilter] = useState('Any');
  const [petsFilter, setPetsFilter] = useState('Any');
  const [parkingFilter, setParkingFilter] = useState('Any');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'housingListings'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [
    selectedBed,
    selectedBath,
    applicationFeesFilter,
    accessibilityFilter,
    ageRequirementFilter,
    incomeRequirementFilter,
    petsFilter,
    parkingFilter,
  ]);

  const filterListings = () => {
    let filtered = listings;

    if (selectedBed !== 'Any') {
      filtered = filtered.filter(item => Number(item.bed) === Number(selectedBed));
    }

    if (selectedBath !== 'Any') {
      filtered = filtered.filter(item => Number(item.bath) === Number(selectedBath));
    }

    if (applicationFeesFilter !== 'Any') {
      filtered = filtered.filter(item =>
        applicationFeesFilter === 'Yes'
          ? Number(item.applicationFees) > 0
          : Number(item.applicationFees) === 0
      );
    }

    if (accessibilityFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.accessibility?.toLowerCase().includes(accessibilityFilter.toLowerCase())
      );
    }

    if (ageRequirementFilter !== 'Any') {
      filtered = filtered.filter(
        item =>
          String(item.ageRequirement).toLowerCase() === ageRequirementFilter.toLowerCase()
      );
    }

    if (incomeRequirementFilter !== 'Any') {
      filtered = filtered.filter(
        item =>
          String(item.incomeRequirement).toLowerCase() === incomeRequirementFilter.toLowerCase()
      );
    }

    if (petsFilter !== 'Any') {
      filtered = filtered.filter(
        item => String(item.pets).toLowerCase() === petsFilter.toLowerCase()
      );
    }

    if (parkingFilter !== 'Any') {
      filtered = filtered.filter(item =>
        item.accessibility?.toLowerCase().includes(parkingFilter.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
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
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Button title="Filters" onPress={() => setModalVisible(true)} />
          </View>
        }
        data={filteredListings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Filters Modal */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Listings</Text>

          <Text style={styles.filterLabel}>Bed</Text>
          <Picker selectedValue={selectedBed} onValueChange={setSelectedBed}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4+" value="4" />
          </Picker>

          <Text style={styles.filterLabel}>Bath</Text>
          <Picker selectedValue={selectedBath} onValueChange={setSelectedBath}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3+" value="3" />
          </Picker>

          <Text style={styles.filterLabel}>Application Fees</Text>
          <Picker selectedValue={applicationFeesFilter} onValueChange={setApplicationFeesFilter}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>

          <Text style={styles.filterLabel}>Accessibility</Text>
          <Picker selectedValue={accessibilityFilter} onValueChange={setAccessibilityFilter}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="No Step Entrance" value="No Step Entrance" />
            <Picker.Item label="Grab Bars" value="Grab Bars" />
            <Picker.Item label="Lever Handles" value="Lever Handles" />
          </Picker>

          <Text style={styles.filterLabel}>Age Requirement</Text>
          <Picker selectedValue={ageRequirementFilter} onValueChange={setAgeRequirementFilter}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>

          <Text style={styles.filterLabel}>Income Requirement</Text>
          <Picker selectedValue={incomeRequirementFilter} onValueChange={setIncomeRequirementFilter}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>

          <Text style={styles.filterLabel}>Pets</Text>
          <Picker selectedValue={petsFilter} onValueChange={setPetsFilter}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>

          <Text style={styles.filterLabel}>Parking</Text>
          <Picker selectedValue={parkingFilter} onValueChange={setParkingFilter}>
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Off Street" value="off street" />
            <Picker.Item label="Infront of Unit" value="infront of unit" />
            <Picker.Item label="On Street" value="on street" />
          </Picker>

          <View style={{ marginVertical: 20 }}>
            <Button title="Apply Filters" onPress={() => setModalVisible(false)} />
          </View>
          <Button title="Close" color="gray" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

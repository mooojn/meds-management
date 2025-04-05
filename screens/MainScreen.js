import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import database from '../database/database';

const MainScreen = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMedicines();
    });

    // Initial load
    loadMedicines();

    // Cleanup the listener on unmount
    return unsubscribe;
  }, [navigation]);

  // Function to load medicines from the database
  const loadMedicines = async () => {
    try {
      const meds = await database.getAllMedicines();
      setMedicines(meds);
    } catch (error) {
      Alert.alert('Error', 'Failed to load medicines');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    navigation.navigate('CreateMedicine');
  };

  const handleViewDetails = (medicine) => {
    navigation.navigate('MedicineDetails', { medicine });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading medicines...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Management System</Text>

      <TouchableOpacity style={styles.createButton} onPress={handleAdd}>
        <Text style={styles.createButtonText}>Create New Medicine</Text>
      </TouchableOpacity>

      <FlatList
        data={medicines}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.brand}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#36B1F0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainScreen;

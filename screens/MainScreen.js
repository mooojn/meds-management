import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '../database/database';

const MainScreen = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [priceFilter, setPriceFilter] = useState('');
  const [priceCondition, setPriceCondition] = useState('>');
  const [expiryYearFilter, setExpiryYearFilter] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMedicines();
    });

    loadMedicines();
    return unsubscribe;
  }, [navigation]);

  const loadMedicines = async () => {
    try {
      const meds = await database.getAllMedicines();
      setMedicines(meds);
      setFilteredMedicines(meds);
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

  const applyFilters = () => {
    let filtered = [...medicines];

    if (priceFilter.trim()) {
      const priceVal = parseFloat(priceFilter);
      filtered = filtered.filter(med =>
        priceCondition === '>' ? med.price > priceVal : med.price < priceVal
      );
    }

    if (expiryYearFilter.trim()) {
      filtered = filtered.filter(med => {
        const year = parseInt(med.best_before?.slice(0, 4));
        return year > parseInt(expiryYearFilter);
      });
    }

    setFilteredMedicines(filtered);
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

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Price"
          value={priceFilter}
          onChangeText={setPriceFilter}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.toggleButton, priceCondition === '>' ? styles.active : null]}
          onPress={() => setPriceCondition('>')}
        >
          <Text style={[styles.toggleButtonText, priceCondition === '>' ? styles.activeText : null]}>{'Above'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, priceCondition === '<' ? styles.active : null]}
          onPress={() => setPriceCondition('<')}
        >
          <Text style={[styles.toggleButtonText, priceCondition === '<' ? styles.activeText : null]}>{'Below'}</Text>
        </TouchableOpacity>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={expiryYearFilter}
            onValueChange={(value) => setExpiryYearFilter(value)}
            style={styles.picker}
          >
            <Picker.Item label="Expiry Year >" value="" />
            {Array.from({ length: 26 }, (_, i) => 2025 + i).map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year.toString()} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleAdd}>
        <Text style={styles.createButtonText}>Create New Medicine</Text>
      </TouchableOpacity>

      {filteredMedicines.length === 0 ? (
        <Text style={styles.noMedicinesText}>No medicines available with the applied filters</Text>
      ) : (
        <FlatList
          data={filteredMedicines}
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
      )}
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
    marginBottom: 10,
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 45,
  },
  filterInput: {
    flexBasis: '55%',
    marginRight: 5,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  toggleButton: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: '#67c8ff',
  },
  toggleButtonText: {
    color: '#333',
  },
  activeText: {
    color: 'white',
  },
  filterButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    width: 120,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  noMedicinesText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
  },
});

export default MainScreen;

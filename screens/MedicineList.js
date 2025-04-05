import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import database from '../database/database';
import { useNavigation } from '@react-navigation/native';

const MedicineListScreen = () => {
  const [medicines, setMedicines] = useState([]);
  const navigation = useNavigation();

  const fetchMedicines = async () => {
    try {
      const loadedMedicines = await database.getAllMedicines(); 
      setMedicines(loadedMedicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    fetchMedicines(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine List</Text>
      <FlatList
        data={medicines}
        renderItem={({ item }) => (
          <View style={styles.medicineItem}>
            <Text style={styles.medicineText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateMedicine', { refreshMedicines: fetchMedicines })}
      >
        <Text style={styles.addButtonText}>Add New Medicine</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  medicineItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  medicineText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#28A125',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MedicineListScreen;

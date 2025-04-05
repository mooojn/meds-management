import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import database from '../database/database';

const MedicineDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { medicine } = route.params;

  const [currentMedicine, setCurrentMedicine] = useState(medicine);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMedicine = async () => {
        try {
          const updatedMedicine = await database.getMedicineByName(currentMedicine.name);
          setCurrentMedicine(updatedMedicine);
        } catch (error) {
          console.error('Error fetching medicine details', error);
        }
      };

      fetchMedicine();

      return () => {
      };
    }, [currentMedicine.name])
  );

  const handleDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this medicine?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await database.deleteMedicine(currentMedicine.name);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete medicine');
            console.error(error);
          }
        },
      },
    ]);
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateMedicine', { medicineName: currentMedicine.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Details</Text>

      <Text style={styles.label}>Name: <Text style={styles.value}>{currentMedicine.name}</Text></Text>
      <Text style={styles.label}>Brand: <Text style={styles.value}>{currentMedicine.brand}</Text></Text>
      <Text style={styles.label}>Type: <Text style={styles.value}>{currentMedicine.type}</Text></Text>
      <Text style={styles.label}>Price: <Text style={styles.value}>${currentMedicine.price}</Text></Text>
      <Text style={styles.label}>Quantity: <Text style={styles.value}>{currentMedicine.quantity}</Text></Text>
      <Text style={styles.label}>Expiry Date: <Text style={styles.value}>{currentMedicine.best_before}</Text></Text>
      <Text style={styles.label}>Date of Entry: <Text style={styles.value}>{currentMedicine.date_of_entry}</Text></Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontWeight: 'normal',
    fontSize: 18,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#67c8ff',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4136',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MedicineDetails;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import database from '../database/database';

const MedicineDetails = ({ route, navigation }) => {
  const { medicine } = route.params;

  const handleDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this medicine?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await database.deleteMedicine(medicine.name);
            navigation.goBack(); // Navigate back to the main screen after deletion
          } catch (error) {
            Alert.alert('Error', 'Failed to delete medicine');
            console.error(error);
          }
        },
      },
    ]);
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateMedicine', { medicineName: medicine.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Details</Text>

      <Text style={styles.label}>Name: <Text style={styles.value}>{medicine.name}</Text></Text>
      <Text style={styles.label}>Brand: <Text style={styles.value}>{medicine.brand}</Text></Text>
      <Text style={styles.label}>Type: <Text style={styles.value}>{medicine.type}</Text></Text>
      <Text style={styles.label}>Price: <Text style={styles.value}>${medicine.price}</Text></Text>
      <Text style={styles.label}>Quantity: <Text style={styles.value}>{medicine.quantity}</Text></Text>
      <Text style={styles.label}>Expiry Date: <Text style={styles.value}>{medicine.best_before}</Text></Text>
      <Text style={styles.label}>Date of Entry: <Text style={styles.value}>{medicine.date_of_entry}</Text></Text>

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
    backgroundColor: '#FFA500',
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

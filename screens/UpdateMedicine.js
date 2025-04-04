import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import database from '../database/database';

const UpdateMedicine = ({ navigation, route }) => {
  const { medicineName } = route.params;
  const [medicine, setMedicine] = useState(null);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadMedicine = async () => {
      try {
        const loadedMedicine = await database.getMedicineByName(medicineName);
        if (loadedMedicine) {
          setMedicine(loadedMedicine);
          setName(loadedMedicine.name);
          setBrand(loadedMedicine.brand);
          setType(loadedMedicine.type);
          setPrice(loadedMedicine.price.toString());
          setQuantity(loadedMedicine.quantity.toString());
          setExpiryDate(loadedMedicine.best_before || loadedMedicine.expiryDate || '');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load medicine');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicine();
  }, [medicineName]);

  const handleUpdateMedicine = async () => {
    console.log('Update button pressed');

    if (!name.trim() || !brand.trim() || !type.trim() || !price.trim() || !quantity.trim() || !expiryDate.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const updatedMedicine = {
      name,
      brand,
      type,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      date_of_entry: medicine.date_of_entry || new Date().toISOString(), // fallback
      best_before: expiryDate,
    };

    try {
      setIsSubmitting(true);
      database.updateMedicine(medicine.name, updatedMedicine); // Ensure correct method
      console.log('Update attempted:', updatedMedicine);
      Alert.alert('Success', 'Medicine updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update medicine');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading medicine details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Medicine</Text>

      <TextInput style={styles.input} placeholder="Medicine Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Brand" value={brand} onChangeText={setBrand} />
      <TextInput style={styles.input} placeholder="Type" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Expiry Date (YYYY-MM-DD)" value={expiryDate} onChangeText={setExpiryDate} />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateMedicine} disabled={isSubmitting}>
        <Text style={styles.saveButtonText}>{isSubmitting ? 'Updating...' : 'Update Medicine'}</Text>
      </TouchableOpacity>
    </ScrollView>
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
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#28A125',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UpdateMedicine;

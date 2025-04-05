import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import database from '../database/database';

const CreateMedicineScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [bestBefore, setBestBefore] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveMedicine = async () => {
    if (!name.trim() || !brand.trim() || !price.trim() || !quantity.trim() || !type.trim()) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const dateOfEntry = new Date().toISOString();

      await database.addMedicine({
        name,
        brand,
        price: parseFloat(price),
        best_before: bestBefore,
        quantity: parseInt(quantity, 10),
        type,
        description,
        date_of_entry: dateOfEntry,
      });

      Alert.alert('Success', 'Medicine added successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add medicine.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Add New Medicine</Text>

          <Text style={styles.label}>Medicine Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Medicine Name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Brand</Text>
          <TextInput
            style={styles.input}
            placeholder="Brand"
            value={brand}
            onChangeText={setBrand}
          />

          <Text style={styles.label}>Price ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Price ($)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Best Before (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            placeholder="Best Before (YYYY-MM-DD)"
            value={bestBefore}
            onChangeText={setBestBefore}
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Type"
            value={type}
            onChangeText={setType}
          />

          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveMedicine}
            disabled={isSubmitting}
          >
            <Text style={styles.saveButtonText}>
              {isSubmitting ? 'Saving...' : 'Save Medicine'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
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
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateMedicineScreen;

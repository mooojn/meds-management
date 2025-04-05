import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MedicineType = ({ selectedType, onTypeChange }) => {
  const medicineTypes = ['Tablet', 'Capsule', 'Syrup', 'Cream', 'Injection'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Medicine Type</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => onTypeChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Medicine Type" value="" />
          {medicineTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  pickerWrapper: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default MedicineType;

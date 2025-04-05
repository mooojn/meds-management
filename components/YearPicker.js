// components/YearPicker.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const YearPicker = ({ selectedYear, onYearChange }) => {
  const years = Array.from({ length: 26 }, (_, i) => 2025 + i);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Best Before Year</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => onYearChange(itemValue)}
        >
          <Picker.Item label="Select Year" value="" />
          {years.map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
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

export default YearPicker;

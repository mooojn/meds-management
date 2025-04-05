import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import database from '../database/database';

const ViewMedicines = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const meds = await database.getAllMedicines();
        setMedicines(meds);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicines List</Text>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.name} 
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.medName}>{item.name} ({item.brand})</Text>
            <Text>Type: {item.type}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Best Before: {item.bestBefore}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  medName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ViewMedicines;

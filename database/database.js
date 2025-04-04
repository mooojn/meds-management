import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('medicinesMS.db');

// Execute a query with given SQL, parameters, and write operation flag
const executeQuery = (sql, params = [], isWrite = false) => {
  try {
    if (isWrite) {
      return db.runSync(sql, params);
    } else {
      return db.getAllSync(sql, params);
    }
  } catch (error) {
    console.error('SQL Error:', sql, error);
    throw error;
  }
};

// Initialize database and create medicines table if not exists
const initializeDatabase = async () => {
  const schema = [
    `CREATE TABLE IF NOT EXISTS medicines (
      name TEXT NOT NULL PRIMARY KEY,  
      brand TEXT NOT NULL,
      date_of_entry TEXT NOT NULL,
      price REAL NOT NULL,
      best_before TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      type TEXT NOT NULL
    )`
  ];

  try {
    for (const query of schema) {
      executeQuery(query, [], true);
    }
    console.log('Medicines table initialized');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

// Function to add a new medicine to the table
const addMedicine = (medicine) => {
  const { name, brand, date_of_entry, price, best_before, quantity, type } = medicine;
  try {
    executeQuery(
      'INSERT INTO medicines (name, brand, date_of_entry, price, best_before, quantity, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, brand, date_of_entry, price, best_before, quantity, type],
      true
    );
    console.log('Medicine added:', medicine);
  } catch (error) {
    console.error('Error adding medicine:', error);
  }
};

// Function to update an existing medicine's details based on name
const updateMedicine = (originalName, medicine) => {
  const { name, brand, date_of_entry, price, best_before, quantity, type } = medicine;
  try {
    executeQuery(
      'UPDATE medicines SET name = ?, brand = ?, date_of_entry = ?, price = ?, best_before = ?, quantity = ?, type = ? WHERE name = ?',
      [name, brand, date_of_entry, price, best_before, quantity, type, originalName],
      true
    );
    console.log('Medicine updated:', medicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
  }
};


// Function to delete a medicine by its name
const deleteMedicine = (name) => {
  try {
    executeQuery('DELETE FROM medicines WHERE name = ?', [name], true);
    console.log('Medicine deleted with name:', name);
  } catch (error) {
    console.error('Error deleting medicine:', error);
  }
};

// Function to retrieve all medicines from the table
const getAllMedicines = () => {
  try {
    const result = executeQuery('SELECT * FROM medicines');
    return result;
  } catch (error) {
    console.error('Error fetching medicines:', error);
  }
};

// Function to get a medicine by its name
const getMedicineByName = (name) => {
  try {
    const result = executeQuery('SELECT * FROM medicines WHERE name = ?', [name]);
    return result[0]; // Assuming there is only one result for a unique name
  } catch (error) {
    console.error('Error fetching medicine:', error);
  }
};

// Function to search medicines by a specific field (e.g., name, type)
const searchMedicines = (field, value) => {
  try {
    const result = executeQuery(`SELECT * FROM medicines WHERE ${field} = ?`, [value]);
    return result;
  } catch (error) {
    console.error('Error searching medicines:', error);
  }
};

// Initialize test data if the medicines table is empty
const initializeTestData = () => {
  try {
    const result = executeQuery('SELECT COUNT(*) as count FROM medicines');
    if (result[0].count === 0) {
      // Insert sample medicine records if no records exist
      executeQuery(
        'INSERT INTO medicines (name, brand, date_of_entry, price, best_before, quantity, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Paracetamol', 'Brand A', '2025-04-03', 10.99, '2026-04-03', 100, 'Tablet'],
        true
      );
      executeQuery(
        'INSERT INTO medicines (name, brand, date_of_entry, price, best_before, quantity, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Aspirin', 'Brand B', '2025-04-03', 5.49, '2026-04-03', 200, 'Tablet'],
        true
      );
      executeQuery(
        'INSERT INTO medicines (name, brand, date_of_entry, price, best_before, quantity, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Amoxicillin', 'Brand C', '2025-04-03', 12.75, '2026-04-03', 50, 'Capsule'],
        true
      );
      console.log('Test data initialized');
    }
    return true;
  } catch (error) {
    console.error('Error initializing test data:', error);
  }
};

// Initialize the database
const database = {
  isInitialized: false,

  ensureInitialized() {
    if (!this.isInitialized) {
      this.initializeDatabase();
      this.isInitialized = true;
    }
  },

  initializeDatabase,
  initializeTestData,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getAllMedicines,
  getMedicineByName,
  searchMedicines
};

export default database;

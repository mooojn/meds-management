import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

import database from './database/database';

import MainScreen from './screens/MainScreen';
import ViewMedicines from './screens/ViewMedicines';
import UpdateMedicine from './screens/UpdateMedicine';
import CreateMedicine from './screens/CreateMedicine';
// import Quiz from './screens/Quiz';
// import QuizResult from './screens/QuizResult';

const Stack = createStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = () => {
      try {
        database.initializeDatabase();
        database.initializeTestData();
        console.log('Database initialized');
        setIsReady(true);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsReady(true); 
      }
    };
    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> */}
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="ViewMedicines" component={ViewMedicines} />
          <Stack.Screen name="UpdateMedicine" component={UpdateMedicine} />
          <Stack.Screen name="CreateMedicine" component={CreateMedicine} />
          {/* <Stack.Screen name="Quiz" component={Quiz} /> */}
          {/* <Stack.Screen name="QuizResult" component={QuizResult} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;


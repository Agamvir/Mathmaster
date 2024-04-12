import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Preface from './screens/TrainingPreface';
import Portal from './screens/Portal';
import LoginScreen from './screens/Login';
import Locker from './screens/Locker';
import Stats from './screens/Stats';
import MasteryModes from './screens/MasteryModes';
import firebase from 'firebase/app';
import { firebaseConfig } from './config'

const Stack = createStackNavigator();

export default class App extends Component {
  componentDidMount(){
    console.log('app.js')
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app();
      }
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase' + error);
    }
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Portal" component={Portal} />
          <Stack.Screen name="Preface" component={Preface} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Locker" component={Locker} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="MasteryModes" component={MasteryModes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

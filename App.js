import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import firebase from 'firebase/app';
// import { firebaseConfig } from './config';
import LoginScreen from './screens/Login';
import Portal from './screens/Portal';
import Locker from './screens/Locker';
import Preface from './screens/TrainingPreface';
import MasteryModes from './screens/MasteryModes';
import Stats from './screens/Stats';
import { Alert, Text } from 'react-native';

//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const StackNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    Portal: { screen: Portal },
    Locker: { screen: Locker },
    Preface: { screen: Preface },
    MasteryModes: { screen: MasteryModes },
    Stats: { screen: Stats }
  },
  {
    initialRouteName: 'LoginScreen', // Set the initial route
    headerMode: 'none', // Hide navigation header
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  render() {
    console.log("inside app.js");
    return(
    <AppContainer />
    )
  }
}
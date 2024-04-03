import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import firebase from 'firebase/app';

export default class MasteryModes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twoP: false,
      fourP: false,
      message: '',
      searching: false
    };
  }

  queue = () => {
    if (this.state.twoP === false && this.state.fourP === false) {
      this.setState({ message: 'Pick a gamemode.' });
    } else if (this.state.twoP === true) {
      const user = firebase.auth().currentUser;
      if (user) {
        const uid = user.uid;
        const userRef = firebase.database().ref("/users/" + uid);
        userRef.update({
          searching: true
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MATHMASTER</Text>
        <Text style={styles.caption}>Queue for a match.</Text>
        <Pressable
          style={[
            styles.button,
            this.state.twoP === false ? { backgroundColor: 'navy' } : null
          ]}
          onPress={() => this.setState({ twoP: !this.state.twoP })}
        >
          <Text style={styles.buttonText}>Duels</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#1c1c1c' }]}
          onPress={() => this.props.navigation.navigate('Portal')}
        >
          <Text style={[styles.buttonText, { color: 'gray' }]}>Coming Soon</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: 'chartreuse' }]}
          onPress={this.queue}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>Queue</Text>
        </Pressable>
        <Text style={styles.caption}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  caption: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'blue',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { AuthSession } from 'expo';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  // googleSignIn = async () => {
  //   try {
  //     const redirectUrl = AuthSession.getRedirectUrl();
  //     const result = await AuthSession.startAsync({
  //       authUrl:
  //         `https://accounts.google.com/o/oauth2/v2/auth?` +
  //         `&client_id=${'766057186944-3lravlmv1js8tco9rme3utrffdbbdopb.apps.googleusercontent.com'}` +
  //         `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  //         `&response_type=token` +
  //         `&scope=openid%20profile%20email`,
  //     });

  //     if (result.type === 'success') {
  //       const { id_token } = result.params;
  //       const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  //       await firebase.auth().signInWithCredential(credential);
        
  //       // Now handle updating user details in Firebase
  //       const user = firebase.auth().currentUser;
  //       if (user) {
  //         let displayName = user.displayName;
  //         if (displayName.length > 8) {
  //           displayName = displayName.substring(0, 8);
  //         }

  //         const userRef = firebase.database().ref("/users/" + user.uid);
  //         userRef.once('value', snapshot => {
  //           if (!snapshot.exists()) {
  //             userRef.set({ 
  //               displayName: displayName,
  //               email: user.email,
  //               gainedMP: 0,
  //               league: 'Bronze',
  //               nextLeague: 'Silver',
  //               neededMP: 1000,
  //               searching: false,
  //               playerNum: 0,
  //               queueNum: 0,
  //               
  //             });
  //           }
  //         });

  //         // Navigate to the portal after sign-in
  //         this.props.navigation.navigate('Portal');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Google sign-in error:', error.message);
  //     this.setState({ errorMessage: 'Error logging in' });
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MATHMASTER</Text>
        <Text style={styles.caption}>Login to your account.</Text>
        <Pressable style={styles.button} onPress={()=>this.props.navigation.navigate('Portal')}>
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </Pressable>
        <Text style={[styles.caption, { color: 'red' }]}>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  caption: {
    fontSize: 20,
    fontWeight: '600',
    color: '#b0eb86',
    marginBottom: 90
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    marginTop: 0,
  },
  button: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#78e32b',
    marginTop: 15,
  },
});

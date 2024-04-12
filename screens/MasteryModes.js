import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import firebase from 'firebase/app';

export default class MasteryModes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threeP: false,
      fourP: false,
      message: '',
      searching: false,
      league: '',
      queueNum: 0,
    };
  }

queue = () => {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("No user found.");
        return;
    }
    
    const uid = user.uid;
    const userRef = firebase.database().ref("/users/" + uid);

    userRef.once("value", snapshot => {
        const league = snapshot.child("league").val();
        const searching = snapshot.child("searching").val();

        if (!league) {
            console.error("No league found for user.");
            return;
        }

        if (searching === "inGame") {
            console.log("User is already in a match.");
            return;
        }

        const umbrella1 = ["Bronze", "Silver"];
        const umbrella2 = ["Gold", "Diamond"];
        const umbrella3 = ["Emerald", "Mythic"];

        let umbrella;
        if (umbrella1.includes(league)) {
            umbrella = 1;
        } else if (umbrella2.includes(league)) {
            umbrella = 2;
        } else if (umbrella3.includes(league)) {
            umbrella = 3;
        } else {
            console.error("Invalid league.");
            return;
        }

        userRef.update({
            searching: true // Set searching to true when queuing
        }).then(() => {
            // Check if any players are already searching in the same umbrella
            firebase.database().ref("/users").once("value", snapshot => {
                let playersFound = [];
                snapshot.forEach(childSnapshot => {
                    const playerId = childSnapshot.key;
                    const playerLeague = childSnapshot.child("league").val();
                    const searching = childSnapshot.child("searching").val();
                    
                    if (umbrella1.includes(playerLeague) && umbrella === 1 ||
                        umbrella2.includes(playerLeague) && umbrella === 2 ||
                        umbrella3.includes(playerLeague) && umbrella === 3) {
                        if (searching === true) {
                            playersFound.push(playerId);
                        }
                    }
                });

                // If no players are already searching in the same umbrella, assign queueNum and playerNum
                if (playersFound.length === 0) {
                    const queueNum = Math.floor(Math.random() * 999999999999999);
                    userRef.update({
                        queueNum: queueNum,
                        playerNumber: 1
                    });
                }

                // Proceed to find match
                this.findMatch(league, umbrella, playersFound);
            });
        }).catch(error => {
            console.error("Error updating user data:", error);
        });
    });
}

findMatch = (league, umbrella, playersFound) => {
    const usersRef = firebase.database().ref("/users");

    if (playersFound.length >= 3) {
        console.log("Enough players found. Starting game...");
        const value = Math.floor(Math.random() * 9999999999)
        const queueNum = Math.floor(Math.random() * 999999999999999) + value;

        // Sort players based on their join time
        playersFound.sort((a, b) => {
            return new Date(childSnapshot[a].joinTime) - new Date(childSnapshot[b].joinTime);
        });

        // Assign player numbers based on order of joining
        playersFound.slice(0, 3).forEach((playerId, index) => {
            usersRef.child(playerId).update({
                searching: "inGame",
                queueNum: queueNum,
                playerNumber: index + 1
            });
        });

        // Perform actions to start the game
        // this.props.navigation.navigate('InMatch');
    } else {
        this.setState({ message: 'Searching for players...' });
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
            this.state.threeP === false ? { backgroundColor: 'navy' } : null
          ]}
          onPress={() => this.setState({ threeP: !this.state.threeP })}
        >
          <Text style={styles.buttonText}>Brawl of Three</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#1c1c1c' }]}
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

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
//import ProgressBar from 'react-native-progress/Bar';
import firebase from 'firebase/app';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 'Bronze',
      nextLevel: 'Silver',
      gainedMP: 0,
      neededMP: 1000
    };
  }

  componentDidMount() {
    // Fetch user stats from the database
    this.fetchUserStats();
  }

  fetchUserStats = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firebase.database().ref("/users/" + uid);
      userRef.once('value', snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.setState({
            level: userData.league,
            nextLevel: this.getNextLevel(userData.league),
            gainedMP: userData.gainedMP,
            neededMP: userData.neededMP,
            totalMP: userData.totalMP
          });
        }
      });
    }
  };

  getNextLevel = currentLevel => {
  const levels = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Emerald', 'Mythic'];
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === levels.length - 1) {
    // If current level is Mythic, return Mythic (no next level)
    return 'Mythic';
  } else {
    // Otherwise, return the next level
    return levels[currentIndex + 1];
  }
};

  handleLevelUp = () => {
  const { gainedMP, neededMP } = this.state;
  const currentLevel = this.state.level;
  if (gainedMP >= neededMP && currentLevel !== 'Mythic') {
    const nextLevel = this.getNextLevel(currentLevel);
    const newNeededMP = neededMP + 1000;

    // Update user data in the database
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firebase.database().ref("/users/" + uid);
      userRef.update({
        league: nextLevel,
        nextLeague: this.getNextLevel(nextLevel),
        gainedMP: 0, // Reset gainedMP after level up
        neededMP: newNeededMP
      });
    }

    // Update state
    this.setState({
      level: nextLevel,
      nextLevel: this.getNextLevel(nextLevel),
      gainedMP: 0,
      neededMP: newNeededMP,
    });
  }
};

  getLevelInfo(level) {
    let style, imageSource;

    if (level === 'Bronze') {
      style = styles.bronze;
      imageSource = require('../prototypes/Bronze.png');
    } else if (level === 'Silver') {
      style = styles.silver;
      imageSource = require('../prototypes/Silver.png');
    } else if (level === 'Gold') {
      style = styles.gold;
      imageSource = require('../prototypes/Gold.png');
    } else if (level === 'Diamond') {
      style = styles.diamond;
      imageSource = require('../prototypes/Diamond.png');
    } else if (level === 'Emerald') {
      style = styles.emerald;
      imageSource = require('../prototypes/Emerald.png');
    } else if (level === 'Mythic') {
      style = styles.mythic;
      imageSource = require('../prototypes/Mythic.png');
    }

    return { style, imageSource };
  }

  render() {
    const { level, gainedMP, neededMP, nextLevel, totalMP } = this.state;
    const progressBarFill = (gainedMP / neededMP) * 100;
    const progressText = `${gainedMP} / ${neededMP} MP gained`;
    const { style: levelStyle, imageSource } = this.getLevelInfo(level);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MATHMASTER</Text>
        <Text style={levelStyle}>League: {this.state.level}</Text>
        <Image
          style={styles.imageIcon}
          source={imageSource}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.currentLev}>{this.state.level}</Text>
          {/* <ProgressBar
            progress={progressBarFill / 100}
            width={200}
            color='white'
          /> */}
          <Text style={styles.nextLev}>{this.state.nextLevel}</Text>
        </View>
        <Text style={styles.progressText}>{progressText}</Text>
        <Pressable style={styles.button} onPress={()=>this.props.navigation.navigate('Portal')}>
          <Text style={styles.buttonText}>Portal</Text>
        </Pressable>
        <Pressable style={[styles.button, {backgroundColor: 'chartreuse'}]} onPress={()=>this.props.navigation.navigate('MasteryModes')}>
          <Text style={[styles.buttonText, {color: 'black'}]}>Play</Text>
        </Pressable>
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
  bronze: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#a16518',
  },
  silver: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: 'silver',
  },
  gold: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#f5c20c',
  },
  diamond: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#67d1f5',
  },
  emerald: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#0fd433',
  },
  mythic: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    color: '#e8361e',
  },
  currentLev: {
    fontSize: 16,
    marginRight: 10,
    color: 'white'
  },
  nextLev: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white'
  },
  progressText: {
    fontSize: 16,
    marginTop: 10,
    color: 'white'
  },
  imageIcon: {
    width: 150,
    height: 150,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#32a852',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
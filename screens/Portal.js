import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image
} from 'react-native';

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: 0,
      correspondingMessage: '',
    };
  }

  componentDidMount() {
    this.pickMessage(); // Corrected
  }

  pickMessage = () => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    this.setState({ randomNumber });

    switch (randomNumber) { // Corrected
      case 1:
        this.setState({
          correspondingMessage: '"Aspire."',
        });
        break;
      case 2:
        this.setState({
          correspondingMessage: '"Success is right around the corner when you want to quit."',
        });
        break;
      case 3:
        this.setState({
          correspondingMessage: '"It did not get easier. You got better."',
        });
        break;
      case 4:
        this.setState({
          correspondingMessage: '"The most talented man was once a beginner."',
        });
        break;
      case 5:
        this.setState({
          correspondingMessage: '"Begin your adventure."',
        });
        break;
      default:
        this.setState({
          correspondingMessage: '"Aspire."',
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> MATHMASTER </Text>
        <Text style={styles.header}>{this.state.correspondingMessage}</Text>
        <Text style={styles.caption}>Select whether you will train by yourself or go into a match with other players.</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.trainButton}
            onPress={()=>this.props.navigation.navigate('Preface')}>
            <Text style={styles.displayText}>Train</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.masteryButton}
          onPress={()=>this.props.navigation.navigate('Stats')}>
            <Text style={styles.displayText}>Mastery</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.lockerButton} onPress={()=>this.props.navigation.navigate('Locker')}>
            <Text style={styles.displayText}>Settings</Text>
          </Pressable>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },
  header: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
  caption: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20, // Adjust as needed
    marginTop: 20, // Adjust as needed
  },
  trainButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#306ed1',
    marginLeft: 5, // Adjust as needed
  },
  masteryButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ccb416',
    marginLeft: 5, // Adjust as needed
  },
  lockerButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'gray',
    marginLeft: 5, // Adjust as needed
  },
  imageIcon: {
    width: 70,
    height: 70,
  },
});

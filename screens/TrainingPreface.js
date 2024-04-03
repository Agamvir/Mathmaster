import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';

export default class Preface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: '',
      difficulty: '',
      gameState: 0,
      answer: '',
      feedbackResponse: '',
      startTime: 0,
      questionNumber: 1,
      timeTakenArray: [], // Array to store time taken for each correct answer
      answersCorrect: 0, // Counter for correct answers
      value1: 0,
      value2: 0,
      difficulty1: 0,
      difficulty2: 0,
      sign: '',
    };
  }

  beginTest = () => {
    if (this.state.operation !== '' && this.state.difficulty !== '') {
      if (this.state.operation === 'Addition') {
        this.setState({ sign: '+' });
      } else if (this.state.operation === 'Subtraction') {
        this.setState({ sign: '-' });
      } else if (this.state.operation === 'Multiplication') {
        this.setState({ sign: '*' });
      } else if (this.state.operation === 'Division') {
        this.setState({ sign: '/' });
      }

      if (this.state.difficulty === 'Beginner') {
        this.setState({ difficulty1: 9 });
        this.setState({ difficulty2: 1 });
        this.setState({ value1: Math.floor(Math.random() * 9) + 1 });
        this.setState({ value2: Math.floor(Math.random() * 9) + 1 });
      } else if (this.state.difficulty === 'Medium') {
        this.setState({ difficulty1: 90 });
        this.setState({ difficulty2: 10 });
        this.setState({ value1: Math.floor(Math.random() * 90) + 10 });
        this.setState({ value2: Math.floor(Math.random() * 90) + 10 });
      } else if (this.state.difficulty === 'Master') {
        this.setState({ difficulty1: 900 });
        this.setState({ difficulty2: 100 });
        this.setState({ value1: Math.floor(Math.random() * 900) + 100 });
        this.setState({ value2: Math.floor(Math.random() * 900) + 100 });
      }
      this.setState({ startTime: new Date().getTime() / 1000 });
      this.setState({ gameState: 1 });
    }
  };

  check = () => {
    const { answer, value1, value2, startTime } = this.state;
    if (this.state.operation === 'Division') {
      if (value1 % value2 === 0) {
        if (parseInt(answer) === value1 / value2) {
          const endTime = new Date().getTime() / 1000;
          const timeTaken = endTime - startTime;
          this.setState({
            feedbackResponse: `Correct! You took ${timeTaken.toFixed(
              2
            )} seconds.`,
            timeTakenArray: [...this.state.timeTakenArray, timeTaken],
            answersCorrect: this.state.answersCorrect + 1,
          });
        } else {
          this.setState({ feedbackResponse: 'Incorrect.' });
        }
      } else {
        const correctAnswer = value1 / value2;
        const gap = Math.abs(answer - correctAnswer);
        if (gap < 0.1) {
          // Tolerance for considering answer correct
          const endTime = new Date().getTime() / 1000;
          const timeTaken = endTime - startTime;
          this.setState({
            feedbackResponse: `Correct! You took ${timeTaken.toFixed(
              2
            )} seconds.`,
            timeTakenArray: [...this.state.timeTakenArray, timeTaken],
            answersCorrect: this.state.answersCorrect + 1,
          });
        } else {
          this.setState({ feedbackResponse: 'Incorrect.' });
        }
      }
    } else {
      // For other operations (Addition, Subtraction, Multiplication)
      let correctResult;
      switch (this.state.operation) {
        case 'Addition':
          correctResult = value1 + value2;
          break;
        case 'Subtraction':
          correctResult = value1 - value2;
          break;
        case 'Multiplication':
          correctResult = value1 * value2;
          break;
        default:
          break;
      }
      if (parseInt(answer) === correctResult) {
        const endTime = new Date().getTime() / 1000;
        const timeTaken = endTime - startTime;
        this.setState({
          feedbackResponse: `Correct! You took ${timeTaken.toFixed(
            2
          )} seconds.`,
          timeTakenArray: [...this.state.timeTakenArray, timeTaken],
          answersCorrect: this.state.answersCorrect + 1,
        });
      } else {
        this.setState({ feedbackResponse: 'Incorrect.' });
      }

      if (this.state.questionNumber == 10) {
        this.setState({gameState: 2})
      }
    }

    // Proceed to the next question regardless of the answer
    this.setState((prevState) => ({
      startTime: new Date().getTime() / 1000,
      value1:
        Math.floor(Math.random() * prevState.difficulty1) +
        prevState.difficulty2,
      value2:
        Math.floor(Math.random() * prevState.difficulty1) +
        prevState.difficulty2,
      questionNumber: prevState.questionNumber + 1,
      answer: '',
    }));
  };

  render() {
    if (this.state.gameState == 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}> MATHMASTER </Text>
          <Text style={styles.caption}>
            {' '}
            Select the operations you want to be tested on:{' '}
          </Text>
          <Pressable
            style={
              this.state.operation === 'Addition'
                ? [styles.button, { backgroundColor: 'red' }]
                : [styles.button, { backgroundColor: '#3b0000' }]
            }
            onPress={() => {
              if (this.state.operation !== 'Addition') {
                this.setState({ operation: 'Addition' });
              } else {
                this.setState({ operation: '' });
              }
            }}>
            <Text style={styles.displayText}>Addition</Text>
          </Pressable>

          <Pressable
            style={
              this.state.operation === 'Subtraction'
                ? [styles.button, { backgroundColor: 'yellow' }]
                : [styles.button, { backgroundColor: '#383b00' }]
            }
            onPress={() => {
              if (this.state.operation !== 'Subtraction') {
                this.setState({ operation: 'Subtraction' });
              } else {
                this.setState({ operation: 'false' });
              }
            }}>
            <Text
              style={
                this.state.operation === 'Subtraction'
                  ? [styles.displayText, { color: 'black' }]
                  : [styles.displayText, { color: 'white' }]
              }>
              Subtraction
            </Text>
          </Pressable>

          <Pressable
            style={
              this.state.operation === 'Multiplication'
                ? [styles.button, { backgroundColor: 'blue' }]
                : [styles.button, { backgroundColor: '#00003b' }]
            }
            onPress={() => {
              if (this.state.operation !== 'Multiplication') {
                this.setState({ operation: 'Multiplication' });
              } else {
                this.setState({ operation: '' });
              }
            }}>
            <Text style={styles.displayText}>Multiplication</Text>
          </Pressable>

          <Pressable
            style={
              this.state.operation === 'Division'
                ? [styles.button, { backgroundColor: 'lime' }]
                : [styles.button, { backgroundColor: '#044d00' }]
            }
            onPress={() => {
              if (this.state.operation !== 'Division') {
                this.setState({ operation: 'Division' });
              } else {
                this.setState({ operation: '' });
              }

              this.setState({ add: false });
              this.setState({ subtract: false });
              this.setState({ multiply: false });
            }}>
            <Text
              style={
                this.state.operation === 'Division'
                  ? [styles.displayText, { color: 'black' }]
                  : [styles.displayText, { color: 'white' }]
              }>
              Division
            </Text>
          </Pressable>

          <Text style={styles.caption}>
            Select the difficulty of your test:
          </Text>

          <Pressable
            style={
              this.state.difficulty === 'Beginner'
                ? [styles.button, { backgroundColor: 'white' }]
                : [styles.button, { backgroundColor: '#42464d' }]
            }
            onPress={() => {
              if (this.state.difficulty !== 'Beginner') {
                this.setState({ difficulty: 'Beginner' });
              } else if (this.state.difficulty === 'Beginner') {
                this.setState({ difficulty: '' });
              }
            }}>
            <Text
              style={
                this.state.difficulty === 'Beginner'
                  ? [styles.displayText, { color: '#303340' }]
                  : [styles.displayText, { color: 'white' }]
              }>
              Beginner (1 by 1 digit)
            </Text>
          </Pressable>

          <Pressable
            style={
              this.state.difficulty === 'Medium'
                ? [styles.difficultyButton, { backgroundColor: 'white' }]
                : [styles.difficultyButton]
            }
            onPress={() => {
              if (this.state.difficulty !== 'Medium') {
                this.setState({ difficulty: 'Medium' });
              } else if (this.state.difficulty === 'Medium') {
                this.setState({ difficulty: '' });
              }
            }}>
            <Text
              style={
                this.state.difficulty === 'Medium'
                  ? [styles.displayText, { color: '#303340' }]
                  : [styles.displayText, { color: 'white' }]
              }>
              Medium (2 by 2 digit)
            </Text>
          </Pressable>

          <Pressable
            style={
              this.state.difficulty === 'Master'
                ? [styles.button, { backgroundColor: 'white' }]
                : [styles.button, { backgroundColor: '#42464d' }]
            }
            onPress={() => {
              if (this.state.difficulty !== 'Master') {
                this.setState({ difficulty: 'Master' });
              } else if (this.state.difficulty === 'Master') {
                this.setState({ difficulty: '' });
              }
            }}>
            <Text
              style={
                this.state.difficulty === 'Master'
                  ? [styles.displayText, { color: '#303340' }]
                  : [styles.displayText, { color: 'white' }]
              }>
              Master (3 by 3 digit)
            </Text>
          </Pressable>

          <Pressable
            style={
              this.state.operation === '' || this.state.difficulty === ''
                ? [styles.doneButton, { opacity: 0.0 }]
                : [styles.doneButton, { opacity: 1 }]
            }
            onPress={() => this.beginTest()}>
            <Text style={[styles.displayText, { color: 'black' }]}>Done</Text>
          </Pressable>
        </View>
      );
    } else if (this.state.gameState == 1) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>MATHMASTER</Text>
          <Text style={styles.box1}>Question {this.state.questionNumber}</Text>
          <Text style={[styles.box1, {backgroundColor: '#2c72a3', fontSize: 25}]}>
            {this.state.value1}
            {this.state.sign}
            {this.state.value2}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Answer Here'}
            onSubmitEditing={() => this.check()}
            autoFocus={true}
            onChangeText={(text) => this.setState({ answer: text })}
            value={this.state.answer}
          />
          <Pressable
            style={styles.textInputButton}
            onPress={() => this.check()}>
            <Text style={styles.displayText}>Enter</Text>
          </Pressable>
          <Text style={styles.displayText}>{this.state.feedbackResponse}</Text>
        </View>
      );
    } else if (this.state.gameState == 2) {
      // Calculate the average time taken
      const { timeTakenArray } = this.state;
      const totalTimes = timeTakenArray.reduce((acc, curr) => acc + curr, 0);
      const averageTime = totalTimes / timeTakenArray.length;

      return (
        <View style={styles.container}>
          <Text style={styles.title}>MATHMASTER</Text>
          <Text style={styles.box1}>Score: {this.state.answersCorrect}/10</Text>
          <Text style={[styles.box1, {backgroundColor: '#2c72a3', fontSize: 25}]}>
            Average Time Taken: {averageTime.toFixed(2)} seconds
          </Text>
          <Pressable
            style={styles.portalNavigator}
            onPress={() => this.props.navigation.navigate('Portal')}>
            <Text style={[styles.displayText, {color: 'black'}]}>Portal</Text>
          </Pressable>
        </View>
      );
    }
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
    fontWeight: 700,
    color: 'white',
  },
  caption: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
  },
  box1: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 600,
    color: 'white',
    backgroundColor: '#44b0fc',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 400,
    color: 'white',
    marginTop: 0,
  },
  button: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#3b0000',
    marginTop: 15,
  },
  doneButton: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#b3ff03',
    marginTop: 10,
    opacity: 0,
  },
  portalNavigator: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'turquoise',
    marginTop: 150,
  },
  textInput: {
    width: '91%',
    height: 50,
    padding: 10,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#5653D4',
    color: '#FFFFFF',
    marginTop: 200,
    marginLeft: 15,
  },
  textInputButton: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'blue',
    marginTop: -50,
    marginLeft: 170,
  },
});
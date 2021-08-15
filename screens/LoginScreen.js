import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  showAlert(errorCode) {
    switch (errorCode) {
      case 'auth/too-many-requests':
        Alert.alert('To many requests\nTry again later');
        this.setState({
          email: '',
          password: '',
        });
        break;
      case 'auth/wrong-password':
        Alert.alert('Enter Correct password');
        this.setState({
          password: '',
        });
        break;
      default:
        this.setState({
          email: '',
          password: '',
        });
        return Alert.alert('Invalid email and password');
    }
  }

  render() {
    // ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.cont}>
        <StatusBar
          animated={true}
          backgroundColor="#FFFFFF"
          barStyle={'dark-content'}
        />
        <Text style={styles.heading}>Login</Text>

        <View style={styles.dibba}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingLeft: 20,
            }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15, marginBottom: 10 }}>Email</Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="user" type="feather" color="#517fa4" size={30} />
                <TextInput
                  style={styles.loginDocs}
                  placeholder="abc123@gmail.com"
                  value={this.state.emailId}
                  onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
                  }}
                />
              </View>
              <View style={styles.divider}></View>
            </View>

            <Text style={{ fontSize: 15, marginBottom: 10 }}>Password</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="lock" type="feather" color="#517fa4" size={30} />
              <TextInput
                style={styles.loginDocs}
                placeholder="Enter password here"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                  console.log('your value : ' + text);
                }}
              />
            </View>
            <View style={styles.divider}></View>
            <Text
              style={{
                textAlign: 'right',
                marginTop: 10,
                color: 'grey',
                fontWeight: 'bold',
              }}>
              Forgot password?
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginbtn}
          onPress={async () => {
            var email = await this.state.email;
            var password = await this.state.password;
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                this.props.navigation.navigate('WriteStory');
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode);
              });
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: '#ffff',
              fontWeight: 'bold',
            }}>
            LOGIN
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 150 }}>
          <Text style={{ textAlign: 'center' }}>Or sign up using </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Image
              style={{ width: 50, height: 50, marginRight: 20 }}
              source={{
                uri:
                  'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
              }}
            />
            <Image
              style={{ width: 50, height: 50, marginRight: 22 }}
              source={{
                uri:
                  'https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png',
              }}
            />
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                  'https://openvisualfx.com/wp-content/uploads/2019/10/pnglot.com-twitter-bird-logo-png-139932.png',
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    textAlign: 'center',
  },
  loginDocs: {
    paddingLeft: 10,
    fontSize: 20,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 40,
    color: 'grey',
  },
  dibba: {
    marginTop: 90,
    // alignSelf:"center"
  },
  divider: {
    height: 1,
    color: 'black',
    borderWidth: 1,
    borderColor: '#517fa4',
    marginRight: 20,
    marginTop: 5,
  },
  loginbtn: {
    backgroundColor: '#4159d088',
    marginHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
});

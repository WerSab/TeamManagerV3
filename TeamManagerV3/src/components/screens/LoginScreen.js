import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import Loader from '../screens/Loader';
import PlayerCard from './PlayerCard';
import {userActions} from '../../store';
import {loginActions} from '../../store';
import { set } from 'react-native-reanimated';
import auth from '@react-native-firebase/app'

console.log(auth);

const LoginScreen = ({navigation, addLogin, user, login}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  //const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    const loggedUser = user.filter(
      item => item.email === userEmail && item.password === userPassword,
    );
    const {id} = loggedUser[0];

    console.log('logged user', loggedUser.length);
    console.log('user length', user.length);
    console.log('login length', login.length);
    console.log('ID Gracza', id);
    console.log('zawartość loginslice', login);

    if (loggedUser.length > 0) {
      alert('Login is ok.');
      setLoginToDB(id);
      navigation.navigate('PlayerCard');
    } else {
      alert('Login failed.');
    }
  };

  const clearInputs = () => {
    setUserEmail('');
    setUserPassword('');
  };

  const setLoginToDB = id => {
    let itemToSet = {
      loginID: login.length,
      playerID: id,
    };
    addLogin(itemToSet);
    console.log('login item to set',itemToSet)
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                handleSubmitPress();
                clearInputs();
              }}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('PasswordRecoveryScreen')}>
              Forgot password?
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const mapState = state => ({
  user: state.user,
  login: state.login,
});
const mapDispatch = dispatch => ({
  addLogin: data => dispatch(loginActions.addLogin(data)),
});

export default connect(mapState, mapDispatch)(LoginScreen);

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a112b',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FCA542',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

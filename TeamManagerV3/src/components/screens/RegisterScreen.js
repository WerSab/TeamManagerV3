import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import LoginScreen from './LoginScreen';
import { StackNavigator } from '../navigation/StackNavigator';

const RegisterScreen = ({user, addUser, navigation, StackNavigator}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  
  const passwordRef = createRef();

  

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    
    setPassword('');
  };

  const setUserToDB = () => {
    let itemToSet = {
      id: user.length,
      category: 'Zawodnik',
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      
    };
    addUser(itemToSet);
    console.log('Rejestracja',itemToSet)
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!firstName) {
      alert('Please fill First Name');
      return;
    }

    if (!lastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!email) {
      alert('Please fill Email');
      return;
    }
    
    if (!password) {
      alert('Please fill Password');
      return;
    }

    let userSize_1 = user.length;
    console.log('Rozmiar bazy',userSize_1);

    clearInputs();
    setUserToDB();
    navigation.navigate('LoginScreen')
    console.log('USER', user)

  };

  return (
    <View style={{flex: 1, backgroundColor: '#1a112b'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={firstName => setFirstName(firstName)}
              underlineColorAndroid="#f000"
              placeholder="Imię ..."
              placeholderTextColor="#8b9cb5"
              ref={firstNameRef}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameRef.current && lastNameRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={lastName => setLastName(lastName)}
              underlineColorAndroid="#f000"
              placeholder="Nazwisko ..."
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={lastNameRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailRef.current && emailRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={email => setEmail(email)}
              underlineColorAndroid="#f000"
              placeholder="Email ..."
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordRef.current && passwordRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

                 
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Hasło ..."
              placeholderTextColor="#8b9cb5"
              ref={passwordRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              handleSubmitButton();
               }}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};


export default RegisterScreen;

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
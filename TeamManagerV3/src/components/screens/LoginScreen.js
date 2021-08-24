import React, {useState, useContext, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import {FirebaseUserContext} from '../../context/FirebaseUserProvider';
import {
  loginFireBaseUser,
  signOutFirebaseUser,
} from '../../fireBase/authentication-methods';

const LoginScreen = ({navigation}) => {
  const {user, updateUser, initializingUser} = useContext(FirebaseUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState('');
  const [error, setError] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const passwordInputRef = createRef();

  const loginUser = () => {
    setIsLogging(true);
    loginFireBaseUser(email, password)
      .then(user => {
        updateUser(user);
        setError(null);
      })
      .catch(setError)
      .finally(() => setIsLogging(false));
  };


  if (initializingUser) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    if (user) {
      return (
        <View>
          <Text>Hello{user.email}</Text>
          <Button
            title="Log out"
            disablefd={isSigningOut}
            onPress={() => {
              setIsSigningOut(true);
              signOutFirebaseUser().finally(() => setIsSigningOut(false));
            }}
          />
        </View>
      );
    } else {
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
                    onChange={event => setEmail(event.nativeEvent.text)}
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChange={event => setPassword(event.nativeEvent.text)}
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

                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  disabled={isLogging}
                  title="Log in"
                  onPress={() => {
                    loginUser;
                    console.log(loginUser)
                  }}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
                
                <View style={{marginTop: 10, alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>{error}</Text>
                </View>
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
    }
  }
};

export default LoginScreen;

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

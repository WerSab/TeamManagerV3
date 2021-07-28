import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import email from 'react-native-email';
import {connect} from 'react-redux';

const PasswordRecoveryScreen = user => {
  const [errortext, setErrortext] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleEmail = () => {
    const to = userEmail;
    console.log('userEmail', to);

    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }

    email(to, {
      cc: ['weronika.sabor@interia.pl'], // string or array of email addresses
      bcc: 'weronika.sabor@beclose.eu', // string or array of email addresses
      subject: 'Password recovery- test',
      body: 'Twoje hasło to :',
      userPassword,
    }).catch(console.error);
  };

  const DBpassword = user.filter(item => item.email === userEmail);
    const {password} = DBpassword[0];
    console.log('password', password)
    setUserPassword(password)

  return (
    <View style={styles.mainBody}>
      <View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={userEmail => {
                setUserEmail(userEmail);
              }}
              placeholder="Enter Email" //dummy@abc.com
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity style={styles.buttonStyle}>
        <Text
          style={styles.buttonTextStyle}
          onPress={() => {
            handleEmail();
            getPassword();
          }}>
          SEND EMAIL
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapState = state => ({
    user: state.user,
  });
    
  export default connect(mapState, null)(PasswordRecoveryScreen);

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

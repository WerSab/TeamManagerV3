import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import Main from '../Main';
import {connect} from 'react-redux';
import {userActions} from '../store';


const SplashScreen = ({navigation
}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'LoginScreen' : 'Main'),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a343f',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

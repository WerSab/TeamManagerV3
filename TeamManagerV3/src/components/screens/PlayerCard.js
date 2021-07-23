import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
 
  View,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import CustomFlatList_team from '../CustomFlatList_team';
import deleteIcon from '../../../assets/icons/delete.png/';

const PlayerCard = ({user, turnieje, navigation}) => {

  const playerCard = user.filter(item => item.login === '2');
  const {login} = playerCard[0];

  return (
    <>
      <View style={styles.container}>
        

        <CustomFlatList_team style={styles.text} data={playerCard} login={login} />
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => {
             navigation.navigate('RoundList')
          }}>
          <Text style={styles.textButton}>Dodaj turniej</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(PlayerCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
    paddingVertical: -5,
    paddingHorizontal: -5,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },

  image: {
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
  icon: {
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textStyleBig: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonClose: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //elevation: 2,
    width: 120,
    backgroundColor: '#FCA542',
  },
  buttonSafe: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //elevation: 2,
    width: 120,
    backgroundColor: '#FCA542',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

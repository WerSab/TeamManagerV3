import React from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  } from 'react-native';
import CustomFlatList_team from '../CustomFlatList_team';
import { connect } from 'react-redux'


const Team = ({user}) => {
  const team = user.filter(item => item.category === 'Zawodnik');
  const { category } = team[0];
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
              
        <CustomFlatList_team
          data={team}
          category={category}
          borderRadius="20"
          backgroundColor="#212933"
          textColor="white"
          withSearchbar={false}
        />
      </View>
    </>
  );
};
const mapState = (state) => ({
  user: state.user
})


export default connect(mapState)(Team);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#33383C',
    width: '100%',
    borderRadius: 10,
  },
  buttonLogo: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#141518',
    width: '100%',
  },
  buttonWelcome: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#33383C',
    color: 'white',
    width: '20%',
  },
  icon: {
    height: 40,
    width: 40,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: '10%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //elevation: 2,
    width: 120,
  },
  buttonClose: {
    backgroundColor: '#CCCCCC',
  },
  buttonSafe: {
    backgroundColor: '#94B444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTeam: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
    textAlign: 'center',
    letterSpacing: 4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    marginLeft: 4,
  },
  picture: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '70%',
    marginLeft: 4,
  },
});

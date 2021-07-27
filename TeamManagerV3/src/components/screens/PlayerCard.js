import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import CustomFlatList_team from '../CustomFlatList_team';
import CustomFlatlist_games from '../CustomFlatlist_games';
import RoundList from '../RoundList';
import deleteIcon from '../../../assets/icons/delete.png/';


const PlayerCard = ({user, navigation, game}) => {
  const playerCard = user.filter(item => item.login === '2');
  const {login} = playerCard[0];
  const {id} = playerCard[0];
    
  const myRounds = game.filter(item => item.player.id === id);
  const player = myRounds[0];
  console.log('myRounds', myRounds);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CustomFlatList_team data={playerCard} login={login} />
        <CustomFlatlist_games data={myRounds} player={player}  />
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => {
            navigation.navigate('RoundList');
          }}>
          <Text style={styles.textButton}>Add rounds</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};
const mapState = state => ({
  user: state.user,
  game: state.game,
});

export default connect(mapState)(PlayerCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a112b',
    alignContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
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

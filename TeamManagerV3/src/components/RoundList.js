import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

import {connect} from 'react-redux';
import {gameActions} from '../store';

const RoundList = ({turnieje, addGame, user, game, navigation, login}) => {
  const [selected, setSelected] = useState(new Map());
  const Item = ({name, selected, onSelect}) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(name)}
        style={[
          styles.item,
          {backgroundColor: selected ? '#FCA542' : '#ffffff'},
        ]}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const onSelect = useCallback(
    name => {
      const newSelected = new Map(selected);
      newSelected.set(name, !selected.get(name));

      setSelected(newSelected);
    },
    
  );
  console.log('selectedRoundList', selected)
  
  const loginSize = login.length;
  const loggedPlayer = login.filter(item => item.loginID === loginSize - 1);
  const {playerID} = loggedPlayer[0];

  const selectedTab=Array.from(selected);

console.log('tab', selectedTab)
console.log('selectedTab', selectedTab[0])

  const setGameToDB = () => {
    let itemToSet = {
      gameID: game.length,
      round: [selectedTab],
      gamePlayerID: playerID,
    };
    addGame(itemToSet);
    console.log('item to set game: ', itemToSet);
    for (let i = 0; i < game.length; i++) {
      console.log('zawartość tablicy: ', game[i]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={turnieje}
        renderItem={({item}) => (
          <Item
            name={item.name}
            selected={!!selected.get(item.name)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.name}
        extraData={selected}
      />
      <TouchableOpacity
        style={styles.buttonClose}
        onPress={() => {
          setGameToDB();
          navigation.navigate('PlayerCard');
        }}>
        <Text style={styles.textButton}>Accept</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  buttonClose: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //elevation: 2,
    width: 120,
    backgroundColor: '#CCCCCC',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const mapState = state => ({
  turnieje: state.turnieje,
  game: state.game,
  user: state.user,
  login: state.login,
});
const mapDispatch = dispatch => ({
  addGame: data => dispatch(gameActions.addGame(data)),
});

export default connect(mapState, mapDispatch)(RoundList);

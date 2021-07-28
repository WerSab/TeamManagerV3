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

const RoundList = ({turnieje, addGame, user, game, navigation}) => {
  const [selected, setSelected] = useState(new Map());
  const Item = ({id, name, selected, onSelect}) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          {backgroundColor: selected ? '#FCA542' : '#ffffff'},
        ]}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  const filteredPlayer = user.filter(item => item.login === '2');
  const {id} = filteredPlayer[0];

  const setGameToDB = () => {
    let itemToSet = {
      id: game.length,
      round: selected,
      player: id,
    };
    addGame(itemToSet);
    console.log('tablica', game.length);
    for (let i = 0; i < game.length; i++) {
      console.log('tablica_game', game[i]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={turnieje}
        renderItem={({item}) => (
          <Item
            id={item.id}
            name={item.name}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
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
});
const mapDispatch = dispatch => ({
  addGame: data => dispatch(gameActions.addGame(data)),
});

export default connect(mapState, mapDispatch)(RoundList);

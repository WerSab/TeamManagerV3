import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {gameActions} from '../store';

const RoundList = ({turnieje, addGame, user, game}) => {
  const [round, setRound] = useState(turnieje);
  const [selectedRound, setSelectedRound] = useState([]);
  const [filteredPlayer, setFilteredPlayer] = useState([]);

  const setGameToDB = () => {
    let itemToSet = {
      id: game.length,
      game: selectedRound,
      player: filteredPlayer,
    };
    addGame(itemToSet);
    console.log('tablica', game.length);
    for (let i = 0; i < game.length; i++) {
      console.log('tablica_game', game[i]);
    }
  };

  const FilteredPlayer = () => {
    user.filter(item => item.login === '2');
    setFilteredPlayer(item.id);
    console.log('filtered player: ', item.id);
  };

  const renderRound = ({item, index}) => {
    const {name, id} = item;
    const isRoundSelected = selectedRound.filter(item => item === id).length > 0;

const RoundList = ({turnieje, addMojeTurnieje}) => {
  const [selected, setSelected] = useState(new Map());

  const Item = ({ id, name, selected, onSelect }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (isRoundSelected) {
              setSelectedRound(item => item.filter(item => item !== id));
              setGameToDB(id);
            } else {
              setSelectedRound(item => [...item, id]);
            }
          }}
          style={[styles.item, isRoundSelected && {backgroundColor: 'grey'}]}>
          <Text style={{color: isRoundSelected ? 'white' : 'grey'}}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <View style={styles.container}>
      <FlatList data={round} renderItem={renderRound} />
      <TouchableOpacity style={styles.buttonClose}>
        <Text style={styles.textButton}>accept</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    width: '100%',
    height: 40,
    fontSize: 20,
    textAlign: 'center',
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
  // setData: data => dispatch(recepiesActions.setData(data)),
  addGame: data => dispatch(gameActions.addGame(data)),
});

export default connect(mapState, mapDispatch)(RoundList);
=======
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
const mapState = (state) => ({
  turnieje: state.turnieje
})
export default connect(mapState) (RoundList);
>>>>>>> d9572cf361ad53b5ab183bb619a219589f411ef1

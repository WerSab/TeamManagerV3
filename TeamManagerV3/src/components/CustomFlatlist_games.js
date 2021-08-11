import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
  Modal,
  Input,
} from 'react-native';
import {connect} from 'react-redux';
import {gameActions} from '../store';
import deleteIcon from '../../assets/icons/delete.png/';

const CustomFlatList_games = ({
  game,
  gamePlayerID,
  deleteElement,
  withSearchbar,
}) => {
  const [flatListData, setFlatListData] = useState(game);
  console.log('flatListData - data', flatListData)
  console.log('game - data', game)
  console.log('gamePlayerID', gamePlayerID)
  const deleteAlert = (gameID, name) => {
    Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'Ok', onPress: () => deleteElement(gameID)},
    ]);
  };

  
  const renderItem = item => {
    return (
      <View style={styles.container} key={item.gameID.toString()}>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.text}>
           {item.round}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteAlert(item.gameID, item.round, item.gamePlayerID)}
          style={styles.image}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* gdybyśmy wyrenderowali to jako ListHeaderComponent to by nam się za każdą literką przeładowywało */}
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData}
        gamePlayerID={gamePlayerID} 
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1}}
      />
    </View>
  );
};
const mapState = state => ({
  game: state.game,
});
const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(gameActions.deleteElement(id)),
  clearItems: () => dispatch(gameActions.clearItems()),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: -5,
    paddingHorizontal: -5,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'space-between',
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
    backgroundColor: '#CCCCCC',
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
export default connect(mapState, mapDispatch)(CustomFlatList_games);

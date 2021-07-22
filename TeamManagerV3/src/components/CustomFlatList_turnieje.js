import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {turniejeActions} from '../store';
import {userActions} from '../store';
import deleteIcon from '../../assets/icons/delete.png/';
import CustomFlatList_team from './CustomFlatList_team';

const CustomFlatList_turnieje = ({
  //propsy do flatlisty
  data,
  category,
  deleteElement,
  withSearchbar,
  turnieje,
  user,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flatListData, setFlatListData] = useState(data);
  const [roundListData, setRoundListData] = useState(data);
  const [searchInputValue, setSearchInputValue] = useState('');

  const deleteAlert = (id, name) => {
    Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'Ok', onPress: () => deleteElement(id)},
    ]);
  };

  const renderSearchBar = () => {
    //formularz wyszukiwania
    return (
      //return do searchBaru
      <TextInput
        inlineImageLeft="search_icon"
        inlineImagePadding={5}
        clearButtonMode="while-editing"
        value={searchInputValue}
        onChangeText={text => {
          searchFilterFunction(text); //podpięta funkcja wyszukiwania
        }}
        placeholder="Wyszukaj..."
        placeholderTextColor="gray"
      />
    );
  };
  const searchFilterFunction = text => {
    //funkcja wyszukiwania
    const newData = data?.filter(item => {
      const itemData = item.name.toLowerCase().trim(); //zamian tekstu na małe litery
      const textData = text.toLowerCase();
      return itemData.includes(textData);
    });
    setSearchInputValue(text);
    setFlatListData(newData);
  };

  const RoundCard = (selectedId) => {
    const rounds = data?.filter(item => {
      const itemData = item.id
      const idData = selectedId
      return itemData === idData
    })
    setRoundListData(rounds)
  }

  const renderItem = item => {
    return (
      <>
        <View style={styles.button} key={item.id.toString()}>
          <TouchableOpacity
            style={styles.name}
            onPress={() => {
              setIsModalVisible(true);
              RoundCard(item.id);
            }}>
            <Text numberOfLines={1} style={[styles.textStyleBig]}>
              {item.id} {item.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBreakHeight}></TouchableOpacity>

          <TouchableOpacity onPress={() => deleteAlert(item.id, item.name)}>
            <Image source={deleteIcon} style={styles.icon} />
          </TouchableOpacity>



          <FlatList
                  data={item.playersId}
                  renderItem={({ item }) => <Text>{item.id}</Text>}
                  keyExtractor={item => item.id}
                />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => setIsModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableOpacity>
              <Text style={styles.textStyleBig}>Round Card</Text>
              <FlatList
                data={roundListData}
                category={category}
                // ListHeaderComponent={renderSearchBar || null}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                style={{flex: 1}}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                  }}>
                  <Text style={styles.textButton}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonSafe}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                  }}>
                  <Text style={styles.textButton}>Safe</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData}
        category={category}
        renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 2}}
        withSearchbar={true}
      />
    </View>
  );
};

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(turniejeActions.deleteElement(id)),
});

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    marginLeft: 4,
  },
  nameContainer: {
    flexBasis: '50%',
    backgroundColor: '#2a343f',
    borderRadius: 5,
    justifyContent: 'center',
  },
  imageContainer: {
    flexBasis: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonJoin: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: 'flex-end',
    elevation: 2,
    width: 30,
    backgroundColor: '#f8fc05',
    justifyContent: 'flex-end',
  },
  buttonConfirm: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: 'flex-end',
    elevation: 2,
    width: 55,
    backgroundColor: '#32fc05',
  },

  button: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: -5,
    paddingHorizontal: -5,
    elevation: 1,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'space-between',
  },

  textStyleBig: {
    color: 'black',
    fontSize: 18,

    textAlign: 'center',
  },

  date: {
    color: 'black',
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
  },
  name: {
    fontSize: 12,
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 20,
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
});
export default connect(mapState, mapDispatch)(CustomFlatList_turnieje);

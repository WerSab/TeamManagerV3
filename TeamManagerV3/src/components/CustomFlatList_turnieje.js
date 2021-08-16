import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
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

  const RoundCard = selectedId => {
    const rounds = data?.filter(item => {
      const itemData = item.id;
      const idData = selectedId;
      return itemData === idData;
    });
    setRoundListData(rounds);
  };

  const renderItem = item => {
    return (
      <>
        <View key={item.id.toString()}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
              RoundCard(item.id);
            }}
            style={[styles.container, {backgroundColor: '#ffffff'}]}>
            <Text numberOfLines={1} style={styles.text}>{item.name}
            </Text>

            <TouchableOpacity onPress={() => deleteAlert(item.id, item.name)}>
              <Image source={deleteIcon} style={styles.icon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData}
        category={category}
        renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1}}
      />
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
    </SafeAreaView>
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
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: -10,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'space-between',
  },

  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
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
export default connect(mapState, mapDispatch)(CustomFlatList_turnieje);

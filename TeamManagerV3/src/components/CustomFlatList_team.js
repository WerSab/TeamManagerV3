import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
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
import {userActions} from '../store';
import {turniejeActions} from '../store';
import deleteIcon from '../../assets/icons/delete.png/';

const CustomFlatList_team = ({
  data,
  user,
  game,
  turnieje,
  category,
  login,
  deleteElement,
  withSearchbar,
}) => {
  const [flatListData, setFlatListData] = useState(data);
  const [searchInputValue, setSearchInputValue] = useState('');

  const renderSearchBar = () => {
    return (
      <TextInput
        inlineImageLeft="search_icon"
        inlineImagePadding={5}
        clearButtonMode="while-editing"
        value={searchInputValue}
        onChangeText={text => {
          searchFilterFunction(text);
        }}
        placeholder="Wyszukaj..."
        placeholderTextColor="gray"
      />
    );
  };

  const searchFilterFunction = text => {
    const newData = data?.filter(item => {
      const itemData = item.name.toLowerCase().trim();
      const textData = text.toLowerCase();
      return itemData.includes(textData);
    });
    setSearchInputValue(item);
    setFlatListData(newData);
  };

  const renderItem = item => {
    return (
      <View key={item.id.toString()}>
        <TouchableOpacity
          
          style={[styles.container, {backgroundColor: '#ffffff'}]}>
          <Text style={styles.text}>
            ID: {item.id} {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* gdybyśmy wyrenderowali to jako ListHeaderComponent to by nam się za każdą literką przeładowywało */}
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData}
        category={category}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1}}
      />
    </SafeAreaView>
  );
};

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(userActions.deleteElement(id)),
  clearItems: () => dispatch(userActions.clearItems()),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
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
export default connect(null, mapDispatch)(CustomFlatList_team);

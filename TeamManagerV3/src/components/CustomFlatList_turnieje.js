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
import deleteIcon from '../../assets/icons/delete.png/';

const CustomFlatList_turnieje = ({
  //propsy do flatlisty
  category,
  deleteElement,
  withSearchbar,
  turnieje,
  user,
  data,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flatListData, setFlatListData] = useState(data);
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

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.item, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteAlert(item.id, item.name)}
          style={[styles.item, backgroundColor]}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => {
    const backgroundColor = '#d6d1d6';
    const color = 'black';
    return (
      <Item
        item={item}
        onPress={() => setIsModalVisible(true)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View>
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    flexDirection: 'column',
    borderRadius: 10,
    paddingVertical: -5,
    paddingHorizontal: -5,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'space-between',
  },
  row: {
    flex: 2,
    flexDirection: 'row',
    
  },
  item: {
    
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 3,
  },
  title: {
    fontSize: 15,
  },
});
export default connect(mapState, mapDispatch)(CustomFlatList_turnieje);

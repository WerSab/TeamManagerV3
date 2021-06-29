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
} from 'react-native';
import {connect} from 'react-redux';
import {turniejeActions} from '../store';
import deleteIcon from '../../assets/icons/delete.png/';

const CustomFlatList = ({
  //propsy do flatlisty
  data,
  category,
  backgroundColor,
  textColor,
  deleteElement,
  withSearchbar,
}) => {
  const [flatListData, setFlatListData] = useState(data);
  const [searchInputValue, setSearchInputValue] = useState('');

  const deleteAlert = (id, name) => {
    Alert.alert(
      "Delete alert",
      `Do You want to delete ${name}?`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
        { text: 'Ok', onPress: () => deleteElement(id) },
      ]
    )
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
  const renderItem = element => {
    return (
      <View style={styles.itemContainer} key={element.id.toString()}>
        <TouchableOpacity style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity style={[styles.buttonID]}>
          <Text numberOfLines={1} style={[styles.date]}>
            {element.id}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonDate]}>
          <Text numberOfLines={1} style={[styles.date]}>
            {element.date}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity style={styles.buttonCity}>
          <Text numberOfLines={1} style={[styles.city, {color: textColor}]}>
            {element.city}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBreak}></TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(element.link)}
          style={styles.nameContainer}>
          <Text numberOfLines={1} style={[styles.name, {color: textColor}]}>
            {element.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteAlert(element.id, element.name)}
          style={styles.imageContainer}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    //return do flatListy
    <View style={[{backgroundColor: backgroundColor}, styles.container]}>
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData}
        category={category}
        renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1}}
        withSearchbar={true}
      />
    </View>
  );
};

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(turniejeActions.deleteElement(id)),
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 4,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 6,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
  },
  nameContainer: {
    flexBasis: '50%',
    backgroundColor: '#2a343f',
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flexBasis: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: 'flex-end',
    elevation: 2,
    width: 90,
  },
  buttonBreak: {
    width: 6,
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
    justifyContent: 'flex-end',
  },
  buttonDate: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    width: 60,
  },
  buttonID: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    width: 20,
    borderRadius: 5,
  },
  buttonCity: {
    borderRadius: 5,
    paddingVertical: -5,
    paddingHorizontal: -5,
    elevation: 1,
    width: 50,
    backgroundColor: '#b20505',
    justifyContent: 'flex-end',
  },
  textStyle: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    color: 'black',
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
  },
  name: {
    fontSize: 12,
    letterSpacing: 1,
    paddingHorizontal: 5,
  },

  city: {
    fontSize: 12,
    letterSpacing: 1,
    paddingHorizontal: 1,
  },

  icon: {
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
});
export default connect(null, mapDispatch)(CustomFlatList);

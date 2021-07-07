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
import {userActions} from '../store';
import deleteIcon from '../../assets/icons/delete.png/';

const CustomFlatList_team = ({
  data,
  category,
  deleteElement,
  withSearchbar
}) => {

  const [flatListData, setFlatListData] = useState(data)
  const [searchInputValue, setSearchInputValue] = useState('')

  const deleteAlert = (id, lastName) => {
    Alert.alert(
      "Delete alert",
      `Do You want to delete ${lastName}?`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
        { text: 'Ok', onPress: () => deleteElement(id) },
      ]
    )
  };

  const renderSearchBar = () => {
    return (
      <TextInput inlineImageLeft="search_icon"
        inlineImagePadding={5}
        clearButtonMode="while-editing"
        value={searchInputValue}
        onChangeText={text => {
          searchFilterFunction(text)
        }}
        placeholder="Wyszukaj..."
        placeholderTextColor="gray" 
        />
       
    )
  }

  const searchFilterFunction = (text) => {
    const newData = data?.filter(item => {
      const itemData = item.name.toLowerCase().trim()
      const textData = text.toLowerCase()
      return itemData.includes(textData)
    })
    setSearchInputValue(text);
    setFlatListData(newData)
  }

  const renderItem = element => {
    return (
      
      <View style={styles.container} key={element.id.toString()}>
        
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.text}>
            {element.id}
          </Text>
        </TouchableOpacity>
         <TouchableOpacity>
          <Text numberOfLines={1} style={styles.text}>
            {element.firstName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.text}>
            {element.lastName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteAlert(element.id, element.lastName)}
          style={styles.image}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
     
    );
  };

  return (
    <View style={ styles.container}>
      {/* gdybyśmy wyrenderowali to jako ListHeaderComponent to by nam się za każdą literką przeładowywało */}
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData}
        category={category}
        // ListHeaderComponent={renderSearchBar || null}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(userActions.deleteElement(id)),
});
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: -5,
    paddingHorizontal: -5,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'space-between',
  },

  text:{
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image:{
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
  icon:{
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
  
});
export default connect(null, mapDispatch)(CustomFlatList_team);

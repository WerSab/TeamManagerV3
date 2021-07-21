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
import {userActions} from '../../store';
import {turniejeActions} from '../../store';
import SelctableTurniejeList from '../SelctableTurniejeList';
import deleteIcon from '../../../assets/icons/delete.png';

const PlayerCard = ({
  
  data,
  turnieje,
  category,
  deleteElement,
  isSelected,
  withSearchbar,
  user,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const playerCard=user.filter(item=>item.isSelected === true)

  const deleteAlert = (id, lastName) => {
    Alert.alert('Delete alert', `Do You want to delete ${lastName}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'Ok', onPress: () => deleteElement(id)},
    ]);
  };

  const renderItem = item => {
    return (
      <View style={styles.container} key={item.id.toString()}>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
          }}>
          <Text numberOfLines={1} style={styles.text}>
            {item.id} {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteAlert(item.id, item.lastName)}
          style={styles.image}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
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
              <Text numberOfLines={1} style={styles.text}>
                Dodaj turniej
              </Text>
              <SelctableTurniejeList
                data={turnieje}
                borderRadius="20"
                backgroundColor="white"
                textColor="white"
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
      
      <FlatList
        data={playerCard}
        category={category}
        // ListHeaderComponent={renderSearchBar || null}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
      />
    </View>
  );
};
const mapState = (state) => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(userActions.deleteElement(id)),
  selectedItem: id => dispatch(userActions.selectedItem(id)),
  clearItems: () => dispatch(userActions.clearItems()),
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
export default connect(mapState, mapDispatch)(PlayerCard);

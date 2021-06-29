import React, {useState} from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text,
  TextInput,
} from 'react-native';
import CustomFlatList from '../CustomFlatList_team';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {userActions} from '../../store';
import addIcon from '../../../assets/icons/add.png';
import moreIcon from '../../../assets/icons/more.png';

const Team = ({user, addUser, navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [secondNameInput, setSecondNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedValue, setSelectedValue] = useState('Team');

  const clearInputs = () => {
    setFirstNameInput('');
    setSecondNameInput('');
    setEmailInput('');
  };

  const setUserToDB = () => {
    let itemToSet = {
      category: selectedValue,
      id: user.length,
      firstName: firstNameInput,
      secondName: secondNameInput,
      email: emailInput,
    };
    addUser(itemToSet);
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        {isModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
            onBackdropPress={() => setIsModalVisible(false)}
            onBackButtonPress={() => setIsModalVisible(false)}>
            <View style={styles.centeredView}>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 150}}
                onValueChange={itemValue => setSelectedValue(itemValue)}>
                <Picker.Item label="Kategoria" value="  " />
                <Picker.Item label="Zawodnik" value="zawodnik" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
              <TextInput
                style={styles.input}
                onChangeText={setFirstNameInput}
                value={firstNameInput}
                placeholder="Imię..."
              />
              <TextInput
                style={styles.input}
                onChangeText={setSecondNameInput}
                value={secondNameInput}
                placeholder="Nazwisko..."
              />
              <TextInput
                style={styles.input}
                onChangeText={setEmailInput}
                value={emailInput}
                placeholder="Email..."
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                    setSecondNameInput('');
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSafe]}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                    clearInputs();
                    setUserToDB();
                  }}>
                  <Text style={styles.textStyle}>Safe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.icon} source={moreIcon} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textTeam}>Zawodnicy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image style={styles.icon} source={addIcon} />
          </TouchableOpacity>
        </View>

        <CustomFlatList
          data={user}
          category="Zawodnik"
          borderRadius="20"
          backgroundColor="#212933"
          textColor="white"
          withSearchbar={true}
        />
      </View>
    </>
  );
};

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  
  addUser: data => dispatch(userActions.addUser(data)),
});

export default connect(mapState, mapDispatch)(Team);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#33383C',
    width: '100%',
    borderRadius: 10,
  },
  buttonLogo: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#141518',
    width: '100%',
  },
  buttonWelcome: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#33383C',
    color: 'white',
    width: '20%',
  },
  icon: {
    height: 40,
    width: 40,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: '10%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //elevation: 2,
    width: 120,
  },
  buttonClose: {
    backgroundColor: '#CCCCCC',
  },
  buttonSafe: {
    backgroundColor: '#94B444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTeam: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
    textAlign: 'center',
    letterSpacing: 4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    marginLeft: 4,
  },
  picture: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '70%',
    marginLeft: 4,
  },
});

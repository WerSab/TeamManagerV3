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
import CustomFlatList_turnieje from '../CustomFlatList_turnieje';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {turniejeActions} from '../../store';
import addIcon from '../../../assets/icons/add.png';
import moreIcon from '../../../assets/icons/more.png';

const Turniej = ({turnieje, addTurniej, navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [hourInput, setHourInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [selectedValue, setSelectedValue] = useState('Turniej');

  const clearInputs = () => {
    setNameInput('');
    setDateInput('');
    setHourInput('');
    setCityInput('');
    setLinkInput('');

  };

  const setTurniejToDB = () => {
    let itemToSet = {
      id: turnieje.length,
      category: selectedValue,
      date: dateInput,
      hour: hourInput,
      name: nameInput,
      city: cityInput,
      link: linkInput,
    };
    addTurniej(itemToSet);
    console.log(itemToSet)
  };
  
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
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
                <Picker.Item label="Turniej" value="turniej" />
                <Picker.Item label="Liga" value="liga" />
              </Picker>
              <TextInput
                style={styles.input}
                onChangeText={setDateInput}
                value={dateInput}
                placeholder="Termin..."
              />
              <TextInput
                style={styles.input}
                onChangeText={setHourInput}
                value={hourInput}
                placeholder="Godzina..."
              />
              <TextInput
                style={styles.input}
                onChangeText={setNameInput}
                value={nameInput}
                placeholder="Nazwa..."
              />
              <TextInput
                style={styles.input}
                onChangeText={setCityInput}
                value={cityInput}
                placeholder="Miejsce..."
              />
              <TextInput
                style={styles.input}
                onChangeText={setLinkInput}
                value={linkInput}
                placeholder="Link do strony..."
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
                    setNameInput('');
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSafe]}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                    clearInputs();
                    setTurniejToDB();
                  }}>
                  <Text style={styles.textStyle}>Safe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        

        <CustomFlatList_turnieje
          data={turnieje}
          category="Turniej"
          borderRadius="20"
          backgroundColor="#212933"
          textColor="white"
          withSearchbar={true}
        />
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.icon} source={moreIcon} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textTeam}> </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image style={styles.icon} source={addIcon} />
          </TouchableOpacity>
        </View>
    </>
  );
};

const mapState = state => ({
  turnieje: state.turnieje,
});

const mapDispatch = dispatch => ({
  // setData: data => dispatch(recepiesActions.setData(data)),
  addTurniej: data => dispatch(turniejeActions.addTurniej(data)),
});

export default connect(mapState, mapDispatch)(Turniej);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a112b',
    width: '100%',
    
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
    backgroundColor: '#FCA542',
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
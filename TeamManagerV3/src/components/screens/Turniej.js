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
    console.log(itemToSet);
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
            <View style={styles.mainBody}>
              <View style={styles.SectionStyle}>
              <Picker
                selectedValue={selectedValue}
                style={styles.inputStyle}
                onValueChange={itemValue => setSelectedValue(itemValue)}>
                <Picker.Item label="Kategoria" color="#8b9cb5" value="  " />
                <Picker.Item label="Turniej" color="#8b9cb5" value="turniej" />
                <Picker.Item label="Liga" color="#8b9cb5" value="liga" />
              </Picker>
              </View>
              <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setDateInput}
                value={dateInput}
                placeholder="Termin..."
                placeholderTextColor="#8b9cb5"
              />
              </View>
              <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setHourInput}
                value={hourInput}
                placeholder="Godzina..."
                placeholderTextColor="#8b9cb5"
              />
              </View>
              <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setNameInput}
                value={nameInput}
                placeholder="Nazwa..."
                placeholderTextColor="#8b9cb5"
              />
              </View>
              <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setCityInput}
                value={cityInput}
                placeholder="Miejsce..."
                placeholderTextColor="#8b9cb5"
              />
              </View>
              <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setLinkInput}
                value={linkInput}
                placeholder="Link do strony..."
                placeholderTextColor="#8b9cb5"
              />
              </View>
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
          withSearchbar={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image style={styles.icon} source={moreIcon} />
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
  icon: {
    height: 40,
    width: 40,
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

  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a112b',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FCA542',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

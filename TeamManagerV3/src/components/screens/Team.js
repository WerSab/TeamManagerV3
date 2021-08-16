import React from 'react';

import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CustomFlatList_team from '../CustomFlatList_team';
import {connect} from 'react-redux';
import addIcon from '../../../assets/icons/add.png';
import moreIcon from '../../../assets/icons/more.png';

const Team = ({user, navigation}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <CustomFlatList_team
          data={user}
          category="Zawodnik"
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
      </View>
    </>
  );
};
const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Team);

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
});

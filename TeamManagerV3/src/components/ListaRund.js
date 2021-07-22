import React, { useState } from 'react';
import { 
  FlatList, 
  View, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity } 
  from "react-native";
  import { connect } from 'react-redux'

const ListaRund = ({turnieje, addMojeTurnieje}) => {
  
  const [selectedId, setSelectedId] = useState(null);

  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#d6d1d6" : "e8e5e8";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View>
      
      <FlatList
        data={turnieje}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,  },
  title: {
    fontSize: 15,
  },
});

const mapState = (state) => ({
  turnieje: state.turnieje
})

export default connect(mapState) (ListaRund);
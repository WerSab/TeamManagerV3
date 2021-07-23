import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

import { connect } from 'react-redux';



const RoundList = ({turnieje, addMojeTurnieje}) => {
  const [selected, setSelected] = useState(new Map());

  const Item = ({ id, name, selected, onSelect }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#FCA542' : '#ffffff' },
        ]}
      >
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  }
 
  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={turnieje}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
const mapState = (state) => ({
  turnieje: state.turnieje
})
export default connect(mapState) (RoundList);
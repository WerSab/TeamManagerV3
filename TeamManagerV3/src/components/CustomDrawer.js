import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView 
    {...props} 
    style={{
      backgroundColor: 'white'}}>
      <DrawerItemList
        {...props}
        itemStyle={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
          borderRadius: 20,
          fontSize: 20,
          paddingLeft: 14,
          margin: 20,
          height: 70,
          justifyContent: 'center',
        }}
        labelStyle={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'SFUIDisplay-Regular',
          marginTop: 0,
          marginLeft: 20,
          marginTop: -10,
          marginBottom: -10,
        }}
      />
     
      <DrawerItem
        style={{paddingLeft: 24}}
        labelStyle={{fontSize: 20, color: 'black', fontWeight: 'bold',}}
        label="Exit"
        activeTintColor="black"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;

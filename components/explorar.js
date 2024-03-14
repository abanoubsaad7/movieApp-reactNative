import React from 'react';
import {View, StyleSheet , Text, Button} from 'react-native';

const Explorar = () => {
  return (
    <View style={styles.explorarContainer}>
      <Text style={{color:'white' , fontSize: 20}}>Bienvenido a Movie+</Text>
      <Text style={{color:'white' , fontSize: 20}}>Lorem ipsum dolor sit amet consectetur</Text>
      <View style={{width:275 , height:38 }}>
        <Button title='Explorar' color='rgba(137, 42, 236, 0.3)'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  explorarContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
})

export default Explorar;

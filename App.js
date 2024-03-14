// App.js
import React from 'react';
import {View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import NowPlayingMovie from './components/nowPlayingMovie';
import MyList from './components/myList';
import TopRate from './components/topRated';
import SVGBackground from './components/SVGBackground';
import Explorar from './components/explorar';
import Nuevosestrenos from './components/Nuevosestrenos';
import PeliculasTop from './components/PeliculasTop';
import TopTen from './components/topTen';

const App = () => {
  return (
    <SVGBackground>
      <ScrollView style={styles.container}>
        <View style={{height:Dimensions.get('window').height}}>
          <NowPlayingMovie />
        </View>
        <View style={{ height: 250, marginVertical: 50 }}>
          <MyList />
        </View>
        <View style={{ height: 470 }}>
          <TopRate />
        </View>
        <View style={{width:Dimensions.get('window').width}}>
          <Explorar/>
        </View>
        <View>
          <Nuevosestrenos/>
        </View>
        <View>
          <PeliculasTop/>
        </View>
        <View>
          <TopTen/>
        </View>
      </ScrollView>
    </SVGBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
  },
});

export default App;

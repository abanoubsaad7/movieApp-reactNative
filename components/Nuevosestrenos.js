import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ScrollView,
} from "react-native";

const Nuevosestrenos = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY4NDFlN2JlMDIyZTNjYmY2MTUyNmQxNzU4YzM4NSIsInN1YiI6IjY1ODMwODIyMTgwZGVhNTMwYThiZWQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2UYmqYIvAnYLRiNFocDzFWwWeY3OQNY9rnSHGtwDMk'
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        console.log('response.results.length :>> ', response.results.length);
        setUpcoming(response.results);
      })
      .catch(err => console.error(err));
  }, []);

  const { width } = Dimensions.get("window");
  

  const renderUpcoming = () => {
    return upcoming.map((item) => (
      <View key={item.id} style={styles.itemContainerUpcoming}>
        <Image
          style={{ width: 220, height: 130 }}
          resizeMode="cover"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        />
      </View>
    ));
  };

  return (
    <View style={styles.mainContainerUpcoming}>
      <Text style={{ fontSize: 20, color: "white" }}>Nuevos estrenos</Text>
      <FlatList
        data={upcoming}
        renderItem={renderUpcoming}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerUpcoming: {
    padding: 10,
  },
  itemContainerUpcoming: {
    color: "white",
    width: 250,
    height:200,
    paddingTop:10,
  },
});

export default Nuevosestrenos;

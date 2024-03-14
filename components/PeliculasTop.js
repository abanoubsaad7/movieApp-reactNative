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

const PeliculasTop = () => {
  const [peliculasTop, setPeliculasTop] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY4NDFlN2JlMDIyZTNjYmY2MTUyNmQxNzU4YzM4NSIsInN1YiI6IjY1ODMwODIyMTgwZGVhNTMwYThiZWQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2UYmqYIvAnYLRiNFocDzFWwWeY3OQNY9rnSHGtwDMk'
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        console.log('response.results.length :>> ', response.results.length);
        setPeliculasTop(response.results);
      })
      .catch(err => console.error(err));
  }, []);

  const { width } = Dimensions.get("window");
  

  const renderPeliculasTop = () => {
    return peliculasTop.map((item) => (
      <View key={item.id} style={styles.itemContainerPeliculasTop}>
        <Image
          style={{ width: 130, height: 220 }}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        />
      </View>
    ));
  };

  return (
    <View style={styles.mainContainerPeliculasTop}>
      <Text style={{ fontSize: 20, color: "white" }}>Peliculas Top</Text>
      <FlatList
        data={peliculasTop}
        renderItem={renderPeliculasTop}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerPeliculasTop: {
    padding: 10,
  },
  itemContainerPeliculasTop: {
    color: "white",
    width: 130,
    height:270,
    margin:10
  },
});

export default PeliculasTop;

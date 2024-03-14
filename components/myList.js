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

const MyList = () => {
  const [myMovieList, setMyMovieList] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY4NDFlN2JlMDIyZTNjYmY2MTUyNmQxNzU4YzM4NSIsInN1YiI6IjY1ODMwODIyMTgwZGVhNTMwYThiZWQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2UYmqYIvAnYLRiNFocDzFWwWeY3OQNY9rnSHGtwDMk",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMyMovieList(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  const { width } = Dimensions.get("window");
  

  const renderMyList = () => {
    return myMovieList.map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <Image
          style={{ width: 135, height: 135 }}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        />
        <View>
          <Text style={{ color: "white" }}>{item.title}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={{ fontSize: 20, color: "white" }}>my list</Text>
      <FlatList
        data={myMovieList}
        renderItem={renderMyList}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  itemContainer: {
    color: "white",
    width: 130,
    margin:10
  },
});

export default MyList;

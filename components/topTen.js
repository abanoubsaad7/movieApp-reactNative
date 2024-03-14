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

const TopTen = () => {
  const [topTen, setTopTen] = useState([]);
  
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
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("response.results.length :>> ", response.results.length);
        setTopTen(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  const { width } = Dimensions.get("window");

  const renderTopTen = () => {
    return topTen.map((item, index) => {
        return (
          <View key={item.id} style={styles.itemContainerTopTen}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>#{index + 1}</Text>
            </View>
            <Image
              style={{ width: 135, height: 220 }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
          </View>
        );
      
    });
  };

  return (
    <View style={styles.mainContainerTopTen}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.5)" }}>
          Nuestro Top 10
        </Text>
        <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
          Bienvenido a Movie+
        </Text>
        <Text style={{ fontSize: 15, color: "rgba(255, 255, 255, 1)" }}>
          Lorem ipsum dolor sit amet consectetur
        </Text>
      </View>
      <FlatList
        data={topTen}
        renderItem={renderTopTen}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerTopTen: {
    padding: 10,
  },
  itemContainerTopTen: {
    color: "white",
    width: 130,
    height: 470,
    margin: 10,
  },
  numberContainer: {
    position: "relative",
    top: 10,
    left: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width:50,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    zIndex:2,
    
  },
  numberText: {
    color: "black",
    fontSize: 14,
  },
});

export default TopTen;

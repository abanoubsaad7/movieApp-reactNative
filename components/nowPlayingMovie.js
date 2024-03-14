import React, { useEffect, useState, useRef } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const NowPlayingMovie = () => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Get movie info when the component mounts
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
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&results=5",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("data fetched successfully");
        const limitedResults = response.results.slice(0, 6);

        setMovieInfo(limitedResults);
      })
      .catch((err) => console.error(err));
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % movieInfo.length;
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        setCurrentIndex(nextIndex);
      }
    }, 5000); // Change the interval according to your preference (e.g., 5000 milliseconds or 5 seconds)
    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [currentIndex, movieInfo]);

  const onScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffset / Dimensions.get("window").width);
    setCurrentIndex(index);
  };

  const { width, height } = Dimensions.get("window");

  const renderItem = ({ item }) => (
    <View style={{ ...styles.backgroundImageContainer, width }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      >
        <View style={styles.overlay}>
          <Text style={{ fontSize: 20, color: "white" }}>Movie+</Text>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieDes}>{item.overview}</Text>
        </View>
      </ImageBackground>
      <View style={styles.borderView} />
    </View>
  );
  

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {movieInfo.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationDot,
            { backgroundColor: index === currentIndex ? "white" : "gray" },
          ]}
          onPress={() => {
            flatListRef.current.scrollToIndex({ animated: true, index });
          }}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ ...styles.bar, width }}>
        <TouchableOpacity style={styles.burgerMenu}>
          <Icon name="bars" size={50} color="white" />
        </TouchableOpacity>
        <View style={styles.searchIcon}>
          <View>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Icon name="search" size={50} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={styles.userImg}
              source={require("../assets/IMG20230613233501.jpg")}
            />
          </View>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        data={movieInfo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={onScrollEnd}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  backgroundImageContainer: {
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(137, 42, 236, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  borderView:{
    height:10,
    opacity:0.5,
  },
  movieTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  movieDes: {
    color: "white",
    width: "50%",
    height: 50,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 15,
    height: 15,
    borderRadius: 7,
    marginHorizontal: 7,
  },
  bar: {
    position: "absolute",
    top: 40,
  },
  burgerMenu: {
    position: "absolute",
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  searchIcon: {
    position: "absolute",
    right: 7,
    zIndex: 1,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userImg: {
    width: 50,
    height: 50,
    borderColor: "#892AEC",
    borderWidth: 2,
    borderRadius: 25,
  },
});

export default NowPlayingMovie;

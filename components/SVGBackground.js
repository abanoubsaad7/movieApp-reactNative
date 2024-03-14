// SVGBackground.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const SVGBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      <Svg style={styles.gradientOverlay} height="100%" width="100%">
        <Defs>
          <LinearGradient id="grad" y1="100%"  y2="0%">
            <Stop offset="100%" style={{ stopColor: '#0A071E', stopOpacity: 1 }} />
            <Stop offset="50%" style={{ stopColor: '#892AEC99' , stopOpacity: 1  }} />
            <Stop offset="25%" style={{ stopColor: '#3F46B9' , stopOpacity:1 }} />
            <Stop offset="0%" style={{ stopColor: '#D9D9D900', stopOpacity: 1 }} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

export default SVGBackground;

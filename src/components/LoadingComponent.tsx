import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import CUSTOM_COLOR from '../constants/color';


const LoadingComponent = (props: any) => (
  <View style={styles.container}>
    <ActivityIndicator
      //style={styles.loadingContainer}
      size="large"
      color={CUSTOM_COLOR.FlushOrange}
    />
    {props.text && <Text style={styles.text}>{props.text}</Text>}
  </View>
);
export default LoadingComponent

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
  },
});
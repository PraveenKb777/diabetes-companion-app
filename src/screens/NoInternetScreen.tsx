import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoInternetScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
      <Text style={styles.subtext}>Kindly turn on internet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 24},
  subtext: {fontSize: 18, marginTop: 10},
});

export default NoInternetScreen;

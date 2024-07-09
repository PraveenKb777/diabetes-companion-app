import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={'#0075FF'} />
    </SafeAreaView>
  );
};

export default Loading;

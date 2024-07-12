import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../Stack';

const InternetChecker: React.FC = ({children}) => {
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        navigation.navigate('NoInternetScreen');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return <>{children}</>;
};

export default InternetChecker;

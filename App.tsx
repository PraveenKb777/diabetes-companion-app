import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigator from './src/Stack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigator from './src/Stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetProvider} from './src/context/BottomSheetContext';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <BottomSheetProvider>
          <StackNavigator />
        </BottomSheetProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

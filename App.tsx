import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigator from './src/Stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetProvider} from './src/context/BottomSheetContext';
import {setNavigator} from './src/utils/auth';

import {StackNavigation} from './src/Stack';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer
        ref={navigator => setNavigator(navigator as StackNavigation)}>
        <BottomSheetProvider>
          <StackNavigator />
        </BottomSheetProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

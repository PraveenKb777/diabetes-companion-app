import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CMPSvg, EducationSvg, HomeSvg, RiskFinderSvg} from './assets/Svg';
import Home from './screens/Home';
import {Text} from 'react-native';
import Education from './screens/Education';
import RiskFinder from './screens/RiskFinder';
import CMP from './screens/CMP';

const {Navigator, Screen} = createBottomTabNavigator();

const getTabOptions = (
  SVG: any,
  title: string,
  isHeader: boolean = false,
): BottomTabNavigationOptions => {
  return {
    headerShown: isHeader,
    tabBarLabel: ({focused}) => (
      <Text
        style={[
          //   styles.icon,,
          {
            color: focused ? '#0075FF' : '#000B2170',
          },
        ]}>
        {title}
      </Text>
    ),
    tabBarIcon: ({focused, size}) => (
      <SVG
        color={focused ? '#0075FF' : '#000B2170'}
        style={[
          //   styles.icon,
          {
            width: size,
            height: size,
          },
        ]}
      />
    ),
  };
};

export function TabNavigator() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={getTabOptions(HomeSvg, 'Home')}
      />
      <Screen
        name="Education"
        component={Education}
        options={getTabOptions(EducationSvg, 'Education')}
      />
      <Screen
        name="RiskFinder"
        component={RiskFinder}
        options={getTabOptions(RiskFinderSvg, 'Risk Finder')}
      />
      <Screen
        name="CMP"
        component={CMP}
        options={getTabOptions(CMPSvg, 'CMP')}
      />
    </Navigator>
  );
}

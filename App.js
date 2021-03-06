//import main file
import React from "react";
//import navigation styles and techniques
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
//import all screens (6 screens)
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
//context provider
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { exp } from "react-native-reanimated";
//for navigation from signup to main flow
import { setNavigator } from "./src/navigationRef";
//Loding screen
import resolveAuthScreen from "./src/screens/resolveAuthScreen";
//Location context
import {Provider as LocationProvider} from "./src/context/LocationContext";
//for saving tracks to api
import {Provider as TrackProvider} from "./src/context/TrackContext";

//Virtual flow is present in flowDigram directory

const switchNavigator = createSwitchNavigator({
  ResolveAuth: resolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen,
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
    <LocationProvider>
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
    </LocationProvider>
    </TrackProvider>
  );
};

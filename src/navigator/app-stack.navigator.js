import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { APP_TYPE } from '../constants/navigate.constants';
import { Image } from 'react-native';
import LogoHeader from '../components/logo_header.components';

import QuizScreen from '../screens/quiz.screen';
import ThankyouScreen from '../screens/thankyou.screen';
import WelcomeScreen from '../screens/welcome.screen';
import LoginScreen from '../screens/login.screen';
import contLogo from  '../assets/images/cont-logo.png';

export const Stack = createNativeStackNavigator();
const AppStackNavigator = () =>{
  return (
      <Stack.Navigator
        screenOptions={{
            headerRight:() => null,
            headerLeft:() => null,
        }}
        initialRouteName= {APP_TYPE.welcomeScreen}
      >
        <Stack.Screen 
          name={APP_TYPE.welcomeScreen} 
          component={WelcomeScreen} 
          options={{
            header:() => null
          }}
        />

        <Stack.Screen 
          name={APP_TYPE.loginScreen} 
          component={LoginScreen} 
          initialParams = {{
            message:null
          }}
          options={{
            header:() => null
          }}
        />

        <Stack.Screen name={ APP_TYPE.quizScreen } component={QuizScreen} options={{
          headerBackVisible:false,
          headerTransparent:true,
          header:() => <LogoHeader/>
        }}
        />

        <Stack.Screen name={APP_TYPE.thankYouScreen } component={ThankyouScreen} options={{
          header:() => null
        }}/>
      </Stack.Navigator>
  );
}

export default AppStackNavigator;
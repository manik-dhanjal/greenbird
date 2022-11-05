import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PENDING } from '../constants/request.constants';

import SpinnerWrapper from '../components/spinner.component';
import AppStackNavigator from './app-stack.navigator';

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <SpinnerWrapper isActive={currentUser.status === PENDING}> */}
        {/* {currentUser.data ? <AppStackNavigator/>:<AuthStackNavigator/>} */}
        <AppStackNavigator/>
      {/* </SpinnerWrapper> */}
    </NavigationContainer>
  );
}

export default Navigator;
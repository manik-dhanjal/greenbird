import { ImageBackground, Image,StyleSheet, View } from 'react-native'
import React from 'react'
import bg from "../assets/images/bg.jpg";
import welcomeCreative from "../assets/images/welcome-creative.png"
import welcomeBtn from "../assets/images/welcome-btn.png"
import { APP_TYPE } from '../constants/navigate.constants';
import Button from "../components/button.components";
import contLogo from  '../assets/images/cont-logo.png';
import GB_Utils from '../utils';

const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
    },
    header:{
        paddingHorizontal:15,
    },
    contLogoImg:{
        height:GB_Utils.scale(60),
        resizeMode:'contain',
        width:GB_Utils.scale(66)
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:GB_Utils.verticalScale(40)
    },
    bannerLogoImg:{
        width:"95%",
        height:"80%",
        resizeMode:'contain',
        marginBottom:GB_Utils.verticalScale(30)
    },
});
const WelcomeScreen = ({navigation}) => {

  const changeScreen = ()=>{
    navigation.navigate(APP_TYPE.quizScreen ,{
        screen:"login"
    });
  }

  return (
    <ImageBackground
        source={bg}
        resizeMode="cover"
        style={styles.backgroundImage}
        >
            <View style={styles.header}>
                <Image source={contLogo} style={styles.contLogoImg}/>
            </View>
            <View style={styles.container}>
                <Image
                    source={welcomeCreative}
                    style={styles.bannerLogoImg}
                />
                <Button
                    title="WELCOME"
                    onPress={changeScreen}
                    style={styles.welcomeBtn}
                />
            </View>
    </ImageBackground>
  )
}

export default WelcomeScreen
import { ImageBackground, Image,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import bg from "../assets/images/bg.jpg";
import bannerLogo from "../assets/images/ratanprash-logo.png"
import welcomeBtn from "../assets/images/welcome-btn.png"
import { APP_TYPE } from '../constants/navigate.constants';

const styles = StyleSheet.create({
    scrollview:{
        flex:1,
    },
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    bannerLogoImg:{
        width:"90%",
        height:"60%",
        resizeMode:'contain',
        maxHeight:600,
        maxWidth:600
    },
    welcomeBtn:{
        width:220,
    },
    welcomeBtnImg:{
        width:"100%",
        resizeMode:'contain',
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
        style={styles.container}
        >
            <Image
                source={bannerLogo}
                style={styles.bannerLogoImg}
            />
            <Pressable onPress={changeScreen} style={styles.welcomeBtn}>
                <Image 
                    source={welcomeBtn}
                    style={styles.welcomeBtnImg}
                />
            </Pressable>
    </ImageBackground>
  )
}

export default WelcomeScreen
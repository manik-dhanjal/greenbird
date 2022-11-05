import { ImageBackground, Image,StyleSheet, View } from 'react-native'
import React from 'react'
import bg from "../assets/images/bg.jpg";
import welcomeCreative from "../assets/images/welcome-creative.png"
import welcomeBtn from "../assets/images/welcome-btn.png"
import { APP_TYPE } from '../constants/navigate.constants';
import Button from "../components/button.components";
import contLogo from  '../assets/images/cont-logo.png';

const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
    },
    header:{
        paddingHorizontal:15,
    },
    contLogoImg:{
        height:70,
        resizeMode:'contain',
        width:66
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:40
    },
    bannerLogoImg:{
        width:"95%",
        height:"80%",
        resizeMode:'contain',
        maxHeight:600,
        maxWidth:600,
        marginBottom:30
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
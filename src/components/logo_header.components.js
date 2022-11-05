import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import contLogo from '../assets/images/cont-logo.png';
import greenbirdLogo from "../assets/images/greenbird-logo.png"
import { COLORS } from '../constants/theme.constants';
import GB_Utils from "../utils";

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={contLogo} style={styles.contLogo}/>
      <Image source={greenbirdLogo} style={styles.gbLogo}/>
    </View>
  )
}

export default LogoHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingBottom:5,
        marginBottom:20,
        width:'100%'
    },
    contLogo:{
        height:GB_Utils.verticalScale(70),
        resizeMode:'contain',
        width:GB_Utils.scale(66)
    },
    gbLogo:{
        height:GB_Utils.verticalScale(50),
        resizeMode:'contain',
        width:GB_Utils.scale(130),
        alignSelf:'center'
    }
})
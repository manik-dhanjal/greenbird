import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import contLogo from '../assets/images/cont-logo.png';
import greenbirdLogo from "../assets/images/greenbird-logo.png"
import { COLORS } from '../constants/theme.constants';

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
    },
    contLogo:{
        height:70,
        resizeMode:'contain',
        width:66
    },
    gbLogo:{
        height:50,
        resizeMode:'contain',
        width:130,
        alignSelf:'center'
    }
})
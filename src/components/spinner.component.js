import { View } from 'react-native'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme.constants'

const SpinnerWrapper = ({children,isActive}) => {
  if(!isActive) return children;
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.overlay}>
        <ActivityIndicator size={"large"} color={COLORS.orange}/>
      </View>

    </View>
  )
}

export default SpinnerWrapper

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    },
    overlay:{
        position:'absolute',
        flex:1,
        width:'100%',
        height:'100%',
        top:0,
        left:0,
        backgroundColor: COLORS.white+"80",
        justifyContent:'center',
        alignItems:'center',
        zIndex:10
    }
})
import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fffffff2',
        borderRadius:5,
        paddingHorizontal:30,
        width:'100%',
        alignItems:'center',
        maxWidth:400,
        paddingVertical:30
    },
})
const Container = ({children,style}) => {
  return (
    <View style={[styles.container,style]}>
      {children}
    </View>
  )
}

export default Container
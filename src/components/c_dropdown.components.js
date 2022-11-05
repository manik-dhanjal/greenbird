import React,{useState} from 'react'
import { StyleSheet , View, Text} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import GB_Utils from '../utils';

const DropDown = ({label,value,data,handleChange,labelStyles={},containerStyles={}, placeholder}) => {
  return (
    <View style={[styles.container,containerStyles]}>
      {
        label 
        && <Text style={[styles.label,labelStyles]}>{label}</Text>
      }
        <View style={styles.input}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) => handleChange(itemValue,itemIndex)}
              style={styles.picker}
              
            >
              <Picker.Item label={placeholder} value={""} style={{fontSize:GB_Utils.scale(14)}}/>
                {
                    data.map((item) => (
                        <Picker.Item label={item.label} value={item.value} key={item.value} style={{fontSize:GB_Utils.scale(14),}}/>
                    ))
                }
            </Picker>
        </View>
    </View>
  )
}

export default DropDown

const styles = StyleSheet.create({
    container:{
        // width:'100%'
      },
      picker:{
        color:'#000',
        fontSize: GB_Utils.scale(14),
      },
      input:{
        backgroundColor:"#ffffff",
        borderColor:"#ffffff",
          borderWidth:1,
          color:"#000",
          fontSize: GB_Utils.scale(14),
          borderRadius:5,
      },
      label:{
          marginBottom:GB_Utils.verticalScale(10),
          fontSize:GB_Utils.scale(12),
          color:"#fff",
          fontWeight:"600"
      },
})
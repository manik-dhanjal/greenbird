import React,{useState} from 'react'
import { StyleSheet , View, Text} from 'react-native'
import {Picker} from '@react-native-picker/picker';

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
              <Picker.Item label={placeholder} value={""} />
                {
                    data.map((item) => (
                        <Picker.Item label={item.label} value={item.value} key={item.value}/>
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
      },
      input:{
        backgroundColor:"#ffffff",
        borderColor:"#ffffff",
          // paddingHorizontal:15,
          // paddingVertical:8,
          borderWidth:1,
          color:"#000",
          fontSize:18,
          borderRadius:5,
      },
      label:{
          marginBottom:10,
          fontSize:18,
          color:"#fff",
          fontWeight:"600"
      },
})
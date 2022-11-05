import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import DropShadow from 'react-native-drop-shadow';
import React from 'react'
import { COLORS } from '../constants/theme.constants';
import GB_Utils from "../utils";

const styles =StyleSheet.create({  
    shadowProp:{  
        shadowOffset:{width:0, height:3},  
        shadowColor:'#171717',  
        shadowOpacity:0.4,  
        shadowRadius:2,  
    },  
      button:{  
        backgroundColor:COLORS.orange,  
        justifyContent:'center',  
        alignItems:'center',  
        // height:42, 
        minWidth:GB_Utils.scale(180),
        borderRadius:GB_Utils.scale(8),  
        height:GB_Utils.verticalScale(50),
        flexDirection:'row',
        borderColor:COLORS.white,
        borderWidth:1.5
    },  
      buttonText:{  
        color:COLORS.maroon,  
        fontSize:GB_Utils.verticalScale(20),
        fontWeight:'600'
    },  
      text:{  
        fontSize:14,  
        fontWeight:'bold',  
        lineHeight:21,  
        letterSpacing:0.25,  
    },  
    });  
const Button = ({containerStyle={},textStyle={},title="",isActive=true,onPress,isLoading=false,children,isInverted=false}) => {

  return (
      <DropShadow style={styles.shadowProp}>  
                <TouchableOpacity  
                    style={[styles.button,{
                      backgroundColor: isLoading||!isActive?'gray':(isInverted?'#fffffff2':COLORS.orange),
                      borderColor: isLoading||!isActive? 'gray' : COLORS.orange,
                    },containerStyle]}  

                    onPress={isActive && onPress}
                    disabled = {!isActive}
                  >  
                    {
                      isLoading?
                        <ActivityIndicator color={COLORS.maroon} size='large'/>:
                        (
                          children ? children
                          :<Text style={(styles.text, styles.buttonText)}>{title}</Text> 
                        )
                    }
                </TouchableOpacity>  
        </DropShadow> 
  )
}

export default Button
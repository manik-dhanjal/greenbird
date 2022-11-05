import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
import React from 'react'
import { COLORS } from '../constants/theme.constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GB_Utils from '../utils'

const MCQ = ({
    idx = null,
    question,
    all_answers,
    selected_answers,
    handleOptionSelect
}) => {

    const getOptionTextColor = (currentOption) => {
        if (selected_answers) {
            if (selected_answers===currentOption) {
                return COLORS.orange;
            } else {
                return COLORS.white;
            }
        } else {
            return COLORS.white;
        }
    }; 

    const getOptionBullet = (currentOption) => {
        if (selected_answers===currentOption) {
            return <MaterialIcons name="check" style={{color: COLORS.orange,fontSize:GB_Utils.scale(20)}} />
        } else {
            return  <View style={styles.circleIcon}/>
        }
        
    }
  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
                        Q-{typeof idx !== null && idx+1}. { question }
            </Text>
        </View>
        {   all_answers.map((option, optionIndex) => {
            return (
                <TouchableOpacity
                    key={optionIndex}
                    style={[styles.optionContainer,{
                        // backgroundColor: getOptionBgColor(option),
                    }]}
                    onPress={() => handleOptionSelect(option)}
                >
                    <View style={styles.optionBullet}>
                        { getOptionBullet(option)}
                    </View>
                    <Text style={[styles.optionText, {color: getOptionTextColor(option)}]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </View>
  )
}

export default MCQ

const styles = StyleSheet.create({
    questionContainer:{
        marginBottom:GB_Utils.verticalScale(20),
        // justifyContent:'center',
        // flex:1,
    },
    questionText:{
        color:COLORS.white,
        fontWeight:'600',
        fontSize:GB_Utils.scale(18),
    },
    optionContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:GB_Utils.scale(8),
        paddingVertical:GB_Utils.verticalScale(5),
        marginVertical:GB_Utils.verticalScale(4),
    },
    circleIcon:{
        width:GB_Utils.scale(8),
        height:GB_Utils.scale(8),
        borderRadius:GB_Utils.scale(10),
        marginHorizontal:GB_Utils.scale(6),
        backgroundColor:COLORS.white
    },
    optionBullet:{
        marginRight:5
    },
    optionText:{
        fontSize:GB_Utils.scale(16)
    },
    container:{
        marginVertical:10,
        // paddingHorizontal:15
    }
})
import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState, useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import { QuizContext } from '../../context/quiz.context'
import QUEST_TYPE from '../../constants/question.constants'
import message from '../../assets/images/q4-message.png'
import GB_Utils from '../../utils';

const EnvFriendly = ({idx,changeQuestion}) => {
  const {getResponse, setResponse} = useContext(QuizContext)

  const handleChangeQuestion = () => {
    if(!getResponse(QUEST_TYPE.ENV_FRIENDLY)) return;
    changeQuestion();
  }
  return (
    <View style={styles.container}>
        <View style={{flex:1}}>
            <MCQ 
                idx = {idx}
                question = "Are you conscious about the environment and believe in sustainable living?"
                all_answers = {["Yes","No"]}
                selected_answers= {getResponse(QUEST_TYPE.ENV_FRIENDLY)}
                handleOptionSelect = {(val) => setResponse(QUEST_TYPE.ENV_FRIENDLY,val)}
            />
            <Image source={message} style={styles.message}/>
        </View>
        <View style={{alignItems:'center', justifySelf:'end'}}>
            <Button
                title="NEXT"
                onPress={handleChangeQuestion}
                isActive={!!getResponse(QUEST_TYPE.ENV_FRIENDLY)}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        paddingVertical:GB_Utils.verticalScale(40)
    },
    message:{
        width:'100%',
        resizeMode:'contain', 
        height:GB_Utils.scale(180), 
        marginTop:GB_Utils.verticalScale(20)
    },
})

export default EnvFriendly
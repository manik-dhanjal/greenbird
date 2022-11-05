import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState, useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import { QuizContext } from '../../context/quiz.context'
import QUEST_TYPE from '../../constants/question.constants'
import message from '../../assets/images/q4-message.png'
 
const EnvFriendly = ({idx,changeQuestion}) => {
  const {getResponse, setResponse} = useContext(QuizContext)

  const handleChangeQuestion = () => {
    if(!getResponse(QUEST_TYPE.ENV_FRIENDLY)) return;
    changeQuestion();
  }
  return (
    <View style={styles.container}>
        <View>
            <MCQ 
                idx = {idx}
                question = "Are you conscious about the environment and believe in sustainable living?"
                all_answers = {["Yes","No"]}
                selected_answers= {getResponse(QUEST_TYPE.ENV_FRIENDLY)}
                handleOptionSelect = {(val) => setResponse(QUEST_TYPE.ENV_FRIENDLY,val)}
            />
            <Image source={message} style={{width:'100%',resizeMode:'contain', height:250, marginVertical:30}}/>
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
        paddingVertical:30
    },
    dualColumn:{
        flexDirection:'row', 
        justifyContent:'center'
    },
    columnElement:{
        width:'45%', 
        height:140,
        resizeMode:'contain', 
        paddingHorizontal:10
    }
})

export default EnvFriendly
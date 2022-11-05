import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState,useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import chickenNuggets from '../../assets/images/chicken-nuggets.png';
import muttonKeema from '../../assets/images/mutton-keema.png';
import chickenTikka from '../../assets/images/chicken-tikka.png'
import chickenSausages from '../../assets/images/chicken-sausages.png'
import { QuizContext } from '../../context/quiz.context';
import QUEST_TYPE from '../../constants/question.constants';

const NextPurchase = ({idx,changeQuestion}) => {
  const {getResponse, setResponse} = useContext(QuizContext);

  return (
    <View style={styles.container}>
        <View>
            <MCQ 
                idx = {idx}
                question = "Will you buy Green bird in your next purchase?"
                all_answers = {["Yes","No"]}
                selected_answers= {getResponse(QUEST_TYPE.NEXT_PURCHASE)}
                handleOptionSelect = {(res) => setResponse(QUEST_TYPE.NEXT_PURCHASE,res)}
            />
            <View style={[styles.dualColumn,{marginTop:40}]}>
                <Image source={chickenNuggets} style={styles.columnElement}/>
                <Image source={muttonKeema} style={styles.columnElement}/>
            </View>
            <View style={styles.dualColumn}>
                <Image source={chickenSausages} style={styles.columnElement}/>
                <Image source={chickenTikka} style={styles.columnElement}/>
            </View>
        </View>
        <View style={{alignItems:'center', justifySelf:'end'}}>
            <Button
                title="NEXT"
                onPress={changeQuestion}
                isActive={!!getResponse(QUEST_TYPE.NEXT_PURCHASE)}
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
        // height:'40%',
        resizeMode:'contain', 
        paddingHorizontal:10
    }
})

export default NextPurchase
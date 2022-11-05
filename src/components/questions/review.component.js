import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState, useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import chickenNuggets from '../../assets/images/chicken-nuggets.png';
import chickenTikka from '../../assets/images/chicken-tikka.png';
import ReactionQuest from '../reactionQuest.components';
import { QuizContext } from '../../context/quiz.context';
import QUEST_TYPE from '../../constants/question.constants';

const WhatTasted = ({idx}) => {
    const {setResponse,getResponse} = useContext(QuizContext);
    const handleMCQOptionSelect = (selected_answer) =>{
        setResponse(QUEST_TYPE.WHAT_TASTED, selected_answer);
    }
    return(
        <View>
            <MCQ 
                idx = {idx}
                question = {"Which Product you have tasted ?"}
                all_answers = {["Nuggets", "Seekh Kabab", "Or Both"]}
                selected_answers = {getResponse(QUEST_TYPE.WHAT_TASTED)}
                handleOptionSelect = {handleMCQOptionSelect}
            />
            <View style={styles.dualColumn}>
                <Image source={chickenNuggets} style={styles.columnElement}/>
                <Image source={chickenTikka} style={styles.columnElement}/>
            </View>
        </View>
    )
}

const ReviewQuestion = ({idx, changeQuestion}) => {
  const [stage,setStage] = useState(0);
  const {getResponse,setResponse} = useContext(QuizContext);

  const handleStageChange = () => {
    switch(stage){
        case 0: {
            if(getResponse(QUEST_TYPE.WHAT_TASTED)!=='Seekh Kabab') setStage(1);
            else setStage(2);
            break;
        };
        case 1: {
            if(getResponse(QUEST_TYPE.WHAT_TASTED)==='Or Both') setStage(2);
            else changeQuestion();
            break;
        }
        case 2:{
            changeQuestion();
        }
    }
  }

  const isBtnActive = () => {
    if(stage==0) return !!getResponse(QUEST_TYPE.WHAT_TASTED)
    else if(stage==1) return !!getResponse(QUEST_TYPE.TASTE_OF_NUGGETS)
    else if(stage==2) return !!getResponse(QUEST_TYPE.TASTE_OF_KABAB)
    else return false;
  }
  return (
    <View style={styles.container}>
        { stage==0 && <WhatTasted idx={idx}/> }
        {
            stage==1 && (
                <ReactionQuest
                    question="Nuggets Rating:-"
                    productImage={chickenNuggets}
                    handleSubmit={(rating) => setResponse(QUEST_TYPE.TASTE_OF_NUGGETS,rating)}
                    selected = {getResponse(QUEST_TYPE.TASTE_OF_NUGGETS)}
                />
            )
        }
        {
            stage==2 && (
                <ReactionQuest
                    question="Seekh Kabab Rating:-"
                    productImage={chickenTikka}
                    handleSubmit={(rating) => setResponse(QUEST_TYPE.TASTE_OF_KABAB,rating)}
                    selected = {getResponse(QUEST_TYPE.TASTE_OF_KABAB)}
                />
            )
        }
        <View style={{alignItems:'center', justifySelf:'end'}}>
            <Button
                title="NEXT"
                onPress={handleStageChange}
                isActive={isBtnActive()}
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
        height:300,
        // height:'40%',
        resizeMode:'contain', 
        paddingHorizontal:10
    }
})

export default ReviewQuestion
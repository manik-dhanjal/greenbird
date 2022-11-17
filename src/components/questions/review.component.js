import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState, useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import chickenNuggets from '../../assets/images/chicken-nuggets.png';
import chickenTikka from '../../assets/images/chicken-tikka.png';
import ReactionQuest from '../reactionQuest.components';
import { QuizContext } from '../../context/quiz.context';
import QUEST_TYPE from '../../constants/question.constants';
import GB_Utils from '../../utils'
import { ScrollView } from 'react-native-gesture-handler';

const WhatTasted = ({idx}) => {
    const {setResponse,getResponse} = useContext(QuizContext);
    const handleMCQOptionSelect = (selected_answer) =>{
        setResponse(QUEST_TYPE.WHAT_TASTED, selected_answer);
    }
    return(
        <View style={{flex:1}}>
            <MCQ 
                idx = {idx}
                question = {"Which product have you tasted ?"}
                all_answers = {["Chicken-like Nuggets", "Chicken-like Seekh Kebab", "Both"]}
                selected_answers = {getResponse(QUEST_TYPE.WHAT_TASTED)}
                handleOptionSelect = {handleMCQOptionSelect}
            />
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={styles.dualColumn}>
                    <Image source={chickenNuggets} style={styles.columnElement}/>
                    <Image source={chickenTikka} style={styles.columnElement}/>
                </View>
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
            if(getResponse(QUEST_TYPE.WHAT_TASTED)!=='Chicken-like Seekh Kebab') setStage(1);
            else setStage(2);
            break;
        };
        case 1: {
            if(getResponse(QUEST_TYPE.WHAT_TASTED)==='Both') setStage(2);
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
    else if(stage==1){
        if(getResponse(QUEST_TYPE.TASTE_OF_NUGGETS)==="Not \nSatisfied" || getResponse(QUEST_TYPE.TASTE_OF_NUGGETS)==="Average")
         return !!getResponse(QUEST_TYPE.SUGGESTION_OF_NUGGETS)
        else return !!getResponse(QUEST_TYPE.TASTE_OF_NUGGETS)
    }
    else if(stage==2){
       if(getResponse(QUEST_TYPE.TASTE_OF_KABAB)==="Not \nSatisfied" || getResponse(QUEST_TYPE.TASTE_OF_KABAB)==="Average")
        return !!getResponse(QUEST_TYPE.SUGGESTION_OF_KABAB)
       else return !!getResponse(QUEST_TYPE.TASTE_OF_KABAB)
    }
    else return false;
  }
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            { stage==0 && <WhatTasted idx={idx}/> }
            {
                stage==1 && (
                    <ReactionQuest
                        question="Chicken-like Nuggets Rating:-"
                        productImage={chickenNuggets}
                        handleSubmit={(rating) => setResponse(QUEST_TYPE.TASTE_OF_NUGGETS,rating)}
                        selected = {getResponse(QUEST_TYPE.TASTE_OF_NUGGETS)}
                        suggestionText = {getResponse(QUEST_TYPE.SUGGESTION_OF_NUGGETS)}
                        setSuggestionText = {(val) => setResponse(QUEST_TYPE.SUGGESTION_OF_NUGGETS,val)}
                    />
                )
            }
            {
                stage==2 && (
                    <ReactionQuest
                        question="Chicken-like Seekh Kebab Rating:-"
                        productImage={chickenTikka}
                        handleSubmit={(rating) => setResponse(QUEST_TYPE.TASTE_OF_KABAB,rating)}
                        selected = {getResponse(QUEST_TYPE.TASTE_OF_KABAB)}
                        suggestionText = {getResponse(QUEST_TYPE.SUGGESTION_OF_KABAB)}
                        setSuggestionText = {(val) => setResponse(QUEST_TYPE.SUGGESTION_OF_KABAB,val)}
                    />
                )
            }
        </ScrollView>
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
        paddingTop:GB_Utils.verticalScale(90),
        paddingBottom: GB_Utils.verticalScale(30),
        paddingHorizontal:15
    },
    scroll:{

    },
    dualColumn:{
        flexDirection:'row', 
        justifyContent:'space-evenly',
        marginTop:GB_Utils.verticalScale(30)
    },
    columnElement:{
        width:'50%', 
        height:GB_Utils.verticalScale(140),
        // height:'40%',
        // backgroundColor:'#000',
        resizeMode:'contain', 
        paddingHorizontal:GB_Utils.scale(10)
    }
})

export default ReviewQuestion
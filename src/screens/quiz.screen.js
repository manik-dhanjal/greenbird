import { Text,View, ImageBackground, StyleSheet, Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,Platform, ScrollView } from 'react-native'
import React, {useState} from 'react'
import ReviewQuestion from '../components/questions/review.component'
import NextPurchase from '../components/questions/next-purchase.components';
import TriedMeat from '../components/questions/tried-meat.component';
import bg from "../assets/images/bg.jpg";
import EnvFriendly from '../components/questions/env-friendly.component';
import VideoFeedback from '../components/questions/video-feedback.components';
import {APP_TYPE} from '../constants/navigate.constants'
import RecordReview from '../components/questions/record-review.component';
// TODO: import question components

const QuizScreen = ({navigation}) => {
    const [questionNum,setQuestionNum] = useState(0)
    const handleQuestionChange = () => {
        if(questionNum+1>5){
            navigation.navigate(APP_TYPE.loginScreen);
            return;
        }else{
            setQuestionNum(questionNum+1);
        }
    }
  return (
    <ImageBackground source={bg} style={styles.imageBackground}>
            <KeyboardAvoidingView 
                behavior={Platform.OS == 'ios'?'padding':'stretch'}
                keyboardVerticalOffset={10}
                style={styles.avoidContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.touchability}>
                    
                    <>
                        {questionNum==0&&<ReviewQuestion idx={questionNum} changeQuestion={handleQuestionChange}/>}
                        {questionNum==1&&<NextPurchase idx={questionNum} changeQuestion={handleQuestionChange}/>}
                        {questionNum==2&&<TriedMeat idx={questionNum} changeQuestion={handleQuestionChange}/>}
                        {questionNum==3&&<EnvFriendly idx={questionNum} changeQuestion={handleQuestionChange}/>}
                        {questionNum==4&&<VideoFeedback idx={questionNum} changeQuestion={handleQuestionChange}/>}
                        {questionNum==5&&<RecordReview changeQuestion={handleQuestionChange}/>}
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    imageBackground:{
        flex:1,
    },
    avoidContainer:{
        flex:1,
        width:'100%'
    },
    touchability:{
        flex:1,
        width:'100%'
    },
    scrollView:{
        // flex:1,
        marginTop:60,
        paddingHorizontal:15,
        // maxWidth:400
        // backgroundColor:'#000'
    }
})

export default QuizScreen


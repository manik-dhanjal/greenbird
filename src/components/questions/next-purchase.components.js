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
import GB_UTILS from '../../utils';

const NextPurchase = ({idx,changeQuestion}) => {
  const {getResponse, setResponse} = useContext(QuizContext);

  return (
    <View style={styles.container}>
        <View style={{flex:1}}>
            <MCQ 
                idx = {idx}
                question = "Will you buy Green bird in your next purchase?"
                all_answers = {["Yes","No"]}
                selected_answers= {getResponse(QUEST_TYPE.NEXT_PURCHASE)}
                handleOptionSelect = {(res) => setResponse(QUEST_TYPE.NEXT_PURCHASE,res)}
            />
            <View style = {styles.productGroup}>
                <View style={[styles.dualColumn]}>
                    <Image source={chickenNuggets} style={styles.columnElement}/>
                    <Image source={muttonKeema} style={styles.columnElement}/>
                </View>
                <View style={styles.dualColumn}>
                    <Image source={chickenSausages} style={styles.columnElement}/>
                    <Image source={chickenTikka} style={styles.columnElement}/>
                </View>
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
        paddingTop:GB_UTILS.verticalScale(50),
        paddingBottom:GB_UTILS.verticalScale(30),
        paddingHorizontal:15
    },
    productGroup:{
        marginTop:GB_UTILS.verticalScale(30)
    },
    dualColumn:{
        flexDirection:'row', 
        justifyContent:'center'
    },
    columnElement:{
        width:'40%', 
        height: GB_UTILS.scale(100),
        resizeMode:'contain', 
    }
})

export default NextPurchase
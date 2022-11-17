import { View, Text, StyleSheet, Image,ScrollView } from 'react-native'
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
import TextInput from '../c_text_input.component';

const NextPurchase = ({idx,changeQuestion}) => {
  const {getResponse, setResponse} = useContext(QuizContext);
  const handleOptionSelect = (val) => {
    setResponse(QUEST_TYPE.NEXT_PURCHASE,val);
    setResponse(QUEST_TYPE.REASON_NOT_TO_BUY,"")
  }
  const isBtnActive = () => {
    if(!getResponse(QUEST_TYPE.NEXT_PURCHASE)) return false;
    if(!getResponse(QUEST_TYPE.REASON_NOT_TO_BUY) && getResponse(QUEST_TYPE.NEXT_PURCHASE)==="No") return false;
    return true;
  }
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            <MCQ 
                idx = {idx}
                question = "Will you buy Greenbird in your next purchase?"
                all_answers = {["Yes","No"]}
                selected_answers= {getResponse(QUEST_TYPE.NEXT_PURCHASE)}
                handleOptionSelect = {handleOptionSelect}
            />
            {
                getResponse(QUEST_TYPE.NEXT_PURCHASE)=="No" &&
                <TextInput
                    label={'Reason for not buying?'}   
                    value={getResponse(QUEST_TYPE.REASON_NOT_TO_BUY)}
                    onChangeText={(a,b) => setResponse(QUEST_TYPE.REASON_NOT_TO_BUY,b)}
                    style={{height:150,textAlignVertical:'top'}}
                    multiline={true}
                    containerStyles={{marginTop:30}}
                />
            }
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
        </ScrollView>
        <View style={{alignItems:'center', justifySelf:'end'}}>
                <Button
                    title="NEXT"
                    onPress={changeQuestion}
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
        paddingTop:GB_UTILS.verticalScale(90),
        paddingBottom:GB_UTILS.verticalScale(30),
    },
    scroll:{
        paddingBottom:GB_UTILS.verticalScale(30),
        marginBottom:GB_UTILS.verticalScale(10),
        paddingHorizontal:15,
    },
    productGroup:{
        marginTop:GB_UTILS.verticalScale(30)
    },
    dualColumn:{
        flexDirection:'row', 
        justifyContent:'center'
    },
    columnElement:{
        width:'50%', 
        height: GB_UTILS.scale(120),
        resizeMode:'contain', 
    }
})

export default NextPurchase
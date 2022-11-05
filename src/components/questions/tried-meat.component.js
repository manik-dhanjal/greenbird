import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState, useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import chickenNuggets from '../../assets/images/chicken-nuggets.png';
import muttonKeema from '../../assets/images/mutton-keema.png';
import chickenTikka from '../../assets/images/chicken-tikka.png'
import chickenSausages from '../../assets/images/chicken-sausages.png'
import DropDown from '../c_dropdown.components';
import { QuizContext } from '../../context/quiz.context';
import QUEST_TYPE from '../../constants/question.constants';
import GB_Utils from '../../utils';

const TriedMeat = ({idx,changeQuestion}) => {
  const {setResponse,getResponse} = useContext(QuizContext);
  const [haveTried,setHaveTried] = useState("");
  const handleQuestionChange = () => {
    if(!getResponse(QUEST_TYPE.HAVE_TRIED_MEAT)) return;
    if(getResponse(QUEST_TYPE.HAVE_TRIED_MEAT)==="Yes"&&!getResponse(QUEST_TYPE.TRIED_MEAT)) return ;
    changeQuestion();
  }
  const isBtnActive = () => {
    if(getResponse(QUEST_TYPE.HAVE_TRIED_MEAT)=="No") return true;
    if(getResponse(QUEST_TYPE.HAVE_TRIED_MEAT)==="Yes" && getResponse(QUEST_TYPE.TRIED_MEAT)) return true;
    return false;
  }
  return (
    <View style={styles.container}>
        <View style={{flex:1}}>
            <MCQ 
                idx = {idx}
                question = "Have you tried any other plant based meat brand?"
                all_answers = {["Yes","No"]}
                selected_answers= {getResponse(QUEST_TYPE.HAVE_TRIED_MEAT)}
                handleOptionSelect = {(val) => setResponse(QUEST_TYPE.HAVE_TRIED_MEAT,val)}
            />
            {
            getResponse(QUEST_TYPE.HAVE_TRIED_MEAT)==="Yes" &&
            <DropDown
                label = "If yes which one?"
                value = { getResponse(QUEST_TYPE.TRIED_MEAT) }
                data = {[
                    {
                        label:"Chicken Sausages",
                        value:"chicken sausages"
                    },{
                        label:"Chicken Nuggets",
                        value:"chicken nuggest",
                    },{
                        label:"Chicken Tikka",
                        value:"chicken tikka"
                    },{
                        label:"Mutton Keema",
                        value:"mutton keema"
                    }
                ]}
                handleChange = {(val) => setResponse(QUEST_TYPE.TRIED_MEAT,val)}
                placeholder="Select a Meat Brand"
            />
            }
            <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                <View style={styles.dualColumn}>
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
                onPress={handleQuestionChange}
                isActive={isBtnActive()}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'space-between',
        paddingVertical:GB_Utils.verticalScale(40),
        paddingHorizontal:15
    },
    dualColumn:{
        flexDirection:'row', 
        justifyContent:'center'
    },
    columnElement:{
        width:'38%', 
        height:GB_Utils.scale(90),
        resizeMode:'contain', 
    }
})

export default TriedMeat
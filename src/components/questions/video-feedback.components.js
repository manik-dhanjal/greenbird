import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect, useState, useRef, useContext } from 'react'
import MCQ from '../mcq.component'
import Button from '../button.components'
import chickenNuggets from '../../assets/images/chicken-nuggets.png';
import muttonKeema from '../../assets/images/mutton-keema.png';
import chickenTikka from '../../assets/images/chicken-tikka.png'
import chickenSausages from '../../assets/images/chicken-sausages.png'
import Video from 'react-native-video';
import productVideo from "../../assets/video/product-video.mp4"
import C_TextInput from '../c_text_input.component';
import { QuizContext } from '../../context/quiz.context';
import QUEST_TYPE from '../../constants/question.constants';



const ProductVideo = () => {
    const videoPlayer = useRef(null);
    const videoError = (error) => {
      console.log(error);
    }
    const videoBuffer = () => {
      
    }
    return (            
        <View style={{alignItems:'center'}}>
            <Video
                ref={videoPlayer}
                onError={videoError}
                source = {require("../../assets/video/product-video.mp4")}
                volume = {10}
                style={{
                    height:280,
                    width:"100%",
                    maxWidth:280,
                }}
                resizeMode={"contain"}
                paused = {false}
                repeat = {true}
            />
        </View>
    )
}

const FeedbackOfVideo = () => {
    const {getResponse,setResponse} = useContext(QuizContext);
    return(
        <View style={{marginBottom:30}}>
            <View>
                <Text style={{color:'#fff', fontSize:20, marginBottom:15}}>Feedback of Video:-</Text>
            </View>
            <C_TextInput
                multiline={true}
                style={{height:150}}
                onChangeText={(name,val) => setResponse(QUEST_TYPE.VIDEO_FEEDBACK,val)}
                value = {getResponse(QUEST_TYPE.VIDEO_FEEDBACK)}
            />
        </View>
    )
}

const VideoFeedback = ({idx,changeQuestion}) => {
  const [stage,setStage] = useState(0);
  const {getResponse} = useContext(QuizContext);

  const handleNextClick = () => {
    switch (stage) {
        case 0:{
            setStage(stage+1);
            break;
        }
        case 1:{
            console.log(getResponse(QUEST_TYPE.VIDEO_FEEDBACK))
            if(!getResponse(QUEST_TYPE.VIDEO_FEEDBACK)) return;
            changeQuestion();
        }
    }
  }
  return (
    <View style={styles.container}>
        <View>
            {stage==0 && <ProductVideo/>}
            { stage==1 && <FeedbackOfVideo/> } 

            <View style={styles.dualColumn}>
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
                onPress={handleNextClick}
                isActive={!(stage==1 && !getResponse(QUEST_TYPE.VIDEO_FEEDBACK))}
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
    },
})

export default VideoFeedback
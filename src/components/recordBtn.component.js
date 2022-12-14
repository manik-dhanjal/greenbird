import { View, Text, StyleSheet, Pressable,Animated } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import GB_Utils from '../utils';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler } from 'react-native-gesture-handler';

const RecordBtn = ({handleStartRecord,handleStopRecord}) => {
    const [isRecording,setIsRecording] = useState(null);
    const [timePast, setTimePast] = useState(0);

    const handlebtnClick = () => {
        if(isRecording){
            clearInterval(isRecording);
            setIsRecording(null);
            setTimePast(0);
            handleStopRecord();
        }else{
            setIsRecording(
                setInterval(() => {
                    setTimePast((cur) => cur+1);
                },1000)
            )
            handleStartRecord();
        }
    }
    // useEffect(() => {
        // if(isRecording){
        //     clearInterval(isRecording);
        //     setIsRecording(null);
        //     setTimePast(0);
        //     handleStopRecord();
        // }
        // return () =>;
    // },[timePast])
    const addZero = (num)=>{
        return num/10>=1?num:"0"+num;
    }
  return (
    <View style={styles.container}>
        <Text style={styles.timer}>{addZero(parseInt(timePast/60))}:{addZero(timePast%60)}</Text>
        <Pressable style={styles.btnContainer} onPress={handlebtnClick}>
            <View style={!isRecording?styles.startRecordBtn:styles.stopRecordBtn}></View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    btnContainer:{
        // backgroundColor:'#f00',
        height:GB_Utils.scale(80),
        width:GB_Utils.scale(80),
        borderRadius:GB_Utils.scale(400),
        borderColor:'#fff',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center'
    },
    startRecordBtn:{
        height:GB_Utils.scale(65),
        width:GB_Utils.scale(65),
        borderRadius:GB_Utils.scale(400),
        backgroundColor:'#fff',
        // transion
    },
    stopRecordBtn:{
        height:GB_Utils.scale(40),
        width:GB_Utils.scale(40),
        borderRadius:GB_Utils.scale(10),
        backgroundColor:'#f00',
    },
    timer:{
        marginBottom:10,
        fontSize:GB_Utils.scale(14),
        color:'#fff',
        fontWeight:'600'
    }
}) 
export default RecordBtn
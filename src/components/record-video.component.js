import { Camera,useCameraDevices } from 'react-native-vision-camera';
import { useState,useEffect,useRef } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import Button from './button.components'
import GB_Utils from '../utils/index'
import RecordBtn from './recordBtn.component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SpinnerWrapper from './spinner.component';
import { useIsForeground } from '../hooks/useIsForeground.hooks';
import { useIsFocused } from '@react-navigation/core';

const RecordVideo = ({setPath}) => {
  const [isFront, setIsFront] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isRecording,setIsRecording] = useState(false)
  const [isCameraAllowed,setIsCameraAllowed] = useState(false);
  const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(false);
  const [mounted,setMounted] = useState(false)
  const camera = useRef(null);
  const devices = useCameraDevices();

  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;
  const handleCameraSwitch = () => {
    setIsFront(!isFront);
  }
  const handleToggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  }
  const handleStartRecording = () => {
    try{
      setIsRecording(true);
      camera.current.startRecording({
        onRecordingFinished: async (video) =>{
             console.log(video.path)
             setPath(video.path);
             setIsRecording(false)
        },
        onRecordingError: (error) => console.error(error),
      })
    }catch(e){
      console.log(e.message);
    }
  }
  const handleStopRecording = async () => {
    setMounted(false);
    await camera.current.stopRecording()
  }
  useEffect(() => {
    (async() => {
      // check for video permission and ask again if denied
      const cameraPermission = await Camera.getCameraPermissionStatus()
      if(cameraPermission!='authorized'){
        const newCameraPermission = await Camera.requestCameraPermission()
        setIsCameraAllowed(newCameraPermission=='authorized');
      }else{
        setIsCameraAllowed(true);
      }

      // check for microphone permission and ask again if denied
      const microphonePermission = await Camera.getMicrophonePermissionStatus()
      if(microphonePermission!='authorized'){
        const newMicrophonePermission = await Camera.requestMicrophonePermission()
        setIsMicrophoneAllowed(newMicrophonePermission=='authorized');
      }else{
        setIsMicrophoneAllowed(true);
      }
    })()
    setMounted(true);

    return () => {
    };
  },[])
  if(!isCameraAllowed) return (
    <View style={styles.permContainer}>
      <Text style={styles.permText}>Please grant permission for camera</Text>
      <Button
        title="Grant Camera"
        onPress = {async () => await Camera.requestCameraPermission()}
      />
    </View>
  )
  if(!isMicrophoneAllowed) return (
    <View style={styles.permContainer}>
      <Text style={styles.permText}>Please grant permission for Microphone</Text>
      <Button
        title="Grant Mic"
        onPress = {async () => await Camera.requestMicrophonePermission()}
      />
    </View>
  )
  console.log(isActive)
  const device = isFront? devices.front: devices.back
  if(device==null) return <SpinnerWrapper isActive={true} overlayStyle={{backgroundColor:'#000',borderRadius:10}}></SpinnerWrapper>
  return (
    <View style={styles.container}>
      <View style={styles.cameraScreen}>
        <Camera
          style={StyleSheet.absoluteFill}
          ref={camera}
          device={device}
          isActive={mounted}
          torch={isFlashOn?"on":"off"}
          video={true}
          audio={true}
          preset='medium'
          enableZoomGesture={true}
        >
        </Camera>
        <Text style={{textAlign:'center',fontSize:GB_Utils.scale(20), color:'#fff', marginTop:GB_Utils.verticalScale(20)}}>Record a feedback</Text>
        <View style={styles.btnCollection}>
          <View style={styles.btnCont}>
            {
              device.hasTorch&&
              (
                <Pressable onPress={handleToggleFlash} style={styles.btn}>
                  <MaterialIcons name={isFlashOn?"flash-on":"flash-off"} style={{color: '#fff',fontSize:GB_Utils.scale(20)}} />
                </Pressable>
              )
            }
          </View>
          <View style={styles.btnCont}>
            <RecordBtn
              handleStopRecord={handleStopRecording} 
              handleStartRecord={handleStartRecording}
            />
          </View>

          <View style={styles.btnCont}>
            {
              !isRecording &&
              <Pressable onPress={handleCameraSwitch} style={styles.btn}>
                <MaterialIcons name={"flip-camera-ios"} style={{color: '#fff',fontSize:GB_Utils.scale(25)}} />
              </Pressable>
            }            
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  btnCollection:{
    flexDirection:'row',
    alignItems:'center'
  },
  cameraScreen:{
    flex:1,
    width:'100%',
    backgroundColor:'#f00',
    borderRadius:GB_Utils.scale(10),
    justifyContent:'space-between',
    paddingBottom:30,
    borderRadius:20,
    overflow:'hidden'
  },
  permContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  permText:{
    color:'#fff',
    fontSize:GB_Utils.scale(20),
    marginBottom:40
  },
  btn:{
    width:GB_Utils.scale(50),
    height:GB_Utils.scale(50),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:GB_Utils.scale(100),
    borderColor:'#fff',
    borderWidth:GB_Utils.scale(1)
  },
  btnCont:{
    width:"33.33%",
    alignItems:'center',
  }
})
export default RecordVideo
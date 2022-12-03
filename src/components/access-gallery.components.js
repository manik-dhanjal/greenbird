import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Linking
} from 'react-native';
import Video from 'react-native-video';
import Button from './button.components';
import storage from '@react-native-firebase/storage';
import VideoPlayer from 'react-native-video-controls';
import { COLORS } from '../constants/theme.constants';
import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';
import GB_Utils from '../utils'
import { ProcessingManager } from 'react-native-video-processing';
import { Video as VideoComp } from 'react-native-compressor';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {PENDING, REQUEST_PENDING,REQUEST_SUCCESS} from '../constants/request.constants';
import SpinnerWrapper from './spinner.component';


const AccessGallary = ({path,handleSaved, handleRecordAgain}) => {

  const [renderControls, setRenderControls] = useState(false);
  const [storagePerm,setStoragePerm] = useState(REQUEST_PENDING(false));

  async function hasAndroidPermission() {
    setStoragePerm(REQUEST_PENDING(false));
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    PermissionsAndroid.RESULTS
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      setStoragePerm(REQUEST_SUCCESS(true));
      return;
    }
    const status = await PermissionsAndroid.request(permission);
    setStoragePerm(REQUEST_SUCCESS(status === 'granted'));
  }

  const handleSave = async (tempStoragePath) => {
    // saving video to local storage
    setRenderControls(false);
    const externallyStoredURI = await CameraRoll.save(tempStoragePath, { type:"video",album:"Greenbird" })
    console.log("external storage path:",externallyStoredURI);
    handleSaved(externallyStoredURI);
  }

  useEffect(() => {
    const timeoutRef = setTimeout(() => setRenderControls(true), 0);
    return () => timeoutRef?timeoutRef():null;
  },[setRenderControls]);

  useEffect(() => {
    hasAndroidPermission();
  },[])

  if(storagePerm.status==PENDING) return <SpinnerWrapper></SpinnerWrapper>

  if(storagePerm.data==false) return (<>
    <View style={styles.permContainer}>
      <Text style={styles.permText}>Please go to settings and grant permission for external storage</Text>
      <Button
        title="Grant Storage"
        onPress = {async () => Linking.openSettings()}
        containerStyle={{marginBottom:30}}
      />
      <Button
        title="Check Again"
        onPress = {async () => hasAndroidPermission()}
      />
    </View>
  </>)
  return (
    <View style={styles.container}>
        <View style={{width:'100%',position:'relative', flex:1,}}>
          {
            renderControls&&
            <Video
              style={[StyleSheet.absoluteFill,{borderRadius:20, backgroundColor:"#fff"}]}
              source={{uri: path}}
              vol={10}
              controls={true}
            />
          }
          <Text style={styles.previewText}>Preview</Text>
        </View>
          <View style={styles.btnCollection}>
            <Pressable onPress={handleRecordAgain} style={styles.btn}>
              <Text style={styles.btnText}>Record Again</Text>
            </Pressable>
            <Pressable onPress={() => handleSave(path)} style={styles.btn}>
              <Text style={styles.btnText}>Save</Text>
            </Pressable>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
      fontSize: 20,
      color: '#fff',
      backgroundColor: 'blue',
      paddingVertical: 20,
      paddingHorizontal: 30,
      marginHorizontal: 20,
      marginVertical: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    permContainer:{
      justifyContent:'center',
      alignItems:'center',
      flex:1
    },
    permText:{
      color:'#fff',
      fontSize:GB_Utils.scale(20),
      marginBottom:40,
      textAlign:'center'
    },
    previewText:{
      textAlign:'center',
      fontSize:20,
      color:'#fff',
      marginTop:20
    },
    progressBarContainer: {
      alignItems:'center',
      marginTop: 20
    },
    uploadingText:{
      color:'#fff',
      fontSize:16,
      marginBottom:10
    },
    cancelButton: {
      backgroundColor: '#fff',
      color: 'blue',
    },
    selectedImage: {
      width: 400,
      height: 800,
      marginTop: 20,
    },
    container: {
      flex:1,
      alignItems:'center'
    },
    btnCollection:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:20
    },
    btn:{
      backgroundColor:COLORS.orange,
      paddingVertical:GB_Utils.scale(10),
      paddingHorizontal:GB_Utils.scale(15),
      borderRadius:8,
      marginHorizontal:10,
      // width:180,
      flex:1
    },
    btnText:{
      color:COLORS.maroon,
      fontSize:GB_Utils.scale(16),
      textAlign:'center'
    }
  });

export default AccessGallary
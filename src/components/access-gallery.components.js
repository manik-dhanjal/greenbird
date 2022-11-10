import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  ToastAndroid
} from 'react-native';
import Video from 'react-native-video';
import Button from './button.components';
import storage from '@react-native-firebase/storage';
import VideoPlayer from 'react-native-video-controls';
import { COLORS } from '../constants/theme.constants';
import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';
import GB_Utils from '../utils'

const AccessGallary = ({path,handleUploaded, handleRecordAgain}) => {
  const [isUploading,setIsUploading] = useState(false);
  const [transfered,setTransfered] = useState(0);

  const handleUpload = async () => {
    setIsUploading(true);
    setTransfered(0);
    const taskRef = storage().ref('/greenbird/'+uuid.v4()+".mp4");
    try{
      const task = taskRef.putFile(path);
      task.on('state_changed',snapshot => {
        setTransfered(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 1000)
        )
      })
      await task;
      handleUploaded(await taskRef.getDownloadURL())
    }catch (e) {
      console.error(e);
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    }
    setIsUploading(false);
  }

  return (
    <View style={styles.container}>
        <View style={{width:'100%',position:'relative', flex:1,}}>
          <Video
              style={[StyleSheet.absoluteFill,{borderRadius:20, backgroundColor:"#fff"}]}
              source={{uri: path}}
              vol={10}
              controls={true}
          />
          <Text style={styles.previewText}>Preview</Text>
        </View>
        {isUploading ? (
          <View style={styles.progressBarContainer}>
            <Text style={styles.uploadingText}>Uploading</Text>
            <Progress.Bar progress={transfered/1000} width={GB_Utils.scale(300)} color={COLORS.orange}/>
          </View>
        ) : (
          <View style={styles.btnCollection}>
            <Pressable onPress={handleRecordAgain} style={styles.btn}>
              <Text style={styles.btnText}>Record Again</Text>
            </Pressable>
            <Pressable onPress={handleUpload} style={styles.btn}>
              <Text style={styles.btnText}>Upload</Text>
            </Pressable>
          </View>
        )}
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
      paddingVertical:15,
      paddingHorizontal:30,
      borderRadius:8,
      marginHorizontal:10,
      width:180,
      flex:1
    },
    btnText:{
      color:COLORS.maroon,
      fontSize:GB_Utils.scale(18),
      textAlign:'center'
    }
  });

export default AccessGallary
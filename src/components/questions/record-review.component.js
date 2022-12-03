import { useState,useContext } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal,Pressable } from 'react-native';
import Button from '../button.components'
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import { Camera,useCameraDevices } from 'react-native-vision-camera';
import AccessGallary from '../access-gallery.components';
import RecordVideo from '../record-video.component';
import GB_Utils from '../../utils/index';
import RecordBtn from '../recordBtn.component';
import { COLORS } from '../../constants/theme.constants';
import { QuizContext, } from '../../context/quiz.context';
import QUEST_TYPE from '../../constants/question.constants';

const RecordReview = ({changeQuestion}) => {
  const [path,setPath] = useState(null)
  const [modalVisible,setModalVisible] = useState(true)
  const {setResponse} = useContext(QuizContext);

  const handleSkip = () => {
    setModalVisible(false);
    changeQuestion();
  }
  const handleSaved = (uri) => {
    console.log(uri)
    setResponse(QUEST_TYPE.FEEDBACK_VIDEO,uri);
    changeQuestion()
  }
  return (
    <View style={styles.container}>
      {!path?
        <RecordVideo setPath={setPath} />
        :<AccessGallary 
          path={path} 
          setPath={setPath} 
          handleSaved={(externalStorageURI) => handleSaved(externalStorageURI)}
          handleRecordAgain = {() => setPath(null)}
        />
      }
      <Modal
        animation="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.overlayBg}>
          <View style={styles.modalBg}>
            <Text style={styles.modalText}>
              Are you willing to record your review?
            </Text>
            <View style={styles.btnCollection}>
              <Pressable onPress={handleSkip} style={styles.btn}>
                <Text style={styles.btnText}>Skip</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.btn}>
                <Text style={styles.btnText}>Record</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    // backgroundColor:'#000',
    alignItem:'center',
    marginTop:GB_Utils.verticalScale(80),
    marginBottom:GB_Utils.verticalScale(30),
    paddingHorizontal:15
  },
  overlayBg:{
    backgroundColor:'#00000090',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalBg:{
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    padding:20,
    borderRadius:10
  },
  modalText:{
    color:'#000',
    marginBottom:30,
    fontSize:20
  },
  btnCollection:{
    flexDirection:'row',
    justifyContent:'center'
  },
  btn:{
    backgroundColor:COLORS.orange,
    paddingVertical:15,
    paddingHorizontal:30,
    borderRadius:8,
    marginHorizontal:10
  },
  btnText:{
    color:COLORS.maroon,
    fontSize:18
  }
})
export default RecordReview
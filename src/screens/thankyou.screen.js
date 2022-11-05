import { ImageBackground, StyleSheet, Image, View, Text } from 'react-native'
import React, {useContext} from 'react'
import tableBg from "../assets/images/bg.jpg"
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/button.components'
import chickenNuggets from '../assets/images/chicken-nuggets.png';
import muttonKeema from '../assets/images/mutton-keema.png';
import chickenTikka from '../assets/images/chicken-tikka.png'
import chickenSausages from '../assets/images/chicken-sausages.png'
import { QuizContext } from '../context/quiz.context'
import { APP_TYPE } from '../constants/navigate.constants'


const ThankyouScreen = ({navigation}) => {
  const {flushResponse} = useContext(QuizContext);

  const handleLogout = async () => {
    flushResponse();
    navigation.navigate(APP_TYPE.welcomeScreen);
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={tableBg} style={styles.imagebackground}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Thank you for your participation in campaign</Text>
        </View>
          <View style={styles.bottom}>
            <View style={styles.dualColumn}>
                <Image source={chickenNuggets} style={styles.columnElement}/>
                <Image source={muttonKeema} style={styles.columnElement}/>
            </View>
            <View style={styles.dualColumn}>
                <Image source={chickenSausages} style={styles.columnElement}/>
                <Image source={chickenTikka} style={styles.columnElement}/>
            </View>
            <Button
                title="THANK YOU"
                onPress={handleLogout}
                containerStyle={styles.logoutBtn}
            />
          </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ThankyouScreen

const styles = StyleSheet.create({
  safeAreaView:{
    flex:1,
  },
  imagebackground:{
    flex:1,
    resizeMode:'contain',
    justifyContent:'center',
    alignItems:'center'
  },
  bottom:{
    justifyContent:'center',
    width:'100%'
  },
  bottleImg:{
    width:260,
    resizeMode:'contain',
    height:400,
    alignSelf:'center',
    // backgroundColor:'red'
  },
  titleText:{
    fontSize:23,
    maxWidth:340,
    fontWeight:'600',
    color:'#fff',
    textAlign:'center'
  },
  title:{
    width:'100%',
    paddingHorizontal:20,
    alignItems:'center',
    marginBottom:30
  },
  titleImg:{
    width:'100%',
    resizeMode:'contain'
  },
  logoutBtn:{
    marginTop:50,
    alignSelf:'center'
  },
  dualColumn:{
    flexDirection:'row', 
    justifyContent:'center'
  },
  columnElement:{
        width:'45%', 
        height:140,
        // height:'40%',
        resizeMode:'contain', 
        paddingHorizontal:10
    }
})
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
import GB_Utils from '../utils';
import LogoHeader from '../components/logo_header.components'

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
          <Text style={styles.titleText}>Thanks for your valuable feedback and for joining the Greenbird initiative</Text>
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
    alignItems:'center',
    paddingHorizontal:15,
    paddingTop:GB_Utils.verticalScale(50)
  },
  titleText:{
    fontSize:GB_Utils.scale(18),
    maxWidth:GB_Utils.scale(340),
    fontWeight:'600',
    color:'#fff',
    textAlign:'center',
    marginBottom:GB_Utils.verticalScale(30)
  },
  dualColumn:{
    flexDirection:'row', 
    justifyContent:'center'
  },
  logoutBtn:{
    alignSelf:'center',
    marginTop:GB_Utils.verticalScale(50)
  },
  columnElement:{
      width:'45%', 
      height: GB_Utils.scale(100),
      resizeMode:'contain', 
  },
  couponDesc:{
    fontSize:GB_Utils.scale(16),
    color:'#fff',
    textAlign:'center',
    marginBottom:20,
  },
  coupon:{
    fontSize:GB_Utils.scale(25),
    color:'#fff',
    textAlign:'center',
    backgroundColor:'#18422f',
    paddingVertical:GB_Utils.scale(5),
    paddingHorizontal:GB_Utils.scale(20)
    // width:''
  },
  couponCont:{
    alignItems:'center',
    marginTop:30
  }
})
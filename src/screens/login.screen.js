import { Text,View, ImageBackground, StyleSheet, Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,Platform, ScrollView, Image } from 'react-native'
import React,{useState, useEffect, useContext} from 'react'
import bg from "../assets/images/bg.jpg";
import Button from '../components/button.components'
import C_TextInput from '../components/c_text_input.component'
import C_RadioInput from '../components/c_radio_btn.components'
import { PENDING, REQUEST_SUCCESS,REQUEST_FAILED } from '../constants/request.constants';
import { COLORS } from '../constants/theme.constants';
import DropDown from '../components/c_dropdown.components';
import rabit from '../assets/images/rabit.png';
import plant from '../assets/images/plant.png';
import arm from '../assets/images/arm.png';
import wheet from '../assets/images/wheet.png';
import dna from '../assets/images/dna.png';
import { createUserDocument, setFeedbackResponse } from '../utils/database.utils';
import { QuizContext } from '../context/quiz.context';
import { APP_TYPE } from '../constants/navigate.constants';

const INITIAL_USER_INPUT = {
    name:"",
    age:"",
    phone:"",
    location:""
}
const testingCreds = {
    name:"manik",
    age:"18-24",
    phone:"1111111111",
    location:"outlet location"
}
var age_props = [
    {label: '18-24', value:'18-24'},
    {label: '25-32', value: '25-32' },
    {label:'33-45', value:'33-45'},
    {label:'45+', value:'45-Above'}
  ];
const LoginScreen = ({navigation, route}) => {

    const [user,setUser] = useState(REQUEST_SUCCESS( INITIAL_USER_INPUT ));
    const {getAllResponses} = useContext(QuizContext)

    const setMessage = (message) => {
        setUser(state => {
            state.message = message;
            return {...state}
        })
    }
    const handleAnonymousLogin = async () => {
        if(user.status===PENDING) return;

        if(!user.data.name){
            setMessage("Please enter your name")
            return
        }
        if(!user.data.phone || user.data.phone<100000){
            setMessage("Please enter a valid phone number")
            return
        }
        if(!user.data.location ){
            setMessage("Please enter a valid Location")
            return
        }
        setMessage("");
        try{
            setUser(REQUEST_PENDING(user.data))
            await createUserDocument(user.data)
            await setFeedbackResponse(getAllResponses,user.data.phone);
            navigation.navigate(APP_TYPE.thankYouScreen);
            setUser(REQUEST_SUCCESS(INITIAL_USER_INPUT))
        }catch(e){
            if(e.code === 'auth/too-many-requests'){
                setUser(state => REQUEST_FAILED(state.data,"Your device is blocked due to too many requests! Please try again later"))
            }else{
                console.log(e.message)
                setUser(state => REQUEST_FAILED(state.data,e.message.replace("["+e.code+"] ","")))
            }
        }
    }

    const handleInputChange = (label,value)=> {
        setUser((state)=>{
            state.data[label] = value
            return { ...state }
        })
        setMessage("")
      }

    useEffect(() =>{
        setMessage(route.params.message);
    }, [route.params.message])
    
    return (
        <ImageBackground style={styles.background} source={bg}>
            <ScrollView>
                <KeyboardAvoidingView 
                    behavior={Platform.OS == 'ios'?'padding':'stretch'}
                    keyboardVerticalOffset={10}
                    style={styles.avoidContainer}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View  style={styles.container}>
                                <Text style={styles.heading}>
                                    Please enter your details
                                </Text>
                                <View style={styles.inputGroup}>
                                    <C_TextInput
                                        label="Name:"
                                        name="name"
                                        onChangeText={handleInputChange}
                                        value={user.data.name}
                                        placeholder="Name"
                                        containerStyles={styles.input}
                                    />
                                    <C_TextInput
                                        label="Mobile Number:"
                                        name="phone"
                                        onChangeText={handleInputChange}
                                        value={user.data.phone}
                                        placeholder="Mobile No."
                                        containerStyles={styles.input}
                                        type="tel"
                                        countryCode='+91'
                                    />
                                    <DropDown
                                        label="Location:"
                                        data={[
                                            { label:"Delhi", value:"Delhi"},
                                            { value:"Chandigarh", label:"Chandigarh"},
                                            { value:"Mumbai", label:"Mumbai" },
                                            { value:"Pune", label:"Pune" },
                                            { value:"Ahmedabad", label:"Ahmedabad" },
                                            { value:"Bengluru", label:"Bengluru" },
                                            { value:"Hyderabad", label:"Hyderabad" },
                                        ]}
                                        handleChange={(value) => handleInputChange("location",value)}
                                        value={user.data.location}
                                        placeholder={"Select Location"}
                                    />
                                </View>
                                <View style={styles.featuresCont}>
                                    <View style={styles.feature} >
                                        <Image source={wheet} style={styles.featureImage}/>
                                        <Text style={styles.featureText}>More Fiber than Meat</Text>
                                    </View>
                                    <View style={styles.feature} >
                                        <Image source={arm} style={styles.featureImage}/>
                                        <Text style={styles.featureText}>Good Source of Protein</Text>
                                    </View>
                                    <View style={styles.feature} >
                                        <Image source={rabit} style={styles.featureImage}/>
                                        <Text style={styles.featureText}>Cruelty Free</Text>
                                    </View> 
                                </View>
                                <View style={styles.featuresCont}>
                                    <View style={styles.feature} >
                                        <Image source={dna} style={styles.featureImage}/>
                                        <Text style={styles.featureText}>No G.M.O</Text>
                                    </View>
                                    <View style={styles.feature} >
                                        <Image source={plant} style={styles.featureImage}/>
                                        <Text style={styles.featureText}>Sustainable</Text>
                                    </View> 
                                </View>
                                <View style={styles.mission}>
                                    <Text style={styles.missionTitle}>JOIN THE MISSION</Text>
                                    <Text style={styles.missionDesc}>
                                        "Indulge in a plate of goodness of Greenbird, with a smile on your face
                                        knowing that you haven't harmed a single animal and in doing so you are
                                        contributing toward a sustainable future."
                                    </Text>
                                </View>
                                    <Button
                                        title="SUBMIT"
                                        containerStyle={styles.submit}
                                        onPress={handleAnonymousLogin}
                                        isLoading={user.status===PENDING}
                                    />
                                    {
                                        user.message &&
                                        <Text style={styles.error}>{user.message}</Text>
                                    }
                        </View>
                    </TouchableWithoutFeedback>      
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    background:{
        resizeMode:'cover',
        flex:1,
    },
    avoidContainer:{
        flex:1,
        alignItems:'center'
    },
    container:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:30,
        paddingBottom:30,
        alignItems:'stretch',
        maxWidth:400
    },
    scroll:{
        paddingTop:15

    },
    whiteCont:{
        maxWidth:450,
        width:'100%',
    },  
    heading:{
        fontSize:26,
        color:COLORS.white,
        fontWeight:'600',
        marginBottom:20,
        textAlign:'center'
    },
    inputGroup:{
        marginBottom:30,
    },
    submit:{
        marginTop:20,
        alignSelf:'center'
    },
    error:{
        fontSize:16,
        color:COLORS.orange,
        marginTop:20,
        textAlign:'center',
        fontWeight:"600"
    },
    featuresCont:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:20,
        maxWidth:400,
    },
    feature:{
        width:90,
        marginHorizontal:10
    },
    featureImage:{
        width:90,
        height:90,
    },
    featureText:{
        color:'#fff',
        fontSize:14,
        textAlign:'center'
    },
    mission:{
        marginBottom:10,
        marginTop:10
    },
    missionTitle:{
        fontSize:20,
        fontWeight:'700',
        textAlign:'center',
        color:'#FFC100',
        marginBottom:10
    },
    missionDesc:{
        fontWeight:'600',
        color:'#fff',
        textAlign:'center',
        fontSize:16
    },
    input:{
        marginBottom:20
    }
})
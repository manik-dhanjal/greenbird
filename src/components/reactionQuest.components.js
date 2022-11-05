import React from 'react'
import {Image, View, Pressable, StyleSheet, Text} from 'react-native'
import hands from '../assets/images/hands.png';
import meh from '../assets/images/meh.png';
import sad from '../assets/images/sad.png';
import tasty from '../assets/images/tasty.png';
import smile from '../assets/images/smile.png';


const list = [smile, tasty, meh, hands, sad];
const names = ["Good","Tasty","Average","Excellent","Not \nSatisfied"]
const ReactionQuest = ({question,handleSubmit, productImage, selected}) => {
    const textColor = (current) => {
        if(names[current]==selected){
            return{
                color:'#FFC100'
            }
        }else{
            return{
                color:'#fff'
            }
        }
    }
    return (
      <View style={styles.container}>
        <View>
            <View style={styles.question}>
                <Text style={styles.questionText}>{question}</Text>
            </View>
            <View style={styles.emojiCollection}>
                {
                    list.map((item,id) => (
                        <Pressable onPress={() => handleSubmit(names[id])} style={styles.emojiCont} key={id+"emoji"}>
                            <Image source={item} style={styles.emoji}/>
                            <Text style={[styles.emojiText,textColor(id)]}>{names[id]}</Text>
                        </Pressable>
                    ))
                }
            </View>
        </View>
        <View style={styles.productImageCont}>
            <Image source={productImage} style={styles.productImage}/>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'space-around',
        flex:1
    },
    question:{
        marginBottom:40,
    },
    questionText:{
        color:'#fff',
        fontSize:25,
        fontWeight:'600'
    },
    emoji:{
      width:60,
      height:60
    },
    emojiCollection:{
        flexDirection:'row',
        justifyContent:'center'
    },
    emojiCont:{
        marginHorizontal:4,
        width:64
    },
    productImage:{
        width:300,
        height:300,
        resizeMode:'contain'
    },
    emojiText:{
        fontSize:16,
        textAlign:'center'
    }
  })

export default ReactionQuest
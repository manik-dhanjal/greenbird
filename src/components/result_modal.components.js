import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../constants/theme.constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from './button.components';

const ResultModal = ({
  isModalVisible,
  correctCount,
  totalCount,
  handleCheckout,
  handleQuizTryAgain
}) => {
  let message = "Result";
  switch(correctCount){
    case 5:{ 
      message = "Excellent";
      break;
    }
    case 4:{ 
      message = "Very Good";
      break;
    }
    case 3:{ 
      message = "Good";
      break;
    }
    case 2:{ 
      message = "Average";
      break;
    }
    default:{
      message = "Please Try Again"
    }
  }
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black + '90',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            borderRadius: 5,
            padding: 40,
            alignItems: 'center',
            maxWidth:500
          }}>
          <Text style={{fontSize: 28, color: COLORS.black}}>{message}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',

            }}>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{color: COLORS.success, fontSize: 30}}>
                {correctCount}
              </Text>
              <Text style={{fontSize: 16,color:'#000'}}>Correct</Text>
            </View>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{color: COLORS.error, fontSize: 30}}>
                {totalCount-correctCount}
              </Text>
              <Text style={{fontSize: 16,color:'#000'}}>Incorrect</Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            {/* {
              correctCount<=1 && ( */}
                <Button onPress={handleQuizTryAgain} isInverted = {true} containerStyle={styles.btn}>
                      <MaterialIcons name="refresh" style={{color: COLORS.orange,fontSize:20}} />
                      <Text
                      style={{
                          textAlign: 'center',
                          color: COLORS.orange,
                          marginLeft: 10,
                          fontSize:18
                      }}>
                        Try Again
                      </Text>
                </Button>
              {/* )
            } */}

            <Button onPress={handleCheckout} containerStyle={styles.btn}>
                  <MaterialIcons name="redeem" style={{color: COLORS.white,fontSize:20}} />
                  <Text
                  style={{
                      textAlign: 'center',
                      color: COLORS.white,
                      marginLeft: 10,
                      fontSize:18
                  }}>
                  Redeem your gift
                  </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  bottomView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    flexWrap:'wrap'
  },
  btn:{
    marginHorizontal:10,
    marginVertical:10,
    paddingHorizontal:15
  }
})
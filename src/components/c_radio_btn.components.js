import { StyleSheet,View,Text} from 'react-native'
import React from 'react'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const styles = StyleSheet.create({
    container:{
        width:'100%'
    },
    buttonStyle:{

    },
    label:{
        fontSize:18,
        color:"#fff",
        fontWeight:"600"
    },
    optionWrap:{
        marginRight:10
    },
    group:{
        paddingVertical:10
    }
})
const C_RadioInput = ({radio_props,label="",name,onChange,containerStyles,value}) => {
  return (
    <View style={[styles.container,containerStyles]}>
        {
            label
            &&
            <Text style={styles.label}>
                {label}
            </Text>
        }
        <RadioForm formHorizontal={true} animation={true} >
            {
                radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} style={styles.group}>
                    <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={value === obj.value}
                        onPress={() => onChange(name,obj.value)}
                        borderWidth={2}
                        buttonInnerColor={'#fff'}
                        buttonOuterColor={'#fff'}
                        buttonSize={14}
                        buttonOuterSize={22}
                        buttonStyle={styles.buttonStyle}
                    />
                    <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => onChange(name,obj.value)}
                    labelStyle={{fontSize: 18, color: '#fff'}}
                    labelWrapStyle={styles.optionWrap}
                    />
                </RadioButton>
                ))
            }  
        </RadioForm>
    </View>
  )
}

export default C_RadioInput
import { Dimensions } from 'react-native';

class GB_Utils{
    constructor(){
        const { width, height } = Dimensions.get('window');
        this.width = width;
        this.height = height
        this.guidelineBaseWidth = 350;
        this.guidelineBaseHeight = 680;
    }
    static shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
        return array;
    }

    //Guideline sizes are based on standard ~5" screen mobile device
    scale(size){
        return this.width / this.guidelineBaseWidth * size;
    }
    verticalScale(size){
        return this.height / this.guidelineBaseHeight * size;
    }
    moderateScale(size,factor=0.5){
        size + ( this.scale(size) - size ) * factor
    }
}

export default new GB_Utils();
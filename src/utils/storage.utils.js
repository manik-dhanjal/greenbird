// import AsyncStorage from '@react-native-async-storage/async-storage';

// class LocalStorage {
//     static async addElementToArray(element, key){
//         const value = await AsyncStorage.getItem(key)
//         if(value !== null) {
//            const arr = JSON.parse(value);
//            const stringifiedArr= JSON.stringify([...arr,element]);
//            await AsyncStorage.setItem(key,stringifiedArr);
//         }
//         else{
//            const stringifiedArr = JSON.stringify([element]);
//            await AsyncStorage.setItem(key,stringifiedArr);
//         }
//     }
//     static async setCurrentUser(user){
//         const value = await AsyncStorage.getItem('users')
//         if(value!=null){
//             const arr = JSON.parse(value);
//             const isUserPresent = arr.find(ele => ele.phone === user.phone);
//             if(!isUserPresent){
//                 await AsyncStorage.setItem('users',JSON.stringify([...arr,user]));
//             }
//         }else{
//             const stringifiedArr = JSON.stringify([element]);
//             await AsyncStorage.setItem(key,stringifiedArr);
//         }
//     }
//     static async setQuizResponse(quiz){
//         await LocalStorage.addElementToArray(quiz,'quizs')
//     }
//     static async addFeedbackResponse(feedback){
//         await LocalStorage.addElementToArray(feedback,'feedbacks')
//     }
//     static async getUsers(){
//         const value = await AsyncStorage.getItem('users');
//         if(value!=null) return await JSON.parse(value);
//         return [];
//     }
//     static getQuizResponsesByUserId(){

//     }
//     static getFeedbackResponsesByUserId(){
        
//     }
// };
// export default LocalStorage;
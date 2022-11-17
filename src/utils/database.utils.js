import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';

const appIdInFirestore = "Greenbird"


export const createUserDocument = async (user={}) => {
  const userDocRefById = firestore().collection('apps').doc(appIdInFirestore).collection('Users').doc(user.phone);
  const userSnapshot = await userDocRefById.get();
  if(!userSnapshot.exists){
    const createdAt = new Date();
    const newUserDoc = {
      phoneNumber:user.phone,
      createdAt,
      name:user.name,
      email:user.email,
      location: user.location
    }
    const usersRef = firestore().collection('apps').doc(appIdInFirestore).collection('Users');
    const userSnapshotsByPhone = await usersRef.where('phoneNumber','==',user.phone).get();

    if(userSnapshotsByPhone.length>0){
      return userSnapshotsByPhone[0].data();
    }else{
      const result = await userDocRefById.set(newUserDoc)
      return newUserDoc;
    }
  }
  return userSnapshot.data()
}


export const getUserDocumentById = async (userId) => {
  const userDocRef = firestore().collection('apps').doc(appIdInFirestore).collection('Users').doc(userId);
  const userSnapshot = await userDocRef.get();
  if(userSnapshot.exists)
    return userSnapshot.data()
  
    return null;
}

export const setFeedbackResponse = async (feedbackResponses, userId) => {
  const userRef = firestore().collection('apps').doc(appIdInFirestore).collection('Users').doc(userId);
  const responseCollectionRef = firestore().collection('apps').doc(appIdInFirestore).collection('feedbackResponses');

  const createdAt = new Date();
  const responseDoc = await responseCollectionRef.add({
    userRef:userRef,
    createdAt,
    ...feedbackResponses
  })

  await userRef.update({
      feedbackResponseRef: firebase.firestore.FieldValue.arrayUnion(responseCollectionRef.doc(responseDoc.id)),
  })
  return responseDoc.id;
}
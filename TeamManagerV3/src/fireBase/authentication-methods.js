import auth from '@react-native-firebase/auth';

export const loginFireBaseUser = (email, password)=>
new Promise ((resolve, reject)=>
auth().signInWithEmailAndPassword(email, password)
.then((credential) => resolve(credential.user))
.catch((error) => reject('incorrect credentials', error)),

);
export const signOutFirebaseUser = async() => auth().signOut();
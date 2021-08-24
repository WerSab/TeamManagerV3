import React from 'react';
import {createContext} from 'react';
import useFirebaseUser from '../fireBase/useFirebaseUser';

export const FirebaseUserContext = createContext({
  user: null,
  updateUser: (user) => {},
  initializing: true,
});

const FirebaseUserProvider = ({children}) =>{
    const [user, setUser, initializingUser] = useFirebaseUser();
    return (
        <FirebaseUserContext.Provider value={({user:user, updateUser:setUser, initializing: initializingUser})}>
            {children}
        </FirebaseUserContext.Provider>
    )
}
export default FirebaseUserProvider;
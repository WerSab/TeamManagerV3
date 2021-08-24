import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

const useFirebaseUser = () => {
    const [user, setUser] = useState(null);
    const[initializingUser, setInitializingUser] = useState(true);

    useEffect(()=>
    auth().onAuthStateChanged((user)=> {
        setUser(user);
        setInitializingUser(false);
    }), []);
    return [user, setUser, initializingUser];
};

export default useFirebaseUser;
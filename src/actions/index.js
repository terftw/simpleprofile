import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../firebase/FireBase';

export const fetchProfile = () => async dispatch => {
    const docRef = doc(db, "user", "glintsdemo");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        dispatch({ type: 'FETCH_PROFILE', payload: docSnap.data() })
    }else {
        console.log('gg');
    }
}

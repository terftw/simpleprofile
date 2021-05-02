import { doc, getDoc, writeBatch } from "firebase/firestore"; 
import { db } from '../firebase/FireBase';
import _ from 'lodash';

const docRef = doc(db, "user", "glintsdemo");

export const fetchProfile = () => async dispatch => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        dispatch({ type: 'FETCH_PROFILE', payload: docSnap.data() })
    }else {
        console.log('gg');
    }
}

export const editBasic = (data, history) => async dispatch => {
    const batch = writeBatch(db);

    batch.update(docRef, { ...data });
    await batch.commit();

    dispatch({ type: 'EDIT_PROFILE', payload: data});
    history.push('/');
}
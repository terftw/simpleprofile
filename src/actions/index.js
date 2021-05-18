import { doc, getDoc, runTransaction } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { db, storage } from '../database/FireBase';

const docRef = doc(db, "user", "glintsdemo");
const fetchProfile = () => async dispatch => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        dispatch({ type: 'FETCH_PROFILE', payload: docSnap.data() })
    } else {
        console.log('WORK IN PROGRESS');
    }
}
const editBasic = (data, history) => async dispatch => {
    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(docRef);
            if (!userDoc.exists()) {
                throw new Error ({code: 322, message: "Document does not exist!"});
            }
        
            transaction.update(docRef, { ...data });
        });
        dispatch({ type: 'IS_ONLINE' })
    } catch (e) {
        dispatch({ type: 'IS_OFFLINE' })
    } finally {
        dispatch({ 
            type: 'EDIT_PROFILE', 
            payload: data,
        });
    
        history.push('/');   
    }
}
const editProfilePic = (data, link) => dispatch => {
    const storageRef = ref(storage, `images/profilepic.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
            switch (error.code) {
                case 'storage/retry-limit-exceeded':
                    dispatch({ type: 'IS_OFFLINE' })
                    break;
                default:
                    console.log("WORK IN PROGRESS");
            }

            dispatch({ type: 'FINISH_UPLOAD' });
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_PROFILE_PIC', payload: { profileImage: downloadURL } });
                dispatch({ type: 'IS_ONLINE' });
                dispatch({ type: 'FINISH_UPLOAD' });
            });
        }
    );
}
const addWorkExpPic = (data) => dispatch => {
    const storageRef = ref(storage, `dump/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
            switch (error.code) {
                case 'storage/retry-limit-exceeded':
                    dispatch({ type: 'IS_OFFLINE' })
                    break;
                default:
                    console.log("WORK IN PROGRESS");
                    break;
            }

            dispatch({ type: 'FINISH_UPLOAD' });
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_LOGO', payload: downloadURL });
                dispatch({ type: 'IS_ONLINE' })
                dispatch({ type: 'FINISH_UPLOAD' });
            });
        }
    );
}
const addWorkExp = (data, history) => async dispatch => {
    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(docRef);
            if (!userDoc.exists()) {
                throw new Error ({code: 322, message: "Document does not exist!"});
            }
        
            transaction.update(docRef, { ...data });
        });
        
        dispatch({ type: 'IS_ONLINE' })
    } catch (e) {
        dispatch({ type: 'IS_OFFLINE' })
    } finally {
        dispatch({ type: 'ADD_WORK_EXP', payload: data});
        dispatch({ type: 'DELETE_LOGO'});
        history.push('/'); 
    }
}
const offlineEditBasic = (data, history) => dispatch => {
    dispatch({ type: 'EDIT_PROFILE', payload: data })
    history.push('/');
}
const offlineAddWorkExp = (data, history) => dispatch => {
    dispatch({ type: 'ADD_WORK_EXP', payload: data});
    dispatch({ type: 'DELETE_LOGO'});
    history.push('/'); 
}
const retrySubmit = data => async dispatch => {
    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(docRef);
            if (!userDoc.exists()) {
                throw new Error ({code: 322, message: "Document does not exist!"});
            }

            transaction.update(docRef, { ...data });
            dispatch({ type: 'IS_ONLINE' })
        });
    } catch (e) {
        dispatch({ type: 'IS_OFFLINE' })
    } finally {
        dispatch({ type: 'SUBMIT_PROFILE', payload: data});
        dispatch({ type: 'RESUBMIT_COMPLETE' })
    }
}
const tryingResubmit = () => {
    return {
        type: 'TRY_RESUBMIT'
    }
}

const startImageUpload = () => {
    return { 
        type: 'START_UPLOAD'
    }
}

export {
    fetchProfile,
    editBasic,
    editProfilePic,
    addWorkExpPic,
    addWorkExp,
    offlineEditBasic,
    offlineAddWorkExp,
    retrySubmit,
    tryingResubmit,
    startImageUpload
}

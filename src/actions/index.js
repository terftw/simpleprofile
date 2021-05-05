import { doc, getDoc, runTransaction, writeBatch } from "firebase/firestore"; 
import { db, storage } from '../database/FireBase';
import localForage from '../database/LocalForage';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const docRef = doc(db, "user", "glintsdemo");

const fetchProfile = () => async dispatch => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        dispatch({ type: 'FETCH_PROFILE', payload: docSnap.data() })
    } else {
        console.log('gg');
    }
}

const editBasic = (data, history) => async dispatch => {
    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(docRef);
            if (!userDoc.exists()) {
                throw "Document does not exist!";
            }
        
            transaction.update(docRef, { ...data });
        });
        
        console.log("Transaction successfully committed!");
        dispatch({ type: 'IS_ONLINE' })
    } catch (e) {
        console.log("Transaction failed: ", e);
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
    const storageRef = ref(storage, link);
    console.log(data.preview)
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //     case 'paused':
            //         console.log('Upload is paused');
            //         break;
            //     case 'running':
            //         console.log('Upload is running');
            //         break;
            // }
        },
        (error) => {
            switch (error.code) {
                case 'storage/retry-limit-exceeded':
                    localForage.setItem('profileImage', data).then(value => {
                        console.log(value);
                        dispatch({ type: 'EDIT_PROFILE_PIC', payload: { profileImage: Object.assign(value, { preview: URL.createObjectURL(value) }) } });
                    }).catch(err => {
                        console.log(err);
                    })
                    dispatch({ type: 'IS_OFFLINE' })
                default:
            }
        },
        () => {
            console.log('came here for some reason')
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_PROFILE_PIC', payload: { profileImage: downloadURL } });
                dispatch({ type: 'IS_ONLINE' })
            });
        }
    );
}

const addWorkExpPic = (data) => dispatch => {
    const storageRef = ref(storage, `dump/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //     case 'paused':
            //         console.log('Upload is paused');
            //         break;
            //     case 'running':
            //         console.log('Upload is running');
            //         break;
            // }
        },
        (error) => {
            switch (error.code) {
                case 'storage/retry-limit-exceeded':
                    dispatch({ type: 'IS_OFFLINE' })
                default:
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_LOGO', payload: downloadURL });
                dispatch({ type: 'IS_ONLINE' })
            });
        }
    );
}

const addWorkExp = (data, history) => async dispatch => {
    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(docRef);
            if (!userDoc.exists()) {
                throw "Document does not exist!";
            }
        
            transaction.update(docRef, { ...data });
        });
        
        console.log("Transaction successfully committed!");
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
    console.log('offline edit basic')
    dispatch({ type: 'EDIT_PROFILE', payload: data })
    history.push('/');
}

const offlineAddWorkExp = (data, history) => dispatch => {
    console.log('offline add work xp')
    dispatch({ type: 'ADD_WORK_EXP', payload: data});
    dispatch({ type: 'DELETE_LOGO'});
    history.push('/'); 
}

const retrySubmit = data => async dispatch => {
    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(docRef);
            if (!userDoc.exists()) {
                throw "Document does not exist!";
            }
        
            transaction.update(docRef, { ...data });
        });
        
        dispatch({ type: 'IS_ONLINE' })
    } catch (e) {
        dispatch({ type: 'IS_OFFLINE' })
    } finally {
        dispatch({ type: 'SUBMIT_PROFILE', payload: data});
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
    retrySubmit
}

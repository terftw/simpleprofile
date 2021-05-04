import { doc, getDoc, writeBatch } from "firebase/firestore"; 
import { db, storage } from '../firebase/FireBase';
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
    const batch = writeBatch(db);

    batch.update(docRef, { ...data });
    await batch.commit();

    dispatch({ type: 'EDIT_PROFILE', payload: data});
    history.push('/');
}

const editProfilePic = (data, link) => dispatch => {
    const storageRef = ref(storage, link);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {},
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_PROFILE_PIC', payload: { profileImage: downloadURL } });
            });
        }
    );
}

const addWorkExpPic = (data) => dispatch => {
    const storageRef = ref(storage, `dump/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {},
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_LOGO', payload: downloadURL });
            });
        }
    );
}

const addWorkExp = (data, history) => async dispatch => {
    const batch = writeBatch(db);

    batch.update(docRef, { ...data });
    await batch.commit();

    dispatch({ type: 'ADD_WORK_EXP', payload: data});
    dispatch({ type: 'DELETE_LOGO'});
    history.push('/');
}

export {
    fetchProfile,
    editBasic,
    editProfilePic,
    addWorkExpPic,
    addWorkExp
}

import { doc, getDoc, writeBatch } from "firebase/firestore"; 
import { db, storage } from '../firebase/FireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

export const editProfilePic = (data, link) => dispatch => {
    const storageRef = ref(storage, link);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch({ type: 'EDIT_PROFILE_PIC', payload: { profileImage: downloadURL } });
            });
        }
    );
}
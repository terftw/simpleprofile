const ImageUploadReducer = (state = false, action) => {
    switch(action.type) {
        case 'START_UPLOAD':
            return true
        case 'FINISH_UPLOAD':
            return false;
        default:
            return state;
    }
}

export default ImageUploadReducer;

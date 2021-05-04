const LogoReducer = (state = "https://firebasestorage.googleapis.com/v0/b/glints-demo.appspot.com/o/images%2Fplaceholder.png?alt=media&token=5131e7e2-7a74-492e-8389-e63ffc0234d6", action) => {
    switch(action.type) {
        case 'EDIT_LOGO':
            return action.payload
        case 'DELETE_LOGO':
            return "https://firebasestorage.googleapis.com/v0/b/glints-demo.appspot.com/o/images%2Fplaceholder.png?alt=media&token=5131e7e2-7a74-492e-8389-e63ffc0234d6";
        default:
            return state;
    }
}

export default LogoReducer;

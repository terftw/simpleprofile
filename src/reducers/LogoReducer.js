const LogoReducer = (state = "", action) => {
    switch(action.type) {
        case 'EDIT_LOGO':
            return action.payload
        case 'DELETE_LOGO':
            return "";
        default:
            return state;
    }
}

export default LogoReducer;

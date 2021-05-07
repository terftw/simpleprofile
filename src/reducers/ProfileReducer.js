const ProfileReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_PROFILE':
        case 'SUBMIT_PROFILE':
            return action.payload
        case 'EDIT_PROFILE':
        case 'EDIT_PROFILE_PIC':
        case 'ADD_WORK_EXP':
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default ProfileReducer;

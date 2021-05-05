const NetworkReducer = (state = true, action) => {
    switch(action.type) {
        case 'IS_OFFLINE':
            return false;
        case 'IS_ONLINE':
            return true;
        default:
            return state;
    }
}

export default NetworkReducer;

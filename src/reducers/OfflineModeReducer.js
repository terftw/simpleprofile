const OfflineModeReducer = (state = false, action) => {
    switch(action.type) {
        case 'TRY_RESUBMIT':
            return true;
        case 'RESUBMIT_COMPLETE':
        default:
            return false;
    }
}

export default OfflineModeReducer;

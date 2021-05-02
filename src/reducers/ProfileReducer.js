export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_PROFILE':
            return action.payload
        case 'EDIT_PROFILE':
            return [...state, action.payload];
        default:
            return state;
    }
}

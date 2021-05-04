import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import LogoReducer from './LogoReducer';

export default combineReducers({
   profile: ProfileReducer,
   logo: LogoReducer
});
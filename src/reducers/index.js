import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import LogoReducer from './LogoReducer';
import NetworkReducer from './NetworkReducer';

export default combineReducers({
   profile: ProfileReducer,
   logo: LogoReducer,
   network: NetworkReducer
});
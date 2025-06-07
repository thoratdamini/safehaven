import { combineReducers } from 'redux';
import languageReducer from '../reducer/reducer';

const rootReducer = combineReducers({
  language: languageReducer
});

export default rootReducer;
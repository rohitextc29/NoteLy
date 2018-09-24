import { combineReducers } from 'redux';
import notelist from './notelist';

export default  combineReducers({ 
	notelist: notelist,
});
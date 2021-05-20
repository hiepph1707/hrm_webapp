import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './login/state/loginReducer'
import timeKeepingReducer from './timekeeping/state/timeKeepingReducer'
import paycheckReducer from './paycheck/state/paycheckReducer'
import settingReducer from './setting/state/settingReducer'
import workshiftReducer from './workshift/state/workshiftReducer'

const allRedurcers = combineReducers({
	loginReducer:loginReducer,
	timeKeepingReducer: timeKeepingReducer,
	paycheckReducer: paycheckReducer,
	settingReducer: settingReducer,
	workshiftReducer: workshiftReducer
})
const store = createStore(allRedurcers,applyMiddleware(thunk));

export default store

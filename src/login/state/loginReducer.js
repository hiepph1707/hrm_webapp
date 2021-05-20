import {
	LOGIN_FAIL,
	ON_CHANGE,
	ACTION_LOADING,
	LOGIN_SUCCESS,
	RESET_STATE
} from './loginType'

const initialState = {
	error:"",
  token:"",
	username:"",
	password:"",
	isProccess: false,
	isAuthen:false
}

const loginReducer = (state = initialState,action) =>{
	var newState = {...state}
	const payload = {...action.payload}

	switch (action.type) {

		case LOGIN_SUCCESS:
			newState.isAuthen = true
		break

		case LOGIN_FAIL:
			newState.error = payload.value
				newState.isAuthen = false
		break;

		case ON_CHANGE:
			newState.[payload.key] = payload.value

		break;

		case ON_CHANGE:
			newState.[payload.key] = payload.value

		break;

		case ACTION_LOADING:
			newState.isProccess = payload.isProccess
		break

		case RESET_STATE:
			newState = initialState
		default:

	}

	return newState
}

export default loginReducer

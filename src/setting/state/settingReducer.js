import {SAVE_SETTING,SHOW_ERROR,SHOW_LOADING,RESET_STATE} from './settingType'

const initialState = {
	error:"",
	isSuccess: false,
	isShow:false,
	isShowError:false
}

const settingReducer = (state = initialState,action) => {
	var newState = {...state}
	const payload = {...action.payload}

	switch (action.type) {
    case SAVE_SETTING:
      newState.isSuccess = payload.isSuccess
			newState.isShow = false
    break

		case SHOW_LOADING:
      newState.isShow = payload.isShow
    break

		case SHOW_ERROR:
      newState.isShowError = payload.isShowError
			newState.error = payload.messages

    break

		case RESET_STATE:
			newState = initialState
		break

		default:
			break
	}

	return newState
}

export default settingReducer

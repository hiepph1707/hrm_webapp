import {GET_WORK_SHIFT} from './workshiftType'

const initialState = {
	error:"",
  dataWorkShift:{},
	isProccess: false,
  isShowError:false,
	messages:""
}

const workshiftReducer = (state = initialState,action) => {
	var newState = {...state}
	const payload = {...action.payload}

	switch (action.type) {
    case GET_WORK_SHIFT:
      newState.dataWorkShift = payload.data
		break

		default:

	}

	return newState
}

export default workshiftReducer

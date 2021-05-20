import {GET_SALARY_BY_USER,ACTION_LOADING,RESET_STATE} from './paycheckType'

const initialState = {
	error:"",
	isProccess: false,
  dataSalary:{}
}

const paycheckReducer = (state = initialState,action) =>{
	var newState = {...state}
	const payload = {...action.payload}

	switch (action.type) {
    case ACTION_LOADING:
      newState.isProccess = payload.isProccess
    break

    case GET_SALARY_BY_USER:
      newState.dataSalary = payload.dataSalary
    break

		case RESET_STATE:
			newState = initialState
		break

		default:

	}

	return newState
}

export default paycheckReducer

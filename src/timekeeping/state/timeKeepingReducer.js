import {
  GET_KEEPING_TIME_BY_MONTH,
  SET_START_DATE,
  ON_CHANGE_DATE,
  SHOW_DETAIL_REAL_WORKING_TIME,
  SHOW_DETAIL_REAL_WORKING_TIME_DATA,
  ACTION_LOADING,
  SHOW_DETAIL_OVERTIME,
  SHOW_DETAIL_OVERTIME_DATA,
  SHOW_DETAIL_TAKE_LEAVE_DATA,
  SHOW_DETAIL_TAKE_LEAVE,
  SHOW_DETAIL_TAKE_LEAVE_OTHER,
  SHOW_DETAIL_TAKE_LEAVE_OTHER_DATA,
  SHOW_DETAIL_TAKE_LEAVE_BHXH,
  SHOW_DETAIL_TAKE_LEAVE_BHXH_DATA,
  SHOW_ERROR,
  RESET_STATE
} from './timeKeepingType'

const monthSelelected = new Date()
monthSelelected.setDate(1)
monthSelelected.setMonth(monthSelelected.getMonth()-1)

const initialState = {
	error:"",
	startDate: monthSelelected,
  dateSelected: new Date(),
  data:[],
	isProccess: false,
  isShowRealWorkingTime: false,
  isShowOT:false,
  isShowTakeLeave:false,
  isShowTakeLeaveOther:false,
  isShowTakeLeaveBHXH:false,
  dataDetailUser:[],
  dataDetailOT:[],
  dataTakeLeave:[],
  dataTakeLeaveOther:[],
  dataTakeLeaveBHXH: [],
  fullnameSelected:"",
  isShowError:false,
	messages:""
}

const timeKeepingReducer = (state = initialState,action) => {
	var newState = {...state}
	const payload = {...action.payload}

	switch (action.type) {
    case RESET_STATE:
      newState = initialState
    break

    case SHOW_ERROR:
			if(payload.messages == ""){
				newState.isShowError = false
			}else{
				newState.isShowError = payload.isShowError
				newState.messages = payload.messages
			}
		break

		case GET_KEEPING_TIME_BY_MONTH:
			newState.data = payload.data
      newState.dateSelected = payload.dateSelected
		break;

    case SET_START_DATE:
			newState.startDate = payload.value
		break;

    case ON_CHANGE_DATE:
			newState.startDate = payload.data
		break;

    case SHOW_DETAIL_REAL_WORKING_TIME:
      newState.isShowRealWorkingTime = !payload.isShow
      break

    case SHOW_DETAIL_REAL_WORKING_TIME_DATA:
      newState.isShowRealWorkingTime = true
      newState.fullnameSelected = payload.fullname
      newState.dataDetailUser = payload.dataDetailUser
      break

    case ACTION_LOADING:
      newState.isProccess = payload.isProccess
    break

    case SHOW_DETAIL_OVERTIME:
      newState.isShowOT = !payload.isShow
    break

    case SHOW_DETAIL_OVERTIME_DATA:
      newState.isShowOT = true
      newState.fullnameSelected = payload.fullname
      newState.dataDetailOT = payload.dataDetailOT
    break

    case SHOW_DETAIL_TAKE_LEAVE:
      newState.isShowTakeLeave = !payload.isShow
    break

    case SHOW_DETAIL_TAKE_LEAVE_DATA:
      newState.isShowTakeLeave = true
      newState.fullnameSelected = payload.fullname
      newState.dataTakeLeave = payload.dataTakeLeave
    break

    case SHOW_DETAIL_TAKE_LEAVE_OTHER:
      newState.isShowTakeLeaveOther = !payload.isShow
    break

    case SHOW_DETAIL_TAKE_LEAVE_OTHER_DATA:
      newState.isShowTakeLeaveOther = true
      newState.fullnameSelected = payload.fullname
      newState.dataTakeLeaveOther = payload.dataTakeLeaveOther
    break

    case SHOW_DETAIL_TAKE_LEAVE_BHXH:
      newState.isShowTakeLeaveBHXH = !payload.isShow
    break

    case SHOW_DETAIL_TAKE_LEAVE_BHXH_DATA:
      newState.isShowTakeLeaveBHXH = true
      newState.fullnameSelected = payload.fullname
      newState.dataTakeLeaveBHXH = payload.dataTakeLeaveBHXH
    break

		default:

	}

	return newState
}

export default timeKeepingReducer

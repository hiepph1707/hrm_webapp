import {
  GET_KEEPING_TIME_BY_MONTH,
  SET_START_DATE,
  ON_CHANGE_DATE,
  SHOW_DETAIL_REAL_WORKING_TIME,
  SHOW_DETAIL_REAL_WORKING_TIME_DATA,
  ACTION_LOADING,
  SHOW_DETAIL_OVERTIME,
  SHOW_DETAIL_OVERTIME_DATA,
  SHOW_DETAIL_TAKE_LEAVE,
  SHOW_DETAIL_TAKE_LEAVE_DATA,
  SHOW_DETAIL_TAKE_LEAVE_OTHER,
  SHOW_DETAIL_TAKE_LEAVE_OTHER_DATA,
  SHOW_DETAIL_TAKE_LEAVE_BHXH,
  SHOW_DETAIL_TAKE_LEAVE_BHXH_DATA,
  SHOW_ERROR,
  RESET_STATE

} from './timeKeepingType'
import {
  URL_GET_KEEPING_TIME_BY_MONTH,
  URL_GET_DETAIL_KEEPING_TIME_BY_MONTH,
  URL_GET_OVERTIME_BY_MONTH,
  URL_GET_DETAIL_TAKE_LEAVE,
  URL_GET_DETAIL_BHXH_OTHER,
  URL_GET_KEEPING_TIME_BY_MANAGER
} from '../../api/Api'
import {COOKIE_TOKEN,COOKIE_USER_NAME} from '../../common/Constant'
import Moment from 'moment';

export const resetState = () => {
  return{
    type: RESET_STATE,
    payload: {
    }
  }
}

export const onChangeDate = (date) => {
  return{
    type: ON_CHANGE_DATE,
    payload: {
      data: date
    }
  }
}

const showKeepingTime = (data,dateSelected) => {
  return{
    type: GET_KEEPING_TIME_BY_MONTH,
    payload: {
      data: data,
      dateSelected:dateSelected
    }
  }
}

export const showDetailRealKeepingTime = (isShow) => {
  return{
    type: SHOW_DETAIL_REAL_WORKING_TIME,
    payload: {
      isShow: isShow
    }
  }
}

const showDetailRealKeepingTimeWithData = (data,fullname) => {
  return{
    type: SHOW_DETAIL_REAL_WORKING_TIME_DATA,
    payload: {
      dataDetailUser:data,
      fullname: fullname
    }
  }
}

export const showLoading = (isShow) => {
  return{
    type: ACTION_LOADING,
    payload: {
      isProccess: isShow
    }
  }
}

export const showOvertimeByUserWith = (isShow) => {
  return{
    type: SHOW_DETAIL_OVERTIME,
    payload: {
      isShow: isShow
    }
  }
}

export const showOvertimeByUserWithData = (data,fullname) => {
  return{
    type: SHOW_DETAIL_OVERTIME_DATA,
    payload: {
      dataDetailOT:data,
      fullname: fullname
    }
  }
}


export const showTakeLeaveByUser = (isShow) => {
  return{
    type: SHOW_DETAIL_TAKE_LEAVE,
    payload: {
      isShow: isShow
    }
  }
}

export const showTakeLeaveByUserWithData = (data,fullname) => {
  return{
    type: SHOW_DETAIL_TAKE_LEAVE_DATA,
    payload: {
      dataTakeLeave:data,
      fullname: fullname
    }
  }
}

export const showTakeLeaveOther = (isShow) => {
  return{
    type: SHOW_DETAIL_TAKE_LEAVE_OTHER,
    payload: {
      isShow: isShow
    }
  }
}

export const showTakeLeaveOtherWithData = (data,fullname) => {
  return{
    type: SHOW_DETAIL_TAKE_LEAVE_OTHER_DATA,
    payload: {
      dataTakeLeaveOther:data,
      fullname: fullname
    }
  }
}

export const showTakeLeaveBHXH = (isShow) => {
  return{
    type: SHOW_DETAIL_TAKE_LEAVE_BHXH,
    payload: {
      isShow: isShow
    }
  }
}

export const showTakeLeaveBHXHWithData = (data,fullname) => {
  return{
    type: SHOW_DETAIL_TAKE_LEAVE_BHXH_DATA,
    payload: {
      dataTakeLeaveBHXH:data,
      fullname: fullname
    }
  }
}

export const showError = (messages) => {
  return{
    type: SHOW_ERROR,
    payload: {
      isShowError: true,
      messages:messages
    }
  }
}


export function GetDetailTakeLeaveBHXH(username,month,token,fullname){
  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${username}&type=BHXH`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_DETAIL_BHXH_OTHER}${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){
        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showTakeLeaveBHXHWithData(data.data,fullname))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }
}


export function GetDetailTakeLeaveOther(username,month,token,fullname){
  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${username}&type=KHAC`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_DETAIL_BHXH_OTHER}${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){
        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showTakeLeaveOtherWithData(data.data,fullname))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }
}


export function GetDetailTakeLeaveByUser(username,month,token,fullname){
  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${username}`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_DETAIL_TAKE_LEAVE}${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){
        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showTakeLeaveByUserWithData(data.data,fullname))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }
}

export function GetDetailOvertimeByUser(username,month,token,fullname){
  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${username}`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_OVERTIME_BY_MONTH}${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){
        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showOvertimeByUserWithData(data.data,fullname))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }
}

export function GetDetailRealTimeByUser(listWorkingDate,username,month,token,fullname){
  const monthSearch = Moment(month).format('MM/YYYY')
  const params =  new URLSearchParams()
  params.append("listWorkingDate",JSON.stringify(listWorkingDate))
  params.append("username",username)
  params.append("month",monthSearch)

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_DETAIL_KEEPING_TIME_BY_MONTH}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: params
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){
        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showDetailRealKeepingTimeWithData(data.data,fullname))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }
}

export function GetKeepingTimeByManager(sUserName,month,cookies){
  const token = cookies.get(COOKIE_TOKEN)
  var sUserManager = cookies.get(COOKIE_USER_NAME)

  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${sUserName}&manager=${sUserManager}`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_KEEPING_TIME_BY_MANAGER}${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){

        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showKeepingTime(data.data,month))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }
}

export function GetKeepingTimeByMonth(sUserName,month,cookies){

  const token = cookies.get(COOKIE_TOKEN)
  var username = cookies.get(COOKIE_USER_NAME)
  if(sUserName != ""){
    username = sUserName
  }

  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${username}`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_KEEPING_TIME_BY_MONTH}${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){

        return response.json()
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showKeepingTime(data.data,month))
      }else{
        dispatch(showLoading(false))
        dispatch(showError("Không tìm thấy dữ liệu"))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showError("Không thể lấy dữ liệu từ máy chủ ! Vui lòng liên hệ admin"))
    })
  }

}

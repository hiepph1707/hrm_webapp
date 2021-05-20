import {GET_SALARY_BY_USER,ACTION_LOADING,RESET_STATE} from './paycheckType'
import {
  URL_GET_SALARY
} from '../../api/Api'
import Moment from 'moment';

export const showLoading = (isShow) => {
  return{
    type: ACTION_LOADING,
    payload: {
      isProccess: isShow
    }
  }
}

const showSalary = (data) => {
  return{
    type: GET_SALARY_BY_USER,
    payload: {
      dataSalary: data
    }
  }
}

export const resetState = () => {
  return{
    type: RESET_STATE,
    payload: {
    }
  }
}


export function GetSalaryByUser(username,month,token){
  const monthSearch = Moment(month).format('MM/YYYY')
  const params = `?month=${monthSearch}&username=${username}`

  return dispatch =>{
    dispatch(showLoading(true))
    return fetch(`${URL_GET_SALARY}${params}`, {
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
        dispatch(showSalary({}))
      }
    }).then(data => {
      if(data.success){
        dispatch(showLoading(false))
        dispatch(showSalary(data.data))
      }else{
        dispatch(showLoading(false))
        dispatch(showSalary({}))
      }
    })
    .catch (err => {
      dispatch(showLoading(false))
      dispatch(showSalary({}))
    })
  }
}

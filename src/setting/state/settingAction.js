import {SAVE_SETTING,SHOW_ERROR,SHOW_LOADING,RESET_STATE} from './settingType'
import {
  URL_SAVE_SETTING,
  URL_IMPORT_SALARY,
  URL_IMPORT_KEEPING_TIME
} from '../../api/Api'
import {COOKIE_TOKEN,COOKIE_USER_NAME,TYPE_KEEPING_TIME,TYPE_SALARY} from '../../common/Constant'

export const saveSettingSuccess = (isSuccess) => {
  return{
    type: SAVE_SETTING,
    payload: {
      isSuccess: isSuccess
    }
  }
}

export const showLoading = (isShow) =>{
  return{
    type: SHOW_LOADING,
    payload: {
      isShow: isShow
    }
  }
}

export const showError= (isShow,messages) =>{
  return{
    type: SHOW_ERROR,
    payload: {
      isShowError: isShow,
      messages: messages
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

export function SaveSetting(fromData,token,typeFile){

  var url = typeFile == TYPE_KEEPING_TIME ? URL_IMPORT_KEEPING_TIME : URL_IMPORT_SALARY

  return dispatch =>{
        dispatch(showLoading(true))
        return fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: fromData
        }) /*end fetch */
        .then(response => {
          if(response.status && response.status === 200){
            return response.json()
          }else{
            dispatch(showError(true,"Lưu thất bại " + response.status))
            dispatch(saveSettingSuccess(false))
          }
        }).then(data => {
          if(data.success){
            dispatch(showError(true,"Lưu thành công"))
            dispatch(saveSettingSuccess(true))
          }else{
            dispatch(showError(true,data.data))
            dispatch(saveSettingSuccess(false))
          }
        })
        .catch (err => {
            dispatch(showError(true,"Lưu thất bại " + err.message))
            dispatch(saveSettingSuccess(false))
        })

  }
}

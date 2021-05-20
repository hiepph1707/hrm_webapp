import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ON_CHANGE,
  ACTION_LOADING,
  SHOW_ERROR,
  RESET_STATE
} from './loginType'
import {URL_LOGIN} from '../../api/Api'
import {useCookies} from 'react-cookie'
import {COOKIE_TOKEN,COOKIE_USER_NAME,COOKIE_USER_PERMISSION} from '../../common/Constant'

const loginFail = (key,value) => {
  const dataPayload = {
    key: key,
    value: value
  }

  return{
		type: LOGIN_FAIL,
		payload: dataPayload
	}
}

const loginSuccess = (token) => {

  return{
		type: LOGIN_SUCCESS,
		payload: {
      token:token
    }
	}
}

export const onChange = (key,value) =>{
  const dataPayload = {
    key: key,
    value: value
  }

  return{
    type: ON_CHANGE,
    payload:dataPayload
  }
}

const showLoading = (isShow) => {
  return{
    type: ACTION_LOADING,
    payload: {
      isProccess: isShow
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

export function CheckLogin(username,password,props){

  const key = "error"
  const messageErorr = "Đăng nhập thất bại vui lòng kiểm tra lại tài khoản"
  const dateExpired = 8 * 60 * 60 * 1000
  // const [cookies, setCookie] = useCookies([COOKIE_TOKEN]);

  return dispatch =>{
    dispatch(showLoading(true))

    return fetch(URL_LOGIN, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
         body: JSON.stringify({
            username: username,
            password: password,
            Authorization: 'TheReturnedToken',
        })
    }) /*end fetch */
    .then(response => {
      if(response.status && response.status === 200){
        dispatch(loginFail(key,""))
        return response.json()
      }else{
        dispatch(loginFail(key,messageErorr))
      }

    })
    .then(response => {
        if (response.accessToken) {
          props.cookies.set(COOKIE_TOKEN,response.accessToken,{path: '/', expires: new Date(Date.now()+dateExpired)})
          props.cookies.set(COOKIE_USER_NAME,username,{path: '/', expires: new Date(Date.now()+dateExpired)})
          props.cookies.set(COOKIE_USER_PERMISSION,response.authorities.join(","),{path: '/', expires: new Date(Date.now()+dateExpired)})
          dispatch(loginSuccess(response.accessToken))
          props.history.push('/home/timekeeping')
        }
        else {
          dispatch(loginFail(key,messageErorr))
        }

        dispatch(showLoading(false))
    })
    .catch (err => {
        dispatch(loginFail(key,messageErorr))
        dispatch(showLoading(false))
    })
  }
}

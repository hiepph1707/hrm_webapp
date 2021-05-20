import React,{Component,useState,useEffect} from 'react';
import SideBar from '../components/SideBar';
import { IntlProvider } from 'react-intl';
import messages from '../i18n/messages';
import { FaBars,FaSignOutAlt} from 'react-icons/fa';

import { BsPeopleFill } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
import { FaNetworkWired } from 'react-icons/fa';
import { BsCalendar } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import TimeKeepingPage from '../timekeeping-page/timeKeepingPage'
import SettingPage from '../setting-page/settingPage'
import PaycheckPage from '../paycheck-page/paycheckPage'
import WorkShiftPage from '../workshift-page/workshiftPage'
import './css/homePage.css'
import {COOKIE_TOKEN,COOKIE_USER_NAME,COOKIE_USER_PERMISSION} from '../common/Constant'
import {useSelector,useDispatch,connect} from 'react-redux'
import {resetState as resetStateLogin} from '../login/state/loginAction'
import {resetState as resetStatePayCheck} from '../paycheck/state/paycheckAction'
import {resetState as resetStateSetting} from '../setting/state/settingAction'
import {resetState as resetStateTimeKeeping} from '../timekeeping/state/timeKeepingAction'
import {withCookies,Cookies,useCookies} from 'react-cookie'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

function Home(){
  const [cookies,setCookies,removeCookies] = useCookies([COOKIE_TOKEN])
  const [locale, setLocale] = useState('en');
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const username = useSelector(state => state.loginReducer.username)
  const dispatch = useDispatch()

  const handleCollapsedChange = () => {
     setCollapsed(!collapsed)
  }

  const handleToggleSidebar = (value) => {
     setToggled(!toggled)
     handleCollapsedChange()
  };

  const _logout = (e) => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    dispatch(resetStateLogin())
    dispatch(resetStatePayCheck())
    dispatch(resetStateSetting())
    dispatch(resetStateTimeKeeping())
    removeCookies(COOKIE_TOKEN)
    removeCookies(COOKIE_USER_NAME)
    removeCookies(COOKIE_USER_PERMISSION)

    history.push('/')
  }

  const history = useHistory();
  if(!cookies.access_token){
    history.push('/')
  }

  return(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="app">

        <SideBar username={ username == "" ? cookies.user_name : username} isCollapse={collapsed} isToggle={toggled} handleToggleSidebar={handleToggleSidebar}/>
        <main>
          <div id="timekeeping-detail">

              <div className="timekeeping-detail-header">
                <div className="timekeeping-detail-header-left">
                  <HiMenu className="timekeeping-detail-header-left-icon-1" onClick={() => handleToggleSidebar()} />
                  <BsPeopleFill className="timekeeping-detail-header-left-icon-2" />
                  <span className="text-center text-color timekeeping-detail-header-left-text">H R M</span>
                </div>
                <div className="timekeeping-detail-header-right">
                  <img src="/image/logoBPO1.png" className="timekeeping-detail-header-right-logo" alt="logo" />
                  <div className="timekeeping-detail-header-right-singout" onClick={(e) => _logout(e)}>
                    <FaSignOutAlt className="timekeeping-detail-header-right-icon" />
                    <span >Đăng xuất</span>
                  </div>
                </div>
              </div>

              <div className="timekeeping-detail-body">
                  <Switch>
                    <Route path="/home/timekeeping" component={TimeKeepingPage} />
                    <Route path="/home/paycheck" component={PaycheckPage} />
                    <Route path="/home/setting" component={SettingPage} />
                  </Switch>
              </div>
          </div>
        </main>

      </div>
    </IntlProvider>

  )
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch =>({
})

// export default withCookies(App);
export default
withCookies(connect(
	mapStateToProps,
	mapDispatchToProps
)(Home))
// export default Home

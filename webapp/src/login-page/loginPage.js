import React, { Component } from 'react';
import './css/Login.css';
import '../Common.css';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsLockFill } from 'react-icons/bs';
import { BsPeopleFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {CheckLogin,onChange} from '../login/state/loginAction';
import {Loading} from '../components/Loading';
import {withRouter} from "react-router";
import {withCookies,Cookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

class Login extends Component {

    constructor() {
        super()
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        this.props.checkLogin(this.props.username,this.props.password,this.props)
    };

    _showError = () =>{
        if(this.props.error && this.props.error.trim() != ""){
          return <b className="mt-3 text-danger">{this.props.error}</b>
        }
    }

    _showLoading = () => {
        return <Loading isShow={this.props.isProccess}/>
    }


    render() {

        return (
          <div className="container-login background_vertical_gradient">
        		<div className="content-login">
        			<form id="login-form">
        				<img id="logo-login" alt="logo" src="/image/logoBPO.png" />

        				<div className="container_input mt-3">
        					<input id="username" autoComplete="off" className="edit-input edit-username" type="text" name="username" placeholder="Tên đăng nhập" autoFocus="autofocus" onChange={e => this.props.onChange(e.target.name,e.target.value) } value={this.props.username}/>
        					<img className="icon_left_input" src="/image/ic_person.png"/>
        				</div>

                <div className="container_input">
        					<input id="password" autoComplete="off" className="edit-input edit-password" type="password" name="password" placeholder="Mật khẩu" onChange={e => this.props.onChange(e.target.name,e.target.value) } value={this.props.password} />
        					<img className="icon_left_input" src="/image/ic_https.png"/>
        				</div>

        				<input id="btn-login" type="submit" className="btn btn-primary background_cyan btn-full-width" value="ĐĂNG NHẬP" onClick={e => this.onSubmit(e)} />

        			</form>

              {this._showLoading()}
              {this._showError()}
        		</div>
        	</div>
        );
    }
}

const mapStateToProps = state => ({
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    token: state.loginReducer.token,
    error: state.loginReducer.error,
    isProccess: state.loginReducer.isProccess,
})

const mapDispatchToProps = dispatch =>({
  	checkLogin: (username,password,props) => dispatch(CheckLogin(username,password,props)),
    onChange: (key,value) => dispatch(onChange(key,value))
})

export default
withRouter(withCookies(connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)))

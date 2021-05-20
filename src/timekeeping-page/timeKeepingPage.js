import React,{Component,useState} from 'react'
import SideBar from '../components/SideBar'
import { IntlProvider } from 'react-intl'
import messages from '../i18n/messages'
import { FaBars,FaSignOutAlt} from 'react-icons/fa'
// import LoginPage from '../login-page/LoginPage'

import { BsPeopleFill } from 'react-icons/bs'
import { HiMenu } from 'react-icons/hi'
import { FaNetworkWired } from 'react-icons/fa'
import { BsCalendar } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { BiSearch } from "react-icons/bi";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import './css/Timekeeping.css'
import '../Common.css'

import { useCookies,withCookies } from 'react-cookie'
import CustomDatePicker from '../components/CustomDatePicker'
import { withRouter } from "react-router"
import { connect } from 'react-redux'
import { Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap';
import {
	GetKeepingTimeByMonth,
	GetDetailRealTimeByUser,
	onChangeDate,
	showDetailRealKeepingTime,
	GetKeepingTimeByManager
} from '../timekeeping/state/timeKeepingAction'
import Table from "./Table"
import {
	DetailRealWorkingTime,
	DetailOT,
	DetailTakeLeave,
	DetailTakeLeaveOther,
	DetailTakeLeaveBHXH
} from './CellDetail'
import {PopupLoading,PopupError} from '../components/Loading';


class TimeKeepingPage extends Component{

	constructor(props){
		super(props)
		this.state = {
			valueSearch:"",
			data:[]
		}

		this.refDatePicker = React.createRef()
	}

	_search(){
		this.props.getKeepingTimeByMonth("",this.props.startDate,this.props.cookies)
	}

	_handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
			if(e.target.value.trim() == ""){
				this.props.getKeepingTimeByMonth("",this.props.startDate,this.props.cookies)
			}else{
				this.props.getKeepingTimeByManager(e.target.value,this.props.startDate,this.props.cookies)
			}

    }
  }

	_onChangeText = (e) =>{
		this.setState({
			valueSearch: e.target.value
		})
	}

	render(){
		return(
			<React.Fragment>
				<div className="timekeeping-detail-tool">
					<div className="timekeeping-detail-tool-left">
						<span className="timekeeping-detail-tool-left-text">Tháng</span>
						<div className="timekeeping-detail-tool-left-date">
							<DatePicker ref={this.refDatePicker} className="timekeeping-detail-tool-left-date-input" maxDate={new Date()} selected={this.props.startDate} onChange={date => this.props.onChangeDate(date)} dateFormat="MM/yyyy" showMonthYearPicker />
							<BsCalendar className="timekeeping-detail-tool-left-date-icon" onClick={()=> this.refDatePicker.current.setFocus()}/>
						</div>
						<div className="btn btn-info btn-search" onClick={()=> this._search()} >
							<BsSearch className="btn-search-icon"/>
							<span>Tìm</span>
						</div>
					</div>
				</div>

				<Row style={{marginRight:"0px",marginLeft:"0px"}}>
					<Col md={{ span: 4, offset: 8 }} className="mt-4">
						<InputGroup className="mb-2">
			        <InputGroup.Prepend>
			          <InputGroup.Text><BiSearch /></InputGroup.Text>
			        </InputGroup.Prepend>
			        <FormControl placeholder="Tìm kiếm" onKeyDown={this._handleKeyDownSearch} />
			      </InputGroup>
					</Col>
				</Row>

				<div className="timekeeping-detail-body">

					<Table data={this.props.data}/>
				</div>

				<DetailRealWorkingTime />
				<DetailOT />
				<DetailTakeLeave />
				<DetailTakeLeaveBHXH />
				<DetailTakeLeaveOther />
				<PopupLoading isShow={this.props.isProccess} />
				<PopupError />
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state,ownProps) => ({
	isShowRealWorkingTime: state.timeKeepingReducer.isShowRealWorkingTime,
  startDate: state.timeKeepingReducer.startDate,
	data: state.timeKeepingReducer.data,
	isProccess: state.timeKeepingReducer.isProccess
})

const mapDispatchToProps = dispatch =>({
	getKeepingTimeByManager:(username,month,cookies) => dispatch(GetKeepingTimeByManager(username,month,cookies)),
  getKeepingTimeByMonth: (username,month,cookies) => dispatch(GetKeepingTimeByMonth(username,month,cookies)),
	getDetailRealTimeByUser:(username,month,cookies) => GetDetailRealTimeByUser(username,month,cookies),
	onChangeDate: (date) => dispatch(onChangeDate(date)),
	showDetailRealKeepingTime: (isShow) => dispatch(showDetailRealKeepingTime(isShow))
})

export default
withRouter(withCookies(connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeKeepingPage)))


// $(function() {
// 	$('#html').jstree()
// });

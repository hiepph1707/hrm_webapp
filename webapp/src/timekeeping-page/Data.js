import React,{useEffect} from "react"
import {useSelector,useDispatch} from 'react-redux'
import {
	showDetailRealKeepingTime,
  GetDetailRealTimeByUser,
	GetDetailOvertimeByUser,
	GetDetailTakeLeaveByUser,
	GetDetailTakeLeaveBHXH,
	GetDetailTakeLeaveOther
} from '../timekeeping/state/timeKeepingAction';
import {useCookies} from 'react-cookie'
import {COOKIE_TOKEN} from '../common/Constant'

const doubleClickStyles = {width:"100%",height:"100%",display:"flex", alignItems:"center",cursor:"pointer",justifyContent:"flex-end"}
const TypeDoubleClick = {
	DETAIL_KEEPING_TIME: "detail_keeping_time",
	DETAIL_OT: "detail_ot",
	DETAIL_TAKE_LEAVE: "detail_take_leave",
	DETAIL_TAKE_LEAVE_OTHER: "detail_take_leave_other",
	DETAIL_TAKE_LEAVE_BHXH: "detail_take_leave_bhxh"
}

const CellDataExpaned = (props) => {
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies([COOKIE_TOKEN]);
  const dateSelected = useSelector(state => state.timeKeepingReducer.dateSelected)

  if(props.isDoubleClick){
		switch (props.type) {
			case TypeDoubleClick.DETAIL_KEEPING_TIME:
				return <div style={doubleClickStyles} onClick={() => dispatch(GetDetailRealTimeByUser(props.workingTime,props.username,dateSelected,cookies.access_token,props.fullname))} ><u style={{color:"blue"}}>{(props.title == "0") ? "" : props.title}</u></div>
			break;

			case TypeDoubleClick.DETAIL_OT:
				return <div style={doubleClickStyles} onClick={() => dispatch(GetDetailOvertimeByUser(props.username,dateSelected,cookies.access_token,props.fullname))} ><u style={{color:"blue"}}>{(props.title == "0") ? "" : props.title}</u></div>
			break;

			case TypeDoubleClick.DETAIL_TAKE_LEAVE:
				return <div style={doubleClickStyles} onClick={() => dispatch(GetDetailTakeLeaveByUser(props.username,dateSelected,cookies.access_token,props.fullname))} ><u style={{color:"blue"}}>{(props.title == "0") ? "" : props.title}</u></div>
			break;

			case TypeDoubleClick.DETAIL_TAKE_LEAVE_OTHER:
				return <div style={doubleClickStyles} onClick={() => dispatch(GetDetailTakeLeaveOther(props.username,dateSelected,cookies.access_token,props.fullname))} ><u style={{color:"blue"}}>{(props.title == "0") ? "" : props.title}</u></div>
			break;

			case TypeDoubleClick.DETAIL_TAKE_LEAVE_BHXH:
				return <div style={doubleClickStyles} onClick={() => dispatch(GetDetailTakeLeaveBHXH(props.username,dateSelected,cookies.access_token,props.fullname))} ><u style={{color:"blue"}}>{(props.title == "0") ? "" : props.title}</u></div>
			break;

			default:
				return <div style={doubleClickStyles} onClick={() => dispatch(GetDetailRealTimeByUser(props.workingTime,props.username,dateSelected,cookies.access_token,props.fullname))} ><u style={{color:"blue"}}>{(props.title == "0") ? "" : props.title}</u></div>
		}
  }else{
    return <div style={props.style}>{(props.title == "0") ? "" : props.title}</div>
  }
}
// style={{width:"1000px",height:"42px",display:"flex", alignItems:"center"}
export const columns_timekeeping_expanded = [
    {name: 'H??? t??n NV',wrap: true, selector:(row,index)=> row.hovaten, sortable: true,width: "11rem", cell: row => <div>{row.last_name} {row.first_name}</div>},
    {name: 'Ng??y c??ng quy ?????nh',right:true, wrap: true, selector:(row,index)=> row.specified_working_day, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.specified_working_day}/>},
    {name: 'Ng??y c??ng t??nh l????ng',right:true, wrap: true, selector:(row,index)=> row.working_salary, sortable: true, width: "5rem", cell: row => <CellDataExpaned title={row.working_salary}/>},
    {name: 'S??? ng??y l??m vi???c th???c t???',right:true, wrap: true, selector:(row,index)=> row.real_working_time, sortable: true,width: "5rem", cell: row => <CellDataExpaned type={TypeDoubleClick.DETAIL_KEEPING_TIME} isDoubleClick={true} workingTime={row.working_time} fullname={row.last_name + " " + row.first_name} username={row.user} title={row.real_working_time} />},
    {name: 'S??? ng??y kh??ng l??m vi???c',right:true, wrap: true, selector:(row,index)=> row.real_not_working_time, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.real_not_working_time} />},
    {name: 'Ngh??? ph??p',right:true, wrap: true, selector:(row,index)=> row.take_leave, sortable: true,width: "5rem", cell: row => <CellDataExpaned type={TypeDoubleClick.DETAIL_TAKE_LEAVE} isDoubleClick={true} workingTime={row.working_time} fullname={row.last_name + " " + row.first_name} username={row.user} title={row.take_leave} /> },
    {name: 'Ngh??? b??/kh??c',right:true, wrap: true, selector:(row,index)=> row.other_holiday, sortable: true,width: "6rem", cell: row => <CellDataExpaned type={TypeDoubleClick.DETAIL_TAKE_LEAVE_OTHER} isDoubleClick={true} workingTime={row.working_time} fullname={row.last_name + " " + row.first_name} username={row.user} title={row.other_holiday} />},
    {name: 'Ngh??? BHXH',right:true, wrap: true, selector:(row,index)=> row.take_leave_insurance, sortable: true,width: "5rem", cell: row => <CellDataExpaned type={TypeDoubleClick.DETAIL_TAKE_LEAVE_BHXH} isDoubleClick={true} workingTime={row.working_time} fullname={row.last_name + " " + row.first_name} username={row.user} title={row.take_leave_insurance} />},
    {name: 'Ngh??? l???',right:true, wrap: true, selector:(row,index)=> row.holiday, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.holiday} />},
    {name: 'Ngh??? thai s???n',right:true, wrap: true, selector:(row,index)=> row.maternity, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.maternity} />},
    {name: 'Kh??ng h?????ng l????ng',right:true, wrap: true, selector:(row,index)=> row.no_salary, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.no_salary} />},
    {name: 'OT',right:true, wrap: true, selector:(row,index)=> row.over_hour, sortable: true,width: "5rem", cell: row => <CellDataExpaned type={TypeDoubleClick.DETAIL_OT} isDoubleClick={true} workingTime={row.working_time} fullname={row.last_name + " " + row.first_name} username={row.user} title={row.over_hour} />},
    {name: 'S??? ng??y l??m ca 2/TSA - CUW',right:true, wrap: true, selector:(row,index)=> row.working_ca2, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.working_ca2} />},
    {name: 'S??? ng??y l??m onsite',right:true, wrap: true, selector:(row,index)=> row.number_day_onsite, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.number_day_onsite} />},
    {name: 'S??? ng??y l??m ca 3',right:true, wrap: true, selector:(row,index)=> row.numer_day_ca3, sortable: true,width: "5rem", cell: row => <CellDataExpaned title={row.numer_day_ca3} />},
    {name: 'Ghi ch??',wrap: true, selector:(row,index)=> row.note, sortable: true,width: "11rem", cell: row => <CellDataExpaned title={row.note} />},
];

export const columns_Timekeeping = [
    {name: 'H??? t??n NV',wrap: true, selector: (row,index)=> row.phong_ban, sortable: true,width: "11rem", cell: row => <div style={{fontWeight:"600"}}>{row.phong_ban}</div>},
    {name: 'Ng??y c??ng quy ?????nh',right:true, wrap: true, selector: (row,index)=> row.specified_working_day, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.specified_working_day == "0") ? "" : row.specified_working_day}</div>},
    {name: 'Ng??y c??ng t??nh l????ng',right:true, wrap: true, selector:(row,index)=> row.working_salary, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.working_salary == "0") ? "" : row.working_salary}</div>},
    {name: 'S??? ng??y l??m vi???c th???c t???',right:true, wrap: true, selector:(row,index)=> row.real_working_time, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.real_working_time == "0") ? "" : row.real_working_time}</div>},
    {name: 'S??? ng??y kh??ng l??m vi???c',right:true, wrap: true, selector:(row,index)=> row.real_not_working_time, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.real_not_working_time == "0") ? "" : row.real_not_working_time}</div>},
    {name: 'Ngh??? ph??p',right:true, wrap: true, selector:(row,index)=> row.take_leave, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.take_leave == "0") ? "" : row.take_leave}</div>},
    {name: 'Ngh??? b??/kh??c',right:true, wrap: true, selector:(row,index)=> row.other_holiday, sortable: true,width: "6rem", cell: row => <div style={{fontWeight:"600"}}>{(row.other_holiday == "0") ? "" : row.other_holiday}</div>},
    {name: 'Ngh??? BHXH',right:true, wrap: true, selector:(row,index)=> row.take_leave_insurance, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.take_leave_insurance == "0") ? "" : row.take_leave_insurance}</div>},
    {name: 'Ngh??? l???',right:true, wrap: true, selector:(row,index)=> row.holiday, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.holiday == "0") ? "" : row.holiday}</div>},
    {name: 'Ngh??? thai s???n',right:true, wrap: true, selector:(row,index)=> row.maternity, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.maternity == "0") ? "" : row.maternity}</div>},
    {name: 'Kh??ng h?????ng l????ng',right:true, wrap: true, selector:(row,index)=> row.no_salary, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.no_salary == "0") ? "" : row.no_salary}</div>},
    {name: 'OT',right:true, wrap: true, selector:(row,index)=> row.over_hour, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.over_hour == "0") ? "" : row.over_hour}</div>},
    {name: 'S??? ng??y l??m ca 2/TSA - CUW',right:true, wrap: true, selector:(row,index)=> row.working_ca2, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.working_ca2 == "0") ? "" : row.working_ca2}</div>},
    {name: 'S??? ng??y l??m onsite',right:true, wrap: true, selector:(row,index)=> row.number_day_onsite, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.number_day_onsite == "0") ? "" : row.number_day_onsite}</div>},
    {name: 'S??? ng??y l??m ca 3',right:true, wrap: true, selector:(row,index)=> row.numer_day_ca3, sortable: true,width: "5rem", cell: row => <div style={{fontWeight:"600"}}>{(row.numer_day_ca3 == "0") ? "" : row.numer_day_ca3}</div>},
    {name: 'Ghi ch??', wrap: true, selector:(row,index)=> '', sortable: true,width: "11rem", cell: row => <div style={{fontWeight:"600"}}></div>},
];

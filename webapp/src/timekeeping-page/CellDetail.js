import {useState} from 'react'
import {Modal,Button,Table} from 'react-bootstrap'
import Moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import {
	showOvertimeByUserWith,
	showDetailRealKeepingTime,
	showTakeLeaveByUser,
	showTakeLeaveBHXH,
	showTakeLeaveOther
} from '../timekeeping/state/timeKeepingAction';
import { BiHome } from 'react-icons/bi';
import NumberFormat from 'react-number-format';

export const DetailTakeLeaveBHXH = () => {
	const dispatch = useDispatch()
  const isShow = useSelector(state => state.timeKeepingReducer.isShowTakeLeaveBHXH)
	const fullname = useSelector(state => state.timeKeepingReducer.fullnameSelected)
  const startDate = useSelector(state => state.timeKeepingReducer.startDate)
	const dataTakeLeave = useSelector(state => state.timeKeepingReducer.dataTakeLeaveBHXH)
  const handleClose = () => dispatch(showTakeLeaveBHXH(isShow))
  const handleShow = () => dispatch(showTakeLeaveBHXH(isShow))


	const RenderTableDetailTakeLeave = (props) =>{

		return <Table className="stickyDataTable" size="sm" striped bordered style={{fontSize:"0.85rem"}}>
						<thead>
							<tr>
								<th>Ngày nghỉ</th>
								<th>Số ngày nghỉ</th>
							</tr>
						</thead>
						<tbody>
							{
								props.data.map((value,i) => {
									return <tr key={i}>
										<td>{value.dayLeave == "0" ? "" : value.dayLeave}</td>
										<td>{value.numberLeave == "0" ? "" : value.numberLeave}</td>
									</tr>
								})
							}
						</tbody>
					 </Table>
	}

  return(
    <>
      <Modal size="lg" show={isShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <b>SGB HRM - Chi tiết nghỉ BHXH tháng {Moment(startDate).format('MM/YYYY')} - {fullname} </b>
        </Modal.Header>
        <Modal.Body>
					<RenderTableDetailTakeLeave data={dataTakeLeave} />
				</Modal.Body>

      </Modal>
    </>
  )
}

export const DetailTakeLeaveOther = () => {
	const dispatch = useDispatch()
  const isShow = useSelector(state => state.timeKeepingReducer.isShowTakeLeaveOther)
	const fullname = useSelector(state => state.timeKeepingReducer.fullnameSelected)
  const startDate = useSelector(state => state.timeKeepingReducer.startDate)
	const dataTakeLeave = useSelector(state => state.timeKeepingReducer.dataTakeLeaveOther)
  const handleClose = () => dispatch(showTakeLeaveOther(isShow))
  const handleShow = () => dispatch(showTakeLeaveOther(isShow))

	const RenderTableDetailTakeLeave = (props) =>{

		return <Table className="stickyDataTable" size="sm" striped bordered style={{fontSize:"0.85rem"}}>
						<thead>
							<tr>
								<th>Ngày nghỉ</th>
								<th>Số ngày nghỉ</th>
							</tr>
						</thead>
						<tbody>
							{
								props.data.map((value,i) => {
									return <tr key={i}>
										<td>{value.dayLeave == "0" ? "" : value.dayLeave}</td>
										<td>{value.numberLeave == "0" ? "" : value.numberLeave}</td>
									</tr>
								})
							}
						</tbody>
					 </Table>
	}

  return(
    <>
      <Modal size="lg" show={isShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <b>SGB HRM - Chi tiết nghỉ bù/khác tháng {Moment(startDate).format('MM/YYYY')} - {fullname} </b>
        </Modal.Header>
        <Modal.Body>
					<RenderTableDetailTakeLeave data={dataTakeLeave} />
				</Modal.Body>

      </Modal>
    </>
  )
}

export const DetailTakeLeave = () => {
	const dispatch = useDispatch()
  const isShow = useSelector(state => state.timeKeepingReducer.isShowTakeLeave)
	const fullname = useSelector(state => state.timeKeepingReducer.fullnameSelected)
  const startDate = useSelector(state => state.timeKeepingReducer.startDate)
	const dataTakeLeave = useSelector(state => state.timeKeepingReducer.dataTakeLeave)
  const handleClose = () => dispatch(showTakeLeaveByUser(isShow))
  const handleShow = () => dispatch(showTakeLeaveByUser(isShow))


	const RenderTableDetailTakeLeave = (props) =>{

		return <Table className="stickyDataTable" size="sm" striped bordered style={{fontSize:"0.85rem"}}>
						<tbody>
							<tr>
								<td><b>Số dư phép đầu kỳ</b></td>
								<td><b style={{color:"blue"}}>{props.data.oldBalance == "0" ? "" : props.data.oldBalance}</b></td>
							</tr>

							<tr>
								<td><span>Ngày phép được hưởng</span></td>
								<td><span>{props.data.leaveOfReceived == "0" ? "" : props.data.leaveOfReceived}</span></td>
							</tr>

							<tr>
								<td><span>Tổng số ngày nghỉ trong tháng</span></td>
								<td><span>{props.data.totalLeaveInMonth == "0" ? "" : props.data.totalLeaveInMonth}</span></td>
							</tr>

							<tr>
								<td><span>Nghỉ lễ</span></td>
								<td><span>{props.data.holiday == "0" ? "" : props.data.holiday}</span></td>
							</tr>

							<tr>
								<td><span>Nghỉ khác</span></td>
								<td><span>{props.data.leaveOfOther == "0" ? "" : props.data.leaveOfOther}</span></td>
							</tr>

							<tr>
								<td><span>Nghỉ BHXH</span></td>
								<td><span>{props.data.leaveOfBhxh == "0" ? "" : props.data.leaveOfBhxh}</span></td>
							</tr>

							<tr>
								<td><span>Nghỉ trừ phép</span></td>
								<td><span>{props.data.leaveOfAbsence == "0" ? "" : props.data.leaveOfAbsence}</span></td>
							</tr>

							<tr>
								<td><span>Nghỉ trừ lương</span></td>
								<td><span>{props.data.leaveOfSalary == "0" ? "" : props.data.leaveOfSalary}</span></td>
							</tr>

							<tr>
								<td><b>Số dư phép cuối kỳ</b></td>
								<td><b style={{color:"blue"}}>{props.data.balance == "0" ? "" : props.data.balance}</b></td>
							</tr>

						</tbody>
					 </Table>
	}

  return(
    <>
      <Modal size="lg" show={isShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <b>SGB HRM - Chi tiết ngày phép tháng {Moment(startDate).format('MM/YYYY')} - {fullname} </b>
        </Modal.Header>
        <Modal.Body>
					<RenderTableDetailTakeLeave data={dataTakeLeave} />
				</Modal.Body>

      </Modal>
    </>
  )
}

export const DetailOT = () => {
	const dispatch = useDispatch()
  const isShow = useSelector(state => state.timeKeepingReducer.isShowOT)
	const fullname = useSelector(state => state.timeKeepingReducer.fullnameSelected)
  const startDate = useSelector(state => state.timeKeepingReducer.startDate)
	const dataDetailOT = useSelector(state => state.timeKeepingReducer.dataDetailOT)
  const handleClose = () => dispatch(showOvertimeByUserWith(isShow))
  const handleShow = () => dispatch(showOvertimeByUserWith(isShow))


	const RenderTableDetail = (props) =>{

		return <Table className="stickyDataTable" size="sm" striped bordered style={{fontSize:"0.85rem",textAlign:"center"}}>
						<thead>
							<tr>
								<th>Thứ</th>
								<th>Ngày</th>
								<th>OT</th>
							</tr>
						</thead>

						<tbody>
							{
									props.data.working_time.map((rowDetail,i) =>{
										return <tr key={i}>
														<td><span>{rowDetail.dow}</span></td>
														<td><span>{rowDetail.day}</span></td>
														<td><span>{rowDetail.timekeeping == "0" ? "" : rowDetail.timekeeping}</span></td>
													 </tr>
								})
							}

							<tr>
								<td><span></span></td>
								<td><b>Ngày thường (150%)</b></td>
								<td><b>{props.data.normal_day == "0" ? "" : props.data.normal_day}</b></td>
							</tr>
							<tr>
								<td><span></span></td>
								<td><b>Chủ nhật (200%)</b></td>
								<td><b>{props.data.sunday == "0" ? "" : props.data.sunday}</b></td>
							</tr>
							<tr>
								<td><span></span></td>
								<td><b>Ngày lễ (300%)</b></td>
								<td><b>{props.data.holiday == "0" ? "" : props.data.holiday}</b></td>
							</tr>
							<tr>
								<td><span></span></td>
								<td><b>Số giờ tăng ca thêm</b></td>
								<td><b>{props.data.numbder_overtime_night == "0" ? "" : props.data.numbder_overtime_night}</b></td>
							</tr>
							<tr>
								<td><span></span></td>
								<td><b>Tổng OT</b></td>
								<td><b style={{color:"blue"}}>{props.data.total_overtime == "0" ? "" : props.data.total_overtime}</b></td>
							</tr>
							<tr>
								<td><span></span></td>
								<td><b>Ghi chú</b></td>
								<td><span>{props.data.note}</span></td>
							</tr>
						</tbody>
					 </Table>
	}

  return(
    <>
      <Modal size="lg" show={isShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <b>SGB HRM - Chi tiết OT tháng {Moment(startDate).format('MM/YYYY')} - {fullname} </b>
        </Modal.Header>
        <Modal.Body>
					<RenderTableDetail data={dataDetailOT} />
				</Modal.Body>

      </Modal>
    </>
  )
}

export const DetailRealWorkingTime = () =>{
  const dispatch = useDispatch()
  const isShow = useSelector(state => state.timeKeepingReducer.isShowRealWorkingTime)
	const fullname = useSelector(state => state.timeKeepingReducer.fullnameSelected)
  const startDate = useSelector(state => state.timeKeepingReducer.startDate)
	const dataDetailUser = useSelector(state => state.timeKeepingReducer.dataDetailUser)
  const handleClose = () => dispatch(showDetailRealKeepingTime(isShow))
  const handleShow = () => dispatch(showDetailRealKeepingTime(isShow))


	const renderTableDetail = (dataDetailUser) =>{
		var totalWorkingSallary = 0

		return <Table className="stickyDataTable" size="sm" striped bordered style={{fontSize:"0.85rem",textAlign:"center"}}>
						<thead>
							<tr>
								<th>Thứ</th>
								<th>Ngày</th>
								<th>Ca</th>
								<th>Ngày công</th>
								<th>Giờ vào - ra (thực tế)</th>
								<th>Đi trễ</th>
								<th>Về sớm</th>
							</tr>
						</thead>

						<tbody>
							{
								dataDetailUser.map((rowDetail,i) =>{
									console.log(rowDetail)
									totalWorkingSallary += parseFloat(rowDetail.keeping_has_salary != "" ? rowDetail.keeping_has_salary : "0")

										return <tr key={i}>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{rowDetail.dow}</span></td>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{rowDetail.day.trim().length < 10 ? "0" + rowDetail.day : rowDetail.day}</span></td>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{rowDetail.ca}</span></td>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{(rowDetail.keeping_has_salary == "" || rowDetail.keeping_has_salary == "0") ? "" : rowDetail.keeping_has_salary}</span> {rowDetail.outSite ? <BiHome style={{color:"blue",float:"right",marginTop:"8px"}} /> : ""}</td>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{rowDetail.checkin_checkout_real}</span></td>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{(rowDetail.late == "" || rowDetail.late == "0") ? "" : rowDetail.late}</span></td>
														<td><span style={rowDetail.dow == "CN" ? {fontWeight:"800"} : {fontWeight:"350"}}>{(rowDetail.soon == "" || rowDetail.soon == "0") ? "" : rowDetail.soon}</span></td>
													 </tr>
								})
							}
							<tr>
									<td><span></span></td>
									<td><span style={{fontWeight:"800"}}>Tổng ngày công</span></td>
									<td><span style={{fontWeight:"800"}}><NumberFormat value={totalWorkingSallary} decimalScale={2} displayType={'text'} thousandSeparator={true} /></span></td>
									<td><span></span></td>
									<td><span></span></td>
									<td><span></span></td>
							</tr>
						</tbody>
					 </Table>
	}

  return(
    <>
      <Modal size="lg" show={isShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <b>SGB HRM - Chi tiết ngày công tháng {Moment(startDate).format('MM/YYYY')} - {fullname} </b>
        </Modal.Header>
        <Modal.Body>
					{renderTableDetail(dataDetailUser)}
				</Modal.Body>

      </Modal>
    </>
  )
}

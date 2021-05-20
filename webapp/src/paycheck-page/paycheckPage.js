import React,{useState,useRef} from 'react'
import { Container,Row,Col,Table } from 'react-bootstrap'
import './css/paycheckPage.css'
import {
  MdHome,
  MdAccountCircle,
  MdDateRange,
  MdLocalAtm
} from "react-icons/md"
import { BsPeopleFill } from 'react-icons/bs'
import { HiMenu } from 'react-icons/hi'
import { FaNetworkWired } from 'react-icons/fa'
import { BsCalendar } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {useSelector,useDispatch} from 'react-redux'
import {
	onChangeDate
} from '../timekeeping/state/timeKeepingAction'
import {
	GetSalaryByUser
} from '../paycheck/state/paycheckAction'
import {useCookies} from 'react-cookie'
import {COOKIE_TOKEN,COOKIE_USER_NAME} from '../common/Constant'
import {PopupLoadingPaycheck} from '../components/Loading';
import NumberFormat from 'react-number-format';
import Moment from 'moment'

function PaycheckPage(){
  const [cookies, setCookie] = useCookies([COOKIE_TOKEN]);
  const [locale, setLocale] = useState('en');
  const dispatch = useDispatch()
  const startDate = useSelector(state => state.timeKeepingReducer.startDate)
  const isProccess = useSelector(state => state.paycheckReducer.isProccess)
  const dataSalary = useSelector(state => state.paycheckReducer.dataSalary)
  const username = cookies.user_name
  const datePickerRef = useRef(null);

  var otherBonnus = (isNaN(parseFloat(dataSalary?.total_salary?.allowance_onsite)) == true ? 0 : parseFloat(dataSalary?.total_salary?.allowance_onsite ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.allowance_ca3)) == true ? 0 : parseFloat(dataSalary?.total_salary?.allowance_ca3 ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.allowance_responsibility)) == true ? 0 : parseFloat(dataSalary?.total_salary?.allowance_responsibility ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.salary_outtime)) == true ? 0 : parseFloat(dataSalary?.total_salary?.salary_outtime ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.bonus_sale)) == true ? 0 : parseFloat(dataSalary?.total_salary?.bonus_sale ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.bonus_productivity_1)) == true ? 0 : parseFloat(dataSalary?.total_salary?.bonus_productivity_1 ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.bonus_productivity_ot)) == true ? 0 : parseFloat(dataSalary?.total_salary?.bonus_productivity_ot ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.bonus_attendance)) == true ? 0 : parseFloat(dataSalary?.total_salary?.bonus_attendance ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.salary_absence_year)) == true ? 0 : parseFloat(dataSalary?.total_salary?.salary_absence_year ?? 0))
    + (isNaN(parseFloat(dataSalary?.total_salary?.salary_13)) == true ? 0 : parseFloat(dataSalary?.total_salary?.salary_13 ?? 0))

  return(
    <Container fluid>
      <Row>
        <Col xs lg={12}>
          <div className="timekeeping-detail-tool">
            <div className="timekeeping-detail-tool-left">
              <span className="timekeeping-detail-tool-left-text">Tháng</span>
              <div className="timekeeping-detail-tool-left-date">
                <DatePicker ref={datePickerRef} className="timekeeping-detail-tool-left-date-input" maxDate={new Date()} selected={startDate} onChange={date => dispatch(onChangeDate(date))} dateFormat="MM/yyyy" showMonthYearPicker />
                <BsCalendar className="timekeeping-detail-tool-left-date-icon" onClick={()=> datePickerRef.current.setFocus()}/>
              </div>
              <div className="btn btn-info btn-search" onClick={()=> dispatch(GetSalaryByUser(username,startDate,cookies.access_token))}>
                <BsSearch className="btn-search-icon" />
                <span>Tìm</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-2">
         <Col md={12}>
           <div style={{textAlign:"center"}}>
             <h5>PHIẾU LƯƠNG</h5>
             <b>{Moment(startDate).format('MM/YYYY')}</b>
           </div>

         </Col>
      </Row>

      <Row>
        <Col xs lg={{ span: 8, offset: 2}}>
          <Table size="sm" striped bordered hover style={{fontSize:"0.85rem"}}>
            <tbody>
              <tr>
                <td colSpan="3" className="background-primary title-upper "><MdAccountCircle className="icon-medium"/> <span>Thông tin cá nhân</span></td>
                <td colSpan="3" className="background-primary title-upper "><MdDateRange className="icon-medium"/> <span>Thông tin chấm công</span></td>
              </tr>

              <tr>
                <td>1</td>
                <td>Họ và tên</td>
                <td>{dataSalary?.last_name} {dataSalary?.first_name}</td>

                <td>7</td>
                <td>Ngày làm việc thực tế</td>
                <td>{dataSalary?.wokring_time?.real_working_time == "0" ? "" : dataSalary?.wokring_time?.real_working_time}</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Mã nhân viên</td>
                <td>{dataSalary?.user_name}</td>

                <td>8</td>
                <td>Nghỉ lễ</td>
                <td>{dataSalary?.wokring_time?.holiday == "0" ? "" : dataSalary?.wokring_time?.holiday}</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Mã số thuế</td>
                <td>{dataSalary?.tax == "0" ? "" : dataSalary?.tax}</td>

                <td>9</td>
                <td>Nghỉ bù, nghỉ khác</td>
                <td>{dataSalary?.wokring_time?.leave_other == "0" ? "" : dataSalary?.wokring_time?.leave_other}</td>
              </tr>

              <tr>
                <td>4</td>
                <td><b>Mức lương(VND)</b></td>
                <td><b><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.wage?.salary_basic ?? ""} displayType={'text'} thousandSeparator={true} /></b></td>

                <td>10</td>
                <td>Nghỉ phép</td>
                <td>{dataSalary?.wokring_time?.leave_absence == "0" ? "" : dataSalary?.wokring_time?.leave_absence}</td>
              </tr>

              <tr>
                <td>5</td>
                <td>Lương ngày(VND)</td>
                <td><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.wage?.salary_day ?? ""} displayType={'text'} thousandSeparator={true} /></td>

                <td>11</td>
                <td>Số giờ overtime </td>
                <td>{dataSalary?.wokring_time?.over_hour == "0" ? "" : dataSalary?.wokring_time?.over_hour}</td>
              </tr>

              <tr>
                <td>6</td>
                <td><b>Ngày công quy định</b></td>
                <td><b>{dataSalary?.date_specified == "0" ? "" : dataSalary?.date_specified}</b></td>

                <td>12</td>
                <td><b>Số ngày tính lương</b></td>
                <td><b>{dataSalary?.wokring_time?.date_working_has_salary == "0" ? "" : dataSalary?.wokring_time?.date_working_has_salary}</b></td>
              </tr>

              <tr>
                <td colSpan="6" className="background-primary title-upper ">
                  <MdLocalAtm className="icon-medium"/> <span>Thanh toán lương</span>
                </td>
              </tr>

              <tr>
                <td>13</td>
                <td colSpan="2">Lương cơ bản</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.total_salary?.salary_basic ?? ""} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>14</td>
                <td colSpan="2">Phụ cấp cơm,xe,đi lại</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={(isNaN(parseFloat(dataSalary?.total_salary?.allowance)) == true ? "" : parseFloat(dataSalary?.total_salary?.allowance)) + (isNaN(parseFloat(dataSalary?.total_salary?.allowance_go)) == true ? "" : parseFloat(dataSalary?.total_salary?.allowance_go))} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>15</td>
                <td colSpan="2">Phụ cấp trang thiết bị</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.total_salary?.allowance_mobile ?? ""} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>16</td>
                <td colSpan="2">Lương ngoài giờ</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.total_salary?.salary_outtime ?? ""} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>17</td>
                <td colSpan="2">Khoản khác, thưởng </td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={otherBonnus} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>18</td>
                <td colSpan="2"><b>Tổng thu nhập</b></td>
                <td colSpan="3"><b><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.total_salary?.total_salary ?? ""} displayType={'text'} thousandSeparator={true} /></b></td>
              </tr>

              <tr>
                <td>19</td>
                <td colSpan="2">Trừ BHXH, BHYT, BHTN</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={(isNaN(parseFloat(dataSalary?.deductions?.insurance)) == true ? "" : parseFloat(dataSalary?.deductions?.insurance)) + (isNaN(parseFloat(dataSalary?.deductions?.minus_bhxh)) == true ? "" : parseFloat(dataSalary?.deductions?.minus_bhxh))} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>20</td>
                <td colSpan="2">Trừ thuế TNCN</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.deductions?.personal_income ?? ""} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>21</td>
                <td colSpan="2">Trừ KPCĐ</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.deductions?.fee_union_member ?? ""} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>22</td>
                <td colSpan="2">Trừ tạm ứng, khoản khác</td>
                <td colSpan="3"><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={(isNaN(parseFloat(dataSalary?.deductions?.salary_advance)) == true ? "" : parseFloat(dataSalary?.deductions?.salary_advance)) + (isNaN(parseFloat(dataSalary?.deductions?.violations)) == true ? "" : parseFloat(dataSalary?.deductions?.violations)) + (isNaN(parseFloat(dataSalary?.deductions?.minus_other)) == true ? "" : parseFloat(dataSalary?.deductions?.minus_other))} displayType={'text'} thousandSeparator={true} /></td>
              </tr>

              <tr>
                <td>23</td>
                <td colSpan="2"><b>Thực nhận</b></td>
                <td colSpan="3" style={{color:"blue"}}><b><NumberFormat renderText={(formattedValue,customProps)=>formattedValue == "0" ? "" : formattedValue} value={dataSalary?.real_received ?? ""} displayType={'text'} thousandSeparator={true} /></b></td>
              </tr>

            </tbody>
          </Table>



        {/*<Table size="sm" striped bordered hover style={{fontSize:"0.85rem"}}>
          <tbody>
            <tr>
              <td colSpan="3" className="background-primary title-upper ">
                <MdAccountCircle className="icon-medium"/> <span>Thông tin cá nhân</span>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>Họ và tên</td>
              <td><b>{dataSalary?.last_name} {dataSalary?.first_name}</b></td>
            </tr>

            <tr>
              <td>2</td>
              <td>Mã nhân viên</td>
              <td><b>{dataSalary?.user_name}</b></td>
            </tr>

            <tr>
              <td>3</td>
              <td>Mã số thuế</td>
              <td><b>{dataSalary?.tax}</b></td>
            </tr>

            <tr>
              <td>4</td>
              <td><b>Mức lương(VND)</b></td>
              <td><b><NumberFormat value={dataSalary?.wage?.salary_basic} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>5</td>
              <td>Lương ngày(VND)</td>
              <td><NumberFormat value={dataSalary?.wage?.salary_day} displayType={'text'} thousandSeparator={true} /></td>
            </tr>

            <tr>
              <td>6</td>
              <td>Ngày công quy định</td>
              <td>{dataSalary?.date_specified}</td>
            </tr>

            <tr>
              <td colSpan="3" className="background-primary title-upper ">
                <MdDateRange className="icon-medium"/> <span>Thông tin chấm công</span>
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>Ngày làm việc thực tế</td>
              <td>{dataSalary?.wokring_time?.real_working_time}</td>
            </tr>

            <tr>
              <td>8</td>
              <td>Nghỉ lễ</td>
              <td>{dataSalary?.wokring_time?.holiday}</td>
            </tr>

            <tr>
              <td>9</td>
              <td>Nghỉ bù, nghỉ khác</td>
              <td>{dataSalary?.wokring_time?.leave_other}</td>
            </tr>

            <tr>
              <td>10</td>
              <td>Nghỉ phép</td>
              <td>{dataSalary?.wokring_time?.leave_absence}</td>
            </tr>

            <tr>
              <td>11</td>
              <td>Số giờ overtime </td>
              <td>{dataSalary?.wokring_time?.over_hour}</td>
            </tr>

            <tr>
              <td>12</td>
              <td><b>Số ngày tính lương</b></td>
              <td><b>{dataSalary?.wokring_time?.date_working_has_salary}</b></td>
            </tr>

            <tr>
              <td colSpan="3" className="background-primary title-upper ">
                <MdLocalAtm className="icon-medium"/> <span>Thanh toán lương</span>
              </td>
            </tr>

            <tr>
              <td>13</td>
              <td>Lương cơ bản</td>
              <td><b><NumberFormat value={dataSalary?.total_salary?.salary_basic} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>14</td>
              <td>Phụ cấp cơm,xe,đi lại</td>
              <td><b><NumberFormat value={(isNaN(parseFloat(dataSalary?.total_salary?.allowance)) == true ? 0 : parseFloat(dataSalary?.total_salary?.allowance)) + (isNaN(parseFloat(dataSalary?.total_salary?.allowance_go)) == true ? 0 : parseFloat(dataSalary?.total_salary?.allowance_go))} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>15</td>
              <td>Phụ cấp trang thiết bị</td>
              <td><b><NumberFormat value={dataSalary?.total_salary?.allowance_mobile} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>16</td>
              <td>Lương ngoài giờ</td>
              <td><b><NumberFormat value={dataSalary?.total_salary?.salary_outtime} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>17</td>
              <td>Khoản khác, thưởng </td>
              <td><b><NumberFormat value={otherBonnus} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>18</td>
              <td><b>Tổng thu nhập</b></td>
              <td><b><NumberFormat value={dataSalary?.total_salary?.total_salary} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>19</td>
              <td>Trừ BHXH, BHYT, BHTN</td>
              <td><b><NumberFormat value={(isNaN(parseFloat(dataSalary?.deductions?.insurance)) == true ? 0 : parseFloat(dataSalary?.deductions?.insurance)) + (isNaN(parseFloat(dataSalary?.deductions?.minus_bhxh)) == true ? 0 : parseFloat(dataSalary?.deductions?.minus_bhxh))} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>20</td>
              <td>Trừ thuế TNCN</td>
              <td><b><NumberFormat value={dataSalary?.deductions?.personal_income} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>21</td>
              <td>Trừ KPCĐ</td>
              <td><b><NumberFormat value={dataSalary?.deductions?.fee_union_member} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>22</td>
              <td>Trừ tạm ứng, khoản khác</td>
              <td><b><NumberFormat value={(isNaN(parseFloat(dataSalary?.deductions?.salary_advance)) == true ? 0 : parseFloat(dataSalary?.deductions?.salary_advance)) + (isNaN(parseFloat(dataSalary?.deductions?.violations)) == true ? 0 : parseFloat(dataSalary?.deductions?.violations)) + (isNaN(parseFloat(dataSalary?.deductions?.minus_other)) == true ? 0 : parseFloat(dataSalary?.deductions?.minus_other))} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

            <tr>
              <td>23</td>
              <td><b>Thực nhận</b></td>
              <td style={{color:"blue"}}><b><NumberFormat value={dataSalary?.real_received} displayType={'text'} thousandSeparator={true} /></b></td>
            </tr>

          </tbody>
        </Table> */}

        </Col>

      </Row>

      <PopupLoadingPaycheck isShow={isProccess} />
    </Container>
  )
}

export default PaycheckPage

import React,{Component} from 'react'
import {getDataWorkShift} from '../workshift/state/selector'
import {withCookies,Cookies,useCookies} from 'react-cookie'
import { withRouter } from "react-router"
import { connect } from 'react-redux'
import DatePicker from "react-datepicker"
import { BsCalendar } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import {
	getDataWorkShiftFromServer
} from '../workshift/state/workshiftAction'
import $ from 'jquery'

class WorkShiftPage extends Component{
  constructor(props){
    super(props)

    this.refDatePicker = React.createRef()
  }

  _search = () => {
    this.props.getDataWorkShiftFromServer('01/04/2021',this.props.cookies)
  }

  render(){

    const _renderDatatable = () =>{

      if(this.props.dataWorkShift.header){
        return <thead>
          <tr>
          {this.props.dataWorkShift.header.map((dataHeader)=>{
             return <th key={dataHeader.title} colSpan={dataHeader.data.length}>{dataHeader.title}</th>
          })}
          </tr>

          <tr>
          {
            this.props.dataWorkShift.header.map((dataHeader)=>{
              return dataHeader.data.map((dataHeader2)=>{
                return <th>{dataHeader2}</th>
              })
            })
          }
          </tr>
        </thead>
      }

      if(this.props.dataWorkShift.body){
        return <tbody>
                <tr>

                </tr>
              </tbody>
      }


    }

    return(
      <>
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

        <table id="table-workshift" className="table table-striped table-bordered dt-responsive" cellSpacing="0" width="100%">
          {_renderDatatable()}
        </table>

      </>
    )
  }
}

const mapStateToProps = (state,ownProps) => ({
  dataWorkShift: getDataWorkShift(state)

})

const mapDispatchToProps = dispatch =>({
	getDataWorkShiftFromServer:(month,cookies) => dispatch(getDataWorkShiftFromServer(month,cookies))
})

export default
withRouter(withCookies(connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkShiftPage)))

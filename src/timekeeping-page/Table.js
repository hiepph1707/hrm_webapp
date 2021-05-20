import 'datatables.net-dt/css/jquery.dataTables.css'
import React, {Component} from 'react'

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import './css/Timekeeping.css'
import {columns_Timekeeping,columns_timekeeping_expanded} from './Data';
import { useCookies,withCookies } from 'react-cookie'
import {ROLE_HRM_ADMIN} from '../common/Constant'


const customStyles = {
    headRow: {
        style: {
            border: '1px solid rgba(0,0,0,.12)',
            backgroundColor: '#EAECEE',
        }
    },
    headCells: {
        style: {
            fontSize: '0.9rem',
            fontWeight: '600',
            paddingLeft: '6px',
            paddingRight: '6px',
            minWidth: '150px',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            borderLeftColor: 'rgba(0,0,0,.12)',
            color: '#424949',
        },
    },
    rows: {
        style: {
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            borderLeftColor: 'rgba(0,0,0,.12)',
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            borderRightColor: 'rgba(0,0,0,.12)',
        }
    },
    cells: {
        style: {
            paddingLeft: '6px', // override the cell padding for data cells
            paddingRight: '6px',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            borderLeftColor: 'rgba(0,0,0,.12)',

        },
    },
};

class Table extends Component{
  constructor(props){
    super(props)

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data != this.props.data;
  }

  render(){
    const ExpandableComponent = ({data}) => {

      return <DataTable
          title=""
          columns={columns_timekeeping_expanded}
          data={data.list_users}
          noTableHead={true}
          expandableRows={true}
          keyField={"user"}
          expandableIcon={{
          collapsed: <div></div>,
          expanded: <div></div>
          }}
          expandableRowDisabled={row => row.department}
          striped
          responsive={false}
          customStyles={customStyles}
          expandableRowsComponent={<div></div>}
      />
    }

    const isExpanded = this.props.cookies.cookies.user_role == ROLE_HRM_ADMIN

    const _expandedDefaultData = (row) => {

      return !isExpanded

    }

    return (
            <DataTable
                title=""
                columns={columns_Timekeeping}
                data={this.props.data}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
                keyField={"phong_ban"}
                expandableRows={true}
                paginationPerPage={30}
                fixedHeader={true}
                subHeaderWrap={true}
                noDataComponent={"Không tìm thấy dữ liệu"}
                expandableRowExpanded={row => _expandedDefaultData(row)}
                expandableRowsComponent={<ExpandableComponent /> }
            />
    );
  }
}

export default withCookies(Table)

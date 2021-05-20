// const DOMAIN = "http://10.1.21.199:8080/hrm"
// const DOMAIN = "http://10.1.1.50:8080/hrm"
const DOMAIN = "https://api-hrm.saigonbpo.vn/hrm"

export const URL_LOGIN = `${DOMAIN}/auth/signin`
export const URL_GET_KEEPING_TIME_BY_MONTH = `${DOMAIN}/keepingtime/getKeepingTimeByMonth`
export const URL_GET_KEEPING_TIME_BY_MANAGER = `${DOMAIN}/keepingtime/getKeepingTimeByManager`
export const URL_GET_DETAIL_KEEPING_TIME_BY_MONTH = `${DOMAIN}/keepingtime/getDetailKeepingTime`
export const URL_GET_OVERTIME_BY_MONTH = `${DOMAIN}/keepingtime/getDetailOTByMonth`
export const URL_GET_DETAIL_TAKE_LEAVE = `${DOMAIN}/keepingtime/getDetailTakeLeaveByMonth`
export const URL_GET_DETAIL_BHXH_OTHER = `${DOMAIN}/keepingtime/getDetailTakeLeaveByType`
export const URL_GET_SALARY = `${DOMAIN}/keepingtime/getSalaryByUser`
export const URL_SAVE_SETTING = `${DOMAIN}/setting/saveSetting`
export const URL_IMPORT_SALARY = `${DOMAIN}/import/importSalary`
export const URL_IMPORT_KEEPING_TIME = `${DOMAIN}/import/timekeeping`

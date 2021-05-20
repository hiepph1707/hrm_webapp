import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Modal,Button} from 'react-bootstrap'
import {
	showLoading
} from '../timekeeping/state/timeKeepingAction'
import {
	showError
} from '../setting/state/settingAction'

import {
	showError as showErrorTimeKeeping
} from '../timekeeping/state/timeKeepingAction'

export const Loading = (props) => {
  if(props.isShow){
    return(
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }else{
    return ""
  }
}

export const LoadingWithMessage = (props) => {
	const [isShow,setShow] = useState()
	useEffect(()=>{
		setShow(props.isShow)
	})
  const dispatch = useDispatch()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(false)
    return(
      <>
        <Modal show={isShow} onHide={handleClose} animation={false}>
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <span style={{marginLeft:"16px"}}>Đang import dữ liệu...</span>


          </div>

					<div className="d-flex justify-content-center mt-4">
						<span style={{padding:"8px"}}>Lưu ý : quá trình import có thể mất khoảng 1 -> 5 phút tuỳ thuộc vào độ lớn của dữ liệu. Vui lòng không tắt trình duyệt trong quá trình import dữ liệu </span>
					</div>

					<p></p>
        </Modal>
      </>
    )
}

export const PopupLoading = (props) => {
  const isShow = useSelector(state => state.timeKeepingReducer.isProccess)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(showLoading(false))
  const handleShow = () => dispatch(showLoading(false))
    return(
      <>
        <Modal show={isShow} onHide={handleClose} animation={false}>
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <span style={{marginLeft:"16px"}}>Đang tải dữ liệu...</span>
          </div>
          <p></p>
        </Modal>
      </>
    )
}

export const PopupLoadingPaycheck = (props) => {
  const isShow = useSelector(state => state.paycheckReducer.isProccess)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(showLoading(false))
  const handleShow = () => dispatch(showLoading(false))
    return(
      <>
        <Modal show={isShow} onHide={handleClose} animation={false}>
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <span style={{marginLeft:"16px"}}>Đang tải dữ liệu...</span>
          </div>
          <p></p>
        </Modal>
      </>
    )
}

export const PopupError = () => {
	const isShow = useSelector(state => state.timeKeepingReducer.isShowError)
	const messages = useSelector(state => state.timeKeepingReducer.messages)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(showErrorTimeKeeping(""))

    return(
      <>
        <Modal show={isShow} onHide={handleClose} animation={false}>
          <div className="d-flex justify-content-center mt-4">
            <span style={{marginLeft:"16px"}}>{messages}</span>
          </div>
          <p></p>
        </Modal>
      </>
    )
}

export const PopupErrorWithMesssageSettingPage = (props) => {
	const isShow = useSelector(state => state.settingReducer.isShowError)
	const dispatch = useDispatch()
	const handleClose = () => dispatch(showError(false,""))

  return(
    <>
      <Modal show={isShow} onHide={handleClose} animation={false}>
        <div className="d-flex justify-content-center mt-4">
          <span style={{marginLeft:"16px"}}>{props.messages}</span>
        </div>
        <p></p>
      </Modal>
    </>
  )
}

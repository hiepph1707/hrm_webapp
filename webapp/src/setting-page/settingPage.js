import {useState,useEffect, useRef} from 'react'
import { Row,Col,Form,Button } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {useCookies} from 'react-cookie'
import {COOKIE_TOKEN,COOKIE_USER_NAME,TYPE_KEEPING_TIME,TYPE_SALARY} from '../common/Constant'
import {
	SaveSetting,
	showError
} from '../setting/state/settingAction';
import {Loading,PopupErrorWithMesssageSettingPage,LoadingWithMessage} from '../components/Loading'
import bsCustomFileInput from 'bs-custom-file-input'

function SettingPage(){

  const dispatch = useDispatch()
  const [typeFile,setTypeFile] = useState("timekeeping")
  const [passwordFile,setPasswordFile] = useState("")
	const [fileSelected,setFileSelected] = useState("")
	const [isShowPassword,setShowPassword] = useState(false)
  const [cookies, setCookie] = useCookies([COOKIE_TOKEN])
	const isProccess = useSelector(state => state.settingReducer.isShow)
	const isSuccess = useSelector(state => state.settingReducer.isSuccess)
	const isShowError = useSelector(state => state.settingReducer.isShowError)
	const error = useSelector(state => state.settingReducer.error)
	var form = useRef("")


	useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const _submitSetting = (e) => {
    e.preventDefault()
		const formData = new FormData()
		formData.append("file",fileSelected)
		formData.append("password",passwordFile)
		formData.append("fileType",typeFile)
		formData.append("userImport",cookies.user_name)
		console.log(fileSelected.name)
		if(fileSelected){
			if(fileSelected.name.toLowerCase().replaceAll(" ","").includes(typeFile)){
				dispatch(SaveSetting(formData,cookies.access_token,typeFile))
			}else{
				dispatch(showError(true,`File import không phải là file ${typeFile}` ))
			}

		}else{
			dispatch(showError(true,"Vui lòng chọn file cần import"))
		}

  }

  const _onChangeTypeFile = (e) =>{
    setTypeFile(e.target.value)
		setPasswordFile("")
  }

  const _onChangePassword = (e) =>{
    setPasswordFile(e.target.value)
  }

	const _onChangeFile = (e) =>{

		if(e.target.files[0] && e.target.files[0].name){
			let extendsFile = e.target.files[0].name.split('.').pop()

			if(extendsFile.toLowerCase().trim().includes("xls") || extendsFile.toLowerCase().trim().includes("xlsx") || extendsFile.toLowerCase().trim().includes("xlsm") ){
				setFileSelected(e.target.files[0])
			}else{
				dispatch(showError(true,"File không được hỗ trợ. Vui lòng chọn đúng định dạng file excel"))
				setFileSelected(null)
				form.reset()
			}
		}
	}

  return(
    <>
      <Row className="mt-2">
        <Col lg={12}>
          <h5>Import dữ liệu chấm công</h5>
        </Col>

        <Col lg={4}>
          <Form ref={(e)=> form = e} encType="multipart/form-data" onSubmit={_submitSetting}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Loại file</Form.Label>
              <Form.Control as="select" onChange={(e)=> _onChangeTypeFile(e)}>
                <option value={TYPE_KEEPING_TIME}>Time keeping</option>
                <option value={TYPE_SALARY}>Salary</option>
              </Form.Control>
            </Form.Group>

						<Form.Group>
							<Form.Label>Chọn file</Form.Label>
							<Form.File
			          type="file"
			          id="file-upload"
			          label=""
								data-browse="Chọn file"
			          custom
								onChange={(e)=>_onChangeFile(e)}
			        />
					  </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type={isShowPassword ? 'text' : 'password'} onChange={(e)=> _onChangePassword(e) } value={passwordFile} />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Hiển thị mật khẩu" onClick={(e)=> setShowPassword(!isShowPassword) } />
            </Form.Group>


            <Button variant="info" type="submit" >
              Lưu
            </Button>
          </Form>
        </Col>
      </Row>
			<LoadingWithMessage isShow={isProccess}/>
			<PopupErrorWithMesssageSettingPage isShow={isShowError} messages={error} />
    </>
  )
}

export default SettingPage

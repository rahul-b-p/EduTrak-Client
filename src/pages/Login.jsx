import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginTeacherApi, studentLoginApi } from '../services/allApi';
import { authContext } from '../context/DataShare';

function Login({ teacher }) {

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    register: "",
  })

  const navigate = useNavigate()

  const {setAuth} = useContext(authContext)

  const location = useLocation()
  const select = location.state
  // console.log(select);

  const teacherLogin = async () => {
    const { email, password } = loginDetails
    if (!password || !email) {
      toast.info('Please Fill The form Completly')
    }
    else {
      const result = await loginTeacherApi(loginDetails)
      if (result.status == 200) {
        toast.success('Login Successfull')
        // console.log(result.data);
        sessionStorage.setItem('useData', JSON.stringify(result.data.existingTeacher))
        sessionStorage.setItem('token', result.data.token)
        setAuth(true)
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)

      }
      else {
        toast.error(result.response.data)
      }
    }
  }

  const studentLogin = async () => {
    const { register, password } = loginDetails
    if (!register || !password) {
      toast.info('please fill the fields completely')
    }
    else {
      const result = await studentLoginApi(loginDetails)
      if (result.status == 200) {
        sessionStorage.setItem('studentData', JSON.stringify(result.data.existingStudent))
        sessionStorage.setItem('token', result.data.token)
        setAuth(true)
        toast.success('Login Successfull !')
        setTimeout(() => {
          navigate('/student')
        }, 3000)
      }
      else if (result.response.status == 406) {
        toast.warning(result.response.data)
      }
      else {
        toast.error('Something went wrong')
      }
    }

  }

  return (
    <>
      <Container fluid className='d-flex justify-content-center bg-login'>
        <Row className='w-100'>
          <Col md={3} sm={2} xs={1} ></Col>
          <Col md={6} sm={8} xs={10} >
            {teacher ? <h1 className='mt-5 text-center fw-bold'> Login for Teacher </h1> :
              <h1 className='mt-5 text-center fw-bold'> Login for   Student </h1>}
            <div className="rounded  p-5 bg-loginbox my-5">
              <form>
                {teacher ? <div>
                  <label htmlFor="mail" className='text-light' >Email</label>
                  <input value={loginDetails.email} onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} id='mail' placeholder='Enter your mail id' type="email" className='form-control rounded-0' />
                </div> :
                  <div >
                    <label htmlFor="reg" className='text-light' >Register No</label>
                    <input value={loginDetails.register} onChange={(e) => setLoginDetails({ ...loginDetails, register: e.target.value })} id='reg' placeholder='Enter your Reg No' className='form-control rounded-0 no-spinners' />
                  </div>}
                <div className="mt-4">
                  <label htmlFor="pswd" className='text-light'>Password</label>
                  <input value={loginDetails.password} onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} id='pswd' placeholder='Enter your password' type="password" className='form-control rounded-0' />
                </div>
                <div className="mt-4 d-flex justify-content-center ">
                  {teacher ?
                    <Button onClick={teacherLogin} className='px-5' variant='dark'> login </Button>
                    :
                    <Button onClick={studentLogin} className='px-5' variant='dark'> login </Button>
                  }
                </div>
              </form>
              {teacher && <p className='text-light text-center mt-3'>If you are not a user? <Link to={'/register'}>Register Now</Link></p>}
            </div>
          </Col>
          <Col md={3} sm={2} xs={1} ></Col>
        </Row>
      </Container>
      <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  )
}

export default Login
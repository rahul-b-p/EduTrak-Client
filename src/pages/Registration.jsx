import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { generateOtpApi, regTeacherApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Registration() {
  const [teacher, setTeacher] = useState({
    username: "",
    institution: "",
    email: "",
    password: "",
    userOtp: ""
  })

  const navigate = useNavigate()

  const genrateOtp = async () => {
    const {username,institution,email,password} =teacher
    // console.log(username,institution,email,password);
    if(!username || !institution || !email || !password){
      toast.info('Please Fill the form Completely')
    }
    else{
      const loadingToastId = toast('Generating OTP...', { autoClose: false, closeButton: false})
      const result = await generateOtpApi(teacher)
      toast.dismiss(loadingToastId);
      if (result.status == 200) {
        toast.success('Your OTP has been sent.')
      }
      else {
        toast.error('Something went wrong please try after sometimes!')
      }
    }
  }
  // console.log(teacher);

  const Cancel = () => {
    setTeacher({
      username: "",
      institution: "",
      email: "",
      password: "",
      userOtp: ""
    })
  }

  const handleRegister=async()=>{
    const {username,institution,email,password,userOtp} =teacher
    if(!username || !institution || !email || !password || !userOtp){
      toast.info('Please Fill the fields completly')
    }
    else{
      const result = await regTeacherApi(teacher)
      console.log(result);
      if(result.status==200){
        toast.success('Registered Successfully')
        Cancel()
        navigate('/loginteacher')
      }
      else if(result.response.status==406){
        toast.error(result.response.data)
      }
      else{
        toast.error('Something Wewnt wrong, Please Try after Sometimes')
      }
    }
  }

  return (
    <>
      <div className='w-100 d-flex justify-content-center bg-login pt-4'><Link to={'/'}><Button variant='success'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back to Home</Button></Link></div>
      <Container fluid className='d-flex justify-content-center bg-login'>
        <Row className='w-100'>
          <Col md={3} sm={2} xs={1} ></Col>
          <Col md={6} sm={8} xs={10} >
            <h1 className='mt-5 text-center fw-bold'> Teacher Registration </h1>
            <div className="rounded  p-5 bg-loginbox my-5">
              <form>
                <div className="">
                  <label htmlFor="usnm" className='text-light' >Username</label>
                  <input value={teacher.username} onChange={(e) => setTeacher({ ...teacher, username: e.target.value })} id='usnm' placeholder='Enter a Usename' type="email" className='form-control rounded-0' />
                </div>
                <div className="mt-4">
                  <label htmlFor="inst" className='text-light' >Institution Name</label>
                  <input value={teacher.institution} onChange={(e) => setTeacher({ ...teacher, institution: e.target.value })} id='inst' placeholder='Enter your Institution name' type="email" className='form-control rounded-0' />
                </div>
                <div className="mt-4">
                  <label htmlFor="mail" className='text-light' >Email</label>
                  <input value={teacher.email} onChange={(e) => setTeacher({ ...teacher, email: e.target.value })} id='mail' placeholder='Enter your mail id' type="email" className='form-control rounded-0' />
                </div>
                <div className="mt-4">
                  <label htmlFor="pswd" className='text-light'>Password</label>
                  <input value={teacher.password} onChange={(e) => setTeacher({ ...teacher, password: e.target.value })} id='pswd' placeholder='Enter a password' type="password" className='form-control rounded-0' />
                </div>
                <div className="mt-4 d-flex justify-content-center ">
                  <Button onClick={genrateOtp} className='px-5' variant='dark'> Generate OTP </Button>
                </div>
                <div className="mt-4">
                  <label htmlFor="otp" className='text-light' >OTP</label>
                  <input value={teacher.userOtp} onChange={(e) => setTeacher({ ...teacher, userOtp: e.target.value })} id='otp' placeholder='Enter your OTP' type="number" className='form-control rounded-0 no-spinners' />
                </div>
                <div className="mt-4 d-flex justify-content-center ">
                  <Button className='me-2' variant='dark' onClick={handleRegister}> Register </Button>
                  <Button variant='danger' className='ms-2' onClick={Cancel}>Cancel</Button>
                </div>
              </form>
              <p className='text-light text-center mt-3'>If you are Already a user? <Link to={'/loginteacher'}>Login Now</Link></p>
            </div>
          </Col>
          <Col md={3} sm={2} xs={1} ></Col>
        </Row>
      </Container>
      <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  )
}

export default Registration
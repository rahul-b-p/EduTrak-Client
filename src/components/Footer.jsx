import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import logo from '../assets/edutrak.png'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { subscribeApi } from '../services/allApi'

function Footer({ landing }) {
  const [subscriber, setSubscriber] = useState({
    name: "",
    phone: "",
    email: ""
  })

  const subscribe = async () => {
    const result = await subscribeApi(subscriber)
    // console.log(result);
    
    if (result.status == 200) {
      toast.success('Subscribed successfully, Check your email')
      setSubscriber({
        name: "",
        phone: "",
        email: ""
      })
    }
    else {
      toast.error('something went wrong')
    }
  }
  return (
    <>
      <Container fluid className='footer d-flex justify-content-center'>
        <Row className='w-100'>
          <Col md={6} xs={12} className='p-5' >
            <img src={logo} alt="" className='w-100' />
          </Col>
          {landing && <Col id='subscribe' md={6} xs={12} className='p-5' >
            <h2 className='text-light text-center fw-bold'>Subscribe Now</h2>
            <form className='mt-4'>
              <div className="d-flex p-md-2">
                <input value={subscriber.name} onChange={(e) => setSubscriber({ ...subscriber, name: e.target.value })} type="text" className="form-control me-2" placeholder='name' />
                <input value={subscriber.phone} onChange={(e) => setSubscriber({ ...subscriber, phone: e.target.value })} type="number" className="form-control no-spinners" placeholder='phone' />
              </div>
              <div className="d-flex p-md-2 mt-md-0 mt-4">
                <input value={subscriber.email} onChange={(e) => setSubscriber({ ...subscriber, email: e.target.value })} type="email" className="form-control me-2" placeholder='Email id' />
                <Button onClick={subscribe} variant='dark' className='px-2'>Subscribe</Button>
              </div>
            </form>
          </Col>}
          {landing && <Col md={3} xs={0} ></Col>}
          <Col md={6} xs={12} className='p-5' >
            <h2 className='text-center text-light fw-bold ms-md-5'>Follow us</h2>
            <div className='d-flex justify-content-evenly text-light mt-4 ms-md-5'>
              <FontAwesomeIcon icon={faFacebookF} size='2xl' className='hover' />
              <FontAwesomeIcon icon={faInstagram} size='2xl' className='hover' />
              <FontAwesomeIcon icon={faXTwitter} size='2xl' className='hover' />
              <FontAwesomeIcon icon={faLinkedinIn} size='2xl' className='hover' />
            </div>
          </Col>
          {landing && <Col md={3} xs={0} ></Col>}
          <p style={{ fontSize: '11px' }} className='text-center text-light'>©Edu Trak Web Application, All Rights Reserved ® Developed by Rahul B P</p>
        </Row>
      </Container>
      <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  )
}

export default Footer 
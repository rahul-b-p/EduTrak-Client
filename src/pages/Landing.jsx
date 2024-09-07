import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import Header from '../components/Header'
import './landing.css'
import LogoImg from '../assets/edutrak.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons/faArrowRightLong'
import AOS from 'aos';
import 'aos/dist/aos.css';
import StudentImg from '../assets/students.png'
import TeacherImg from '../assets/teacher.png'
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


function Landing() {
  const [btnBeat, setbtnBeat] = useState(false)
  const [select, setSelect] = useState("")

  const navigate =useNavigate()

  const handleGetStart = () => {
    select == 'teacher' ? navigate('/loginteacher',{state:select}):navigate('/loginstudent',{state:select})
  }

  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      <Container fluid id='home'>
        <Row>
          <Col className='landleft d-flex align-items-center justify-content-center flex-column' md={6} xs={12}>
            <img src={LogoImg} alt="no image" width={'100%'} />
          </Col>
          <Col className='landright d-flex align-items-center justify-content-center flex-column' md={6} xs={12}>
            <h1 className='fw-bold'>GET STARTED AS</h1>
            <div className="d-md-flex mt-3">
              <Form>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Student"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      className='custom-radio'
                      value={'student'}
                      onChange={(e) => setSelect(e.target.value)}
                    />
                    <Form.Check
                      inline
                      label="Teacher"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      className='custom-radio'
                      value={'teacher'}
                      onChange={(e) => setSelect(e.target.value)}
                    />
                  </div>
                ))}
              </Form>
            </div>
            <Button onClick={handleGetStart} onMouseEnter={() => setbtnBeat(true)} onMouseLeave={() => setbtnBeat(false)} className='rounded-0' variant='outline-dark'>Now <FontAwesomeIcon className={`ms-2 mt-1 ${btnBeat && 'beat'}`} icon={faArrowRightLong} size='lg' /> </Button>
          </Col>
        </Row>
      </Container>

      <Header landing />

      <Container id='about' fluid className='p-5'>
        <h1 className='ms-md-5 fw-bold'>About</h1>

        <p className='mt-md-5 mt-4 ms-md-5'>Edu Trak is a comprehensive web application designed to streamline the management of internal marks and attendance for students. This innovative platform empowers teachers with the tools to efficiently add, edit, and update academic records, ensuring accurate and up-to-date information is maintained. Students benefit from a transparent and clear view of their academic progress, presented through intuitive graphical representations. This visual approach aids in better understanding and self-assessment, fostering a more engaged learning experience.
          <br />
          <br />
          Edu Trak incorporates a robust authentication system that differentiates between teacher and student logins. Teachers have full access to modify and manage the data, while students are restricted to viewing their individual progress reports. This secure setup not only safeguards sensitive information but also promotes accountability and transparency in academic record-keeping. By enhancing communication and providing a clear overview of academic performance, Edu Trak facilitates a more effective educational environment, benefiting both teachers and students.</p>
      </Container>

      <Container id='features' fluid className='p-5'>
        <h1 className='text-light mb-2'>Features</h1>
        <Row>
          <Col md={6} xs={12} className='d-flex align-items-center justify-content-center flex-column mt-4' >
            <img data-aos="fade-right" data-aos-duration="3000" src={TeacherImg} alt="no image" width={'200px'} />
            <h4 className='text-light'>Teacher</h4>
            <ul className='text-light'>
              <li>Manage Class</li>
              <li>Manage Students</li>
              <li>Manage Marks</li>
              <li>Manage Attendance</li>
            </ul>
          </Col>
          <Col md={6} xs={12} className='d-flex align-items-center justify-content-center flex-column'>
            <img data-aos="fade-left" data-aos-duration="3000" src={StudentImg} alt="no image" width={'350px'} className='mb-3' />
            <h4 className='text-light'>Student</h4>
            <ul className='text-light'>
              <li>View Marks</li>
              <li>View Attendance</li>
              <li>Review</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container id='vlogs' fluid className='p-md-5'>
        <h1>Vlogs</h1>
        <Row>
          <Col md={3} className='p-3' >
            <iframe className='rounded' data-aos="fade-up" data-aos-duration="3000" width="100%" height='450px' src="https://www.youtube.com/embed/ZE6oRbGCVi8" title="School Exam Time ||  Funny video #viral #shorts #school#friends" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Col>
          <Col md={3} className='p-3'>
            <iframe className='rounded' data-aos="fade-up" data-aos-duration="3000" width="100%" height='450px' src="https://www.youtube.com/embed/DUePPBzKWlQ" title="Do This Before Your Next Exam" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Col>
          <Col md={3} className='p-3'>
            <iframe className='rounded' data-aos="fade-up" data-aos-duration="3000" width="100%" height='450px' src="https://www.youtube.com/embed/6cMAEeP7QdQ" title="10 secret tricks of a topper in exams (99.9% toppers) #viral #study" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Col>
          <Col md={3} className='p-3'>
            <iframe className='rounded' data-aos="fade-up" data-aos-duration="3000" width="100%" height='450px' src="https://www.youtube.com/embed/eSZKkj2__lo" title="How to Prepare for an Exam" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Col>
        </Row>
      </Container>

      <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  )
}

export default Landing
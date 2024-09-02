import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Student() {
  return (
    <>
      <Header />
      <Container fluid className='bg-student py-5 d-flex align-items-center justify-content-center flex-column'>
        <Row className='w-100'>
          <Col md={3} sm={5} xs={12}>
            <div className='dash-box p-2 rounded stud-hover'>
              <div className='p-2 rounded bg-student'>
                <h5>S8 CSE</h5>
                <h5>Artificial Intelligence</h5>
              </div>
              <Link style={{ textDecoration: 'none' }} to={'/student-class'} ><h6 className='text-light text-center fw-bold mt-2'>View Your Class</h6></Link>
            </div>
          </Col>
          <Col md={6} sm={2} xs={0}></Col>
          <Col md={3} sm={5} xs={12} >
            <div className='dash-box p-2 stud-hover rounded mt-4 mt-sm-0'>
              <div className='p-2 bg-student rounded'>
                <h5>Anandh</h5>
                <h5>S8CSE1</h5>
              </div>
              <Link style={{ textDecoration: 'none' }}  ><h6 className='text-light text-center fw-bold mt-2'>Edit your Passkey</h6></Link>
            </div>
          </Col>
        </Row>

        <Row className='w-100 mt-5'>
          <Col md={6} className='p-4'>
            <div className="w-100 bg-dark pt-4 pb-3 stud-hover">
              <h6 className='text-light text-center'>Marks Obtained: </h6>
              <h6 className='text-light text-center'>Min Marks Required: </h6>
              <h6 className='text-success text-center'>Eligible</h6>
            </div>
          </Col>
          <Col md={6} className='p-4'>
          <div className="w-100 bg-dark pt-4 pb-3 stud-hover mt-4 mt-md-0">
              <h6 className='text-light text-center'>Attendance Obtained: </h6>
              <h6 className='text-light text-center'>Min Attendance Required: </h6>
              <h6 className='text-success text-center'>Eligible</h6>
            </div>
          </Col> 
        </Row>
      </Container>
    </>
  )
}

export default Student
import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import AddClass from '../components/AddClass'
import ClassList from '../components/ClassList'
import { useLocation } from 'react-router-dom'


function Dashboard() {

  return (
    <>
      <Header />

      <Container fluid className='bg-dashbord pt-5 d-flex justify-content-center align-items-center flex-column'>
        <Row className='mt-3 mb-5 w-100'>
          <Col md={3} xs={12}>
            <div className="dash-box w-100 pt-2 " style={{ height: '50px' }} >
              <h5 className=' text-light text-center fw-bold mt-1'>Dahboard</h5>
            </div>
          </Col>
          <Col md={6} xs={0}></Col>
          <Col md={3} xs={12} className='mt-5 mt-md-0'>
            <Profile />
          </Col>
        </Row>

        <Row className='my-4 w-100 '>
          <Col md={1}></Col>
          <Col md={10}>
            <AddClass />
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row className='w-100 my-4'>
          <Col md={1}></Col>
          <Col md={10}>
            <ClassList />
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>

    </>
  )
}

export default Dashboard
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getClassForStudentApi } from '../services/allApi'
import MarksChart from '../components/MarksChart'
import AttendanceChart from '../components/AttendanceChart'

function Student() {
  const [classData, setClassData] = useState([])

  const navigate = useNavigate()

  const studentData = JSON.parse(sessionStorage.getItem('studentData'))
  const getClass = async (classId) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${token}`
      }
      const result = await getClassForStudentApi(classId, reqHeader)
      // console.log(result);
      setClassData(result.data)

    }
  }

  const obtainedMark = studentData?.marks.total
  const obtainedAttendance = studentData?.attendance.percentage
  const eligiblity = classData?.eligiblity

  const chartMark = { marks: obtainedMark, cutoff: eligiblity?.mark }

  const chartAttendance = { attendance: obtainedAttendance, cutoff: eligiblity?.attendance }





  const toMyClass = () => {
    navigate('/student-class', { state: classData })
  }





  useEffect(() => {
    if (sessionStorage.getItem('studentData')) {
      getClass(studentData.classId)
    }
  }, [])
  return (
    <>
      <Header />
      <Container fluid className='bg-student py-5 d-flex align-items-center justify-content-center flex-column'>
        <Row className='w-100'>
          <Col md={3} sm={5} xs={12}>
            <div className='dash-box p-2 stud-hover rounded mt-4 mt-sm-0'>
              <div className='p-2 bg-student rounded'>
                <h5>{studentData.name}</h5>
                <h5>{studentData.register}</h5>
              </div>
            </div>
          </Col>
          <Col md={6} sm={2} xs={0}></Col>
          <Col md={3} sm={5} xs={12} >
            <div className='dash-box p-2 rounded stud-hover'>
              <div className='p-2 rounded bg-student'>
                <h5>{classData.batch}</h5>
                <h5>{classData.subject}</h5>
              </div>
              <h3 onClick={toMyClass}  ><h6 className='text-light text-center fw-bold mt-2'>View Your Class</h6></h3>
            </div>
          </Col>
        </Row>

        <Row className='w-100 mt-5'>
          <Col md={6} className='p-4'>
            <div className="w-100 bg-dark pt-4 pb-3 stud-hover">
              <div className='p-3'>
                <MarksChart chartMark={chartMark} />
              </div>
              <h6 className='text-light text-center'>Marks Obtained: {obtainedMark} </h6>
              <h6 className='text-light text-center'>Min Marks Required: {eligiblity?.mark} </h6>
              {
                obtainedMark >= eligiblity?.mark ?
                  <h6 className='text-success text-center'>Eligible</h6>
                  :
                  <h6 className='text-danger text-center'>Not eligible</h6>
              }
            </div>
          </Col>
          <Col md={6} className='p-4'>
            <div className="w-100 bg-dark pt-4 pb-3 stud-hover mt-4 mt-md-0">
              <div className="p-3">
                <AttendanceChart chartAttendance={chartAttendance} />
              </div>
              <h6 className='text-light text-center'>Attendance Obtained: {obtainedAttendance} </h6>
              <h6 className='text-light text-center'>Min Attendance Required: {eligiblity?.attendance} </h6>
              {
                obtainedAttendance >= eligiblity?.attendance ?
                  <h6 className='text-success text-center'>Eligible</h6>
                  :
                  <h6 className='text-danger text-center'>Not eligible</h6>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Student
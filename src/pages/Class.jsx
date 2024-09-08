import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons'
import AddStudent from '../components/AddStudent'
import { Link, useLocation } from 'react-router-dom'
import EditStudent from '../components/EditStudent'
import { getAllStudentsApi } from '../services/allApi'
import { useContext } from 'react'
import { addStudentResponseContext, deleteStudentResponseContext, editStudentResponseContext } from '../context/StudentDataShare'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import DeleteStudent from '../components/DeleteStudent'

function Class({ teacher }) {
  const [allStudents, setAllStudents] = useState([])
  

  const { addStudentResponse, setAddStudentResponse } = useContext(addStudentResponseContext)
  const { editStudentResponse, setEditStudentResponse } = useContext(editStudentResponseContext)
  const {deleteStudentResponse,setDeleteStudentResponse} = useContext(deleteStudentResponseContext)

  const location = useLocation()
  const classData = location.state

  const getStudents = async () => {
    const token = sessionStorage.getItem("token")
    const classId = classData._id
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${token}`,
        "classId": classId
      }
      const result = await getAllStudentsApi(reqHeader)
      setAllStudents(result.data)
    }
  }

  

  const generatePdf = () => {
    const pdf = new jsPDF()

    const body = []

    allStudents.forEach((item) => {
      body.push([item.register, item.name, item.attendance.percentage, item.marks.total, `Attendance : ${item?.attendance.percentage >= classData.eligiblity.attendance ? 'eligible' : 'not eligible'}    Marks : ${item?.marks.total >= classData.eligiblity.mark ? 'eligible' : 'not eligible'}`])
    })

    let head = [['Register No', "Name", 'Attendance', 'mark', 'eligibility']]

    autoTable(pdf, { head, body })
    pdf.setFontSize(16)
    pdf.text('Progress Report', 10, 10)
    pdf.save(`report-for-${classData.batch}-${classData.subject}`)

    const pdfOutput = pdf.output('blob');
    const pdfURL = URL.createObjectURL(pdfOutput);

    // Open in a new window/tab
    window.open(pdfURL, '_blank');
  }

  const generateStudentLoginData = () => {
    const pdf = new jsPDF()

    const body = []

    allStudents.forEach((item) => {
      body.push([item.register, item.name, item.passkey])
    })

    let head = [['Register No', "Name", 'passkey']]

    autoTable(pdf, { head, body })
    pdf.setFontSize(16)
    pdf.text('Progress Report', 10, 10)
    pdf.save(`report-for-${classData.batch}-${classData.subject}`)

    const pdfOutput = pdf.output('blob');
    const pdfURL = URL.createObjectURL(pdfOutput);

    // Open in a new window/tab
    window.open(pdfURL, '_blank');
  }



  useEffect(() => {
    getStudents()
    setAllStudents(allStudents.sort((a, b) => a.register.localeCompare(b.register)))
    setAddStudentResponse(false)
    setEditStudentResponse(false)
    setDeleteStudentResponse(false)
  }, [addStudentResponse, editStudentResponse, deleteStudentResponse])
  return (
    <>
      <Header />
      <Container fluid className='bg-dashboard d-flex justify-content-center flex-column align-items-center'>

        <Row className='w-100 py-5'>
          <Col md={1}></Col>
          {sessionStorage.getItem('token') ?
            <Col md={10}>
              <div className="d-flex justify-content-center mb-2">
                <Link to={teacher ? '/dashboard' : '/student'}><Button variant='success'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back to Dahboard</Button></Link>
              </div>
              <div className=" w-100 border border-2 border-dark flex-column rounded-0 p-3 d-flex justify-content-center align-items-center">
                <h2>{classData.batch}</h2>
                <h2>{classData.subject}</h2>
              </div>
            </Col>
            :
            <Col md={10} className='d-flex align-items-center justify-content-center'>
              <img src="https://cdn-icons-gif.flaticon.com/6569/6569164.gif" alt="no img" />
              <Link to={'/loginteacher'} className='btn btn-success'> Please Login to Edit your class</Link>
            </Col>
          }
          <Col md={1}></Col>
        </Row>

        <Row className='w-100 py-5'>
          <Col md={1}></Col>
          <Col md={10}>
            <Row className='w-100 dash-box py-2' style={{ marginLeft: '1px' }}>
              <Col md={teacher ? 10 : 12}><h3 className='text-center fw-bold text-light'>Students</h3></Col>
              {teacher && <Col md={2}> <AddStudent classData={classData} /></Col>}
            </Row>
            {allStudents.length > 0 ?
              <Table className='w-100' responsive bordered hover>
                <thead >
                  <tr>
                    <th rowSpan={2} className='text-center align-middle bg-light'>Reg No</th>
                    <th rowSpan={2} className='text-center align-middle bg-light'>Name</th>
                    <th rowSpan={2} className='text-center align-middle bg-light'>Attendance</th>
                    <th className='text-center bg-light' colspan="3">Marks</th>
                    <th rowSpan={2} className='text-center align-middle bg-light'>Eligibility</th>
                    {teacher && <th rowSpan={2} className='text-center align-middle bg-light'>Action</th>}
                  </tr>
                  <tr>
                    <th className='text-center bg-light'>T1</th>
                    <th className='text-center bg-light'>T2</th>
                    <th className='text-center bg-light'>Total</th>
                  </tr>
                </thead>
                <tbody >
                  {allStudents?.map((item) => (
                    <tr >
                      <td className='text-center align-middle'>{item?.register}</td>
                      <td className='text-center align-middle'>{item?.name}</td>
                      <td className='text-center align-middle'>{item?.attendance.percentage}</td>
                      <td className='text-center align-middle'>{item?.marks.term1}</td>
                      <td className='text-center align-middle'>{item?.marks.term2}</td>
                      <td className='text-center align-middle'>{item?.marks.total}</td>
                      {item?.marks.total && item?.attendance.percentage ? <td className='text-center align-middle'>
                        <b>Attendance</b> : {item?.attendance.percentage >= classData.eligiblity.attendance ? 'eligible' : 'not eligible'}
                        <br />
                        <b>Marks</b> : {item?.marks.total >= classData.eligiblity.mark ? 'eligible' : 'not eligible'}
                      </td>
                        :
                        <td></td>
                      }
                      {teacher && <td>
                        <div className='w-100 d-flex justify-content-evenly'>
                          <EditStudent student={item} />
                          <DeleteStudent student={item} />
                        </div>
                      </td>}
                    </tr>
                  ))}
                </tbody>
              </Table>
              :
              <h3 className="text-center mt-4 text-danger">No students added yet</h3>
            }

            {teacher && allStudents.length > 0 && <div className='d-flex justify-content-center mt-4'>
              <Button variant='primary' onClick={generatePdf}>Download Progress Report<FontAwesomeIcon icon={faDownload} className='ms-2' /></Button>
              <Button variant='success' className='ms-4' onClick={generateStudentLoginData}>Download Student Login Data<FontAwesomeIcon icon={faDownload} className='ms-2' /></Button>
            </div>}

          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>

      <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  )
}

export default Class
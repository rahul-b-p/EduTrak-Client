import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addAttendanceApi, addMarksApi, editStudentApi } from '../services/allApi';
import { editStudentResponseContext } from '../context/StudentDataShare';

function EditStudent({ student }) {
    const [show, setShow] = useState(false);
    const [studentData, setStudentData] = useState({
        register: student.register,
        name: student.name,
        marks: {
            term1: student.marks.term1,
            term2: student.marks.term2
        },
        total: student.attendance.total,
        present: student.attendance.present
    })

    const { setEditStudentResponse } = useContext(editStudentResponseContext)

    const handleClose = () => {
        setStudentData({
            register: student.register,
            name: student.name,
            marks: {
                term1: student.marks.term1,
                term2: student.marks.term2
            },
            total: student.attendance.total,
            present: student.attendance.present
        })
        setShow(false)
    }
    const handleShow = () => setShow(true);


    const editStudentDetails = async () => {
        const { name, register } = studentData
        if (!name || !register) {
            toast.info('Please Fill the fields')
        }
        else {
            if (sessionStorage.getItem('token')) {
                const id = student._id
                const reqBody = { name, register }
                const result = await editStudentApi(id, reqBody)
                if (result.status == 200) {
                    toast.success('Edited Successfully')
                    setEditStudentResponse(true)
                }
                else {
                    toast.error('Something went wrong')
                }
            }
            else {
                toast.warning('Please Login')
            }
        }
    }

    const addMarks = async (term) => {
        const { term1, term2 } = studentData.marks
        const id = student._id

        if (sessionStorage.getItem('token')) {
            if (term == 't1') {
                if (!term1) {
                    toast.info('Please enter your mark before adding')
                }
                else {
                    const reqBody = { term1, term }
                    const result = await addMarksApi(id, reqBody)
                    console.log(result);

                    if (result.status == 200) {
                        toast.success('Term 1 Mark updated')
                        setEditStudentResponse(true)
                    }
                    else {
                        toast.error('Something went wrong')
                    }
                }
            }
            else if (term == 't2') {
                if (!term2) {
                    toast.info('Please enter your mark before adding')
                }
                else {
                    const reqBody = { term2, term }
                    const result = await addMarksApi(id, reqBody)
                    if (result.status == 200) {
                        toast.success('Term 2 Mark updated')
                        setEditStudentResponse(true)
                    }
                    else {
                        toast.error('Something went wrong')
                    }
                }
            }
        }
        else {
            toast.warning('Please login')
        }

    }

    const addAttendance = async () => {
        const { total, present } = studentData
        const id = student._id
        if (sessionStorage.getItem('token')) {
            if (!total || !present) {
                toast.info('Please fill the fields completly')
            }
            else {
                const reqBody = { total, present }
                const result = await addAttendanceApi(id, reqBody)
                if (result.status == 200) {
                    toast.success('Attendance Updated Successfully')
                    setEditStudentResponse(true)
                }
                else {
                    toast.error('Something went wrong')
                }
            }
        }
        else {
            toast.warning('Please Login')
        }
    }




    return (
        <>
            <Button onClick={handleShow} variant='primary' ><FontAwesomeIcon icon={faEdit} size='xl' /></Button>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} className='d-flex align-items-center justify-content-center flex-column'>
                            <h2 className='text-center'>Add Marks <FontAwesomeIcon icon={faEdit} /></h2>
                            <form>
                                <div className="d-flex mt-4">
                                    <TextField inputProps={{ min: 0, max: 100 }} onChange={(e) => setStudentData({ ...studentData, marks: { term1: e.target.value } })} value={studentData.marks.term1} id="mark-t1" label="Term 1" variant="outlined" type='number' />
                                    <Button onClick={() => addMarks('t1')} className='ms-2' variant='success' >Add</Button>
                                </div>
                                <div className="d-flex mt-3 mb-4">
                                    <TextField inputProps={{ min: 0, max: 100 }} onChange={(e) => setStudentData({ ...studentData, marks: { term2: e.target.value } })} value={studentData.marks.term2} id="mark-t2" label="Term 2" variant="outlined" type='number' />
                                    <Button onClick={() => addMarks('t2')} className='ms-2' variant='success' >Add</Button>
                                </div>
                            </form>
                        </Col>
                        <Col md={6} className='d-flex align-items-center justify-content-center flex-column'>
                            <h2 className='text-center'>Add Attendance <FontAwesomeIcon icon={faEdit} /> </h2>
                            <form>
                                <div className="d-flex mt-4">
                                    <TextField onChange={(e) => setStudentData({ ...studentData, total: e.target.value })} value={studentData.total} id="total" label="Total Days" variant="outlined" type='number' inputProps={{ min: 0, max: 100 }} />
                                    <TextField onChange={(e) => setStudentData({ ...studentData, present: e.target.value })} value={studentData.present} id="present" label="Present Days" variant="outlined" type='number' inputProps={{ min: 0, max: 100 }} />
                                </div>
                                <div className='d-flex justify-content-center mt-3'><Button className='ms-2' variant='success' onClick={addAttendance} >Add</Button></div>
                            </form>
                        </Col>
                        <hr />
                        <Col md={1}></Col>
                        <Col md={10} className='px-5'>
                            <h2 className='text-center'>Edit Details <FontAwesomeIcon icon={faEdit} /></h2>

                            <form>
                                <div className="mt-4 w-100 px-3">
                                    <TextField value={studentData.register} onChange={(e) => setStudentData({ ...studentData, register: e.target.value })} id="reg" className='w-100' label="Register No" variant="outlined" />
                                </div>
                                <div className="mt-3 w-100 px-3">
                                    <TextField value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} id="name" className='w-100' label="Name" variant="outlined" />
                                </div>
                                <div className="d-flex mt-4 justify-content-center">
                                    <Button variant="danger" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button className='ms-2' variant="dark" onClick={editStudentDetails}>
                                        Edit Now
                                    </Button>
                                </div>
                            </form>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default EditStudent
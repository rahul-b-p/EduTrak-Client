import { faFileExport, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Button, Modal } from 'react-bootstrap'
import EditClass from './EditClass'
import { deleteClassApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { deleteClassResponseContext } from '../context/DataShare'
import { useNavigate } from 'react-router-dom'

function ClassItem({ classData }) {
    const [token, setToken] = useState("")
    const [show, setShow] = useState(false);

    const { setDeleteClassResponse } = useContext(deleteClassResponseContext)

    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteClass = async () => {
        const id = classData._id
        const reqHeader = {
            "Content-Type": "application/json",
            "Authentication": `Bearer ${token}`
        }
        console.log(id);

        const result = await deleteClassApi(id, reqHeader)
        console.log(result);
        if (result.status == 200) {
            toast.success('Class deleted Succesfully')
            setDeleteClassResponse(true)
        }
        else if (result.response.status == 406) {
            toast.error(result.response.data)
        }
        else {
            toast.error('something went wrong')
        }
    }

    const openClass = async () => {
        navigate('/class', { state: classData })
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])
    return (
        <>
            <Row className='w-100 p-3 rounded' style={{ backgroundColor: 'white' }}>
                <Col xs={8} md={8} className=' p-2' >
                    <p><b>Batch: </b>{classData.batch}</p>
                    <p><b>Subject: </b>{classData.subject}</p>
                    {/* <p><b>Total No of Students: </b>49</p> */}
                </Col>
                <Col xs={4} className="d-flex justify-content-center align-items-center">
                    <Row className='w-100'>
                        <Col md={4} xs={12} >
                            <Button onClick={openClass} className='p-2' variant='success'><FontAwesomeIcon icon={faFileExport} size='2xl' /></Button>
                        </Col>
                        <Col md={4} xs={12} className='mt-3 mt-md-0'>
                            <EditClass classData={classData} />
                        </Col>
                        <Col md={4} xs={12} className='mt-3 mt-md-0'>
                            <Button onClick={handleShow} className='p-2' variant='danger'><FontAwesomeIcon icon={faTrashCan} size='2xl' /></Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Delete your class</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteClass}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default ClassItem
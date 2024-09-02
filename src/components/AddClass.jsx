import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './addclass.css'
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addClassApi } from '../services/allApi';
import { addClassResponseContext } from '../context/DataShare';


function AddClass() {
    const [show, setShow] = useState(false);
    const [classData, setClassData] = useState({
        batch: "",
        subject: "",
        eligibleMark: null,
        eligibleAttendance: null
    })
    const [token, setToken] = useState("")

    const {setAddClassResponse} = useContext(addClassResponseContext)

    const userData = JSON.parse(sessionStorage.getItem("useData"))

    const handleClose = () => {
        handleCancel()
        setShow(false)
    }
    const handleShow = () => setShow(true);
    const handleCancel = () => {
        setClassData({
            batch: "",
            subject: "",
            eligibleMark: null,
            eligibleAttendance: null
        })
    }

    const addClass = async () => {
        const { batch, subject, eligibleMark, eligibleAttendance } = classData

        if (!batch || !subject || !eligibleAttendance || !eligibleMark) {
            toast.info('Please fill the feilds ')
        }
        else {
            if(token){
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authentication": `Bearer ${token}`
                }
                const result = await addClassApi(classData,reqHeader)
                // console.log(result);
                if(result.status==200){
                    toast.success('Class Added Succesfully')
                    setAddClassResponse(true)
                    handleClose()
                }
                else if(result.response.status==406){
                    toast.error(result.response.data)
                }
                else{
                    toast.error('something went wrong')
                }
            }
            else{
                toast.warning('You need to login for add classes')
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    return (
        <>
            <button className="btn btn-hover w-100 border border-2 border-dark rounded-0 p-3 d-flex justify-content-center" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} className='me-4 border border-1 border-dark p-1 bg-dark text-light mt-1 ' size='xl' />
                <h3 className='text-center fw-bold'>Add New Class </h3>
            </button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton >
                    <Modal.Title>Add a new Class</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form action="">
                        <div className='w-100 px-4'>
                            <TextField value={classData.batch} onChange={(e) => setClassData({ ...classData, batch: e.target.value })} className='w-100' id="batch" label="Batch" variant="outlined" />
                        </div>
                        <div className='mt-3 w-100 px-4'>
                            <TextField value={classData.subject} onChange={(e) => setClassData({ ...classData, subject: e.target.value })} className='w-100' id="subject" label="Subject" variant="outlined" />
                        </div>
                        <div className='mt-3 w-100 px-4'>
                            <TextField value={classData.eligibleMark !== null ? classData.eligibleMark : ''} onChange={(e) => setClassData({ ...classData, eligibleMark: e.target.value })} className='w-100' id="min-mark" type='number' label="Marks for Eligibility" variant="outlined" />
                        </div>
                        <div className='mt-3 w-100 px-4'>
                            <TextField value={classData.eligibleAttendance !== null ? classData.eligibleAttendance : ''} onChange={(e) => setClassData({ ...classData, eligibleAttendance: e.target.value })} className='w-100' id="min-attendence" label="Attendance for Eligibility" variant="outlined" type='number' />
                        </div>
                    </form>
                    <div className='d-flex justify-content-center mt-4'>
                        <Button onClick={handleCancel} variant='danger'>Cancel</Button>
                        <Button onClick={addClass} variant='dark' className='ms-3'>Add Class</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default AddClass
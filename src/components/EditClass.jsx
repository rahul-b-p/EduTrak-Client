import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { editClassApi } from '../services/allApi';
import { editClassResponseContext } from '../context/DataShare';


function EditClass({ classData }) {
    const [show, setShow] = useState(false);
    const [classContent, setClassContent] = useState({
        batch: classData.batch,
        subject: classData.subject,
        eligibleMark: classData.eligiblity.mark,
        eligibleAttendance: classData.eligiblity.attendance
    })
    const [token, setToken] = useState("")

    const {setEditClassResponse} = useContext(editClassResponseContext)

    const classId=classData._id
    // console.log(classId);
    

    const handleClose = () => {
        setShow(false);
        handleCancel()
    }
    const handleShow = () => setShow(true);
    const handleCancel = () => {
        setClassContent({
            batch: classData.batch,
            subject: classData.subject,
            eligibleMark: classData.eligiblity.mark,
            eligibleAttendance: classData.eligiblity.attendance
        })
    }

    const editClass =async()=>{
        const {batch,subject,eligibleMark,eligibleAttendance} = classContent
        if(!batch || !subject || !eligibleMark || !eligibleAttendance){
            toast.info('Please fill the fields completely')
        }
        else{
            if(token){
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authentication": `Bearer ${token}`
                }
                const result = await editClassApi(classContent,reqHeader,classId)
                // console.log(result);
                if(result.status==200){
                    toast.success('Class edited Succesfully')
                    setEditClassResponse(true)
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
                toast.warning('Cant edit without login')
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
            <Button onClick={handleShow} className='p-2 '><FontAwesomeIcon icon={faEdit} size='2xl' /></Button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton >
                    <Modal.Title>Edit Class</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form action="">
                        <div className='w-100'>
                            <TextField value={classContent.batch} onChange={(e) => setClassContent({ ...classContent, batch: e.target.value })} className='w-100' id="batch" label="Batch" variant="outlined" />
                        </div>
                        <div className='mt-3 w-100'>
                            <TextField value={classContent.subject} onChange={(e) => setClassContent({ ...classContent, subject: e.target.value })} className='w-100' id="subject" label="Subject" variant="outlined" />
                        </div>
                        <div className='mt-3 w-100'>
                            <TextField value={classContent.eligibleMark} onChange={(e) => setClassContent({ ...classContent, eligibleMark: e.target.value })} className='w-100' id="min-mark" label="Marks for Eligibility" variant="outlined" />
                        </div>
                        <div className='mt-3 w-100'>
                            <TextField value={classContent.eligibleAttendance} onChange={(e) => setClassContent({ ...classContent, eligibleAttendance: e.target.value })} className='w-100' id="min-attendance" label="Attendance for Eligibility" variant="outlined" />
                        </div>
                    </form>
                    <div className='d-flex justify-content-center mt-4'>
                        <Button onClick={handleCancel} variant='danger'>Cancel</Button>
                        <Button onClick={editClass} variant='dark' className='ms-3'>Edit Now</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default EditClass
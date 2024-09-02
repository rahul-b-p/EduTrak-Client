import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addStudentApi } from '../services/allApi';
import { addStudentResponseContext } from '../context/StudentDataShare';



function AddStudent({classData}) {
    const [show, setShow] = useState(false);
    const [studentData,setStudentData] = useState({
        userId:classData.userId,
        classId:classData._id,
        passkey:classData.batch.replaceAll(' ','')+classData.subject.replaceAll(' ',''),
        register:"",
        name:""
    })
    const [token, setToken] = useState("")

    const {setAddStudentResponse} = useContext(addStudentResponseContext)

    
    const handleClose = () => {
        setShow(false);
        handleCancel()
    }
    const handleShow = () => setShow(true);
    const handleCancel =()=>{
        setStudentData({
        ...studentData,
        register:"",
        name:""
        })
    }

    const addStudent=async()=>{
        const {register,name} = studentData
        if(!register || !name){
            toast.info('Please fill in the fields completely')
        }
        else{
            if(token){
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authentication": `Bearer ${token}`
                }
                const result = await addStudentApi(studentData,reqHeader)
                if(result.status==200){
                    toast.success('Class added Succesfully')
                    setAddStudentResponse(true)
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
                toast.warning('Please login to add a student')
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
            <Button onClick={handleShow} variant='dark'>Add Student<FontAwesomeIcon icon={faPlus} className='ms-2' /></Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mt-1 w-100">
                            <TextField value={studentData.register} onChange={(e)=>setStudentData({...studentData, register:e.target.value})} className='w-100' id="reg" label="Register No" variant="outlined" />
                        </div>
                        <div className="mt-3 w-100">
                            <TextField  value={studentData.name} onChange={(e)=>setStudentData({...studentData, name:e.target.value})} className='w-100' id="name" label="Name" variant="outlined" />
                        </div>
                        <div className="d-flex mt-4 justify-content-center">
                            <Button variant="danger" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button className='ms-2' variant="dark" onClick={addStudent}>
                                Add Now
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default AddStudent
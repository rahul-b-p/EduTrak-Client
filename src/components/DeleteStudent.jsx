import React, { useContext, useState } from 'react'
import { deleteStudentApi } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteStudentResponseContext } from '../context/StudentDataShare';


function DeleteStudent({student}) {

    const [show, setShow] = useState(false);

    const {setDeleteStudentResponse} = useContext(deleteStudentResponseContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const result = await deleteStudentApi(id)
            console.log(result);
            if (result.status == 200) {
                toast.success('student deleted Succesfully')
                setDeleteStudentResponse(true)
            }
            else {
                toast.error('something went wrong')
            }
        }
        else {
            toast.warning('Please Login to delete')
        }

    }
    return (
        <>
            <Button onClick={handleShow} className='ms-3 ms-md-0' variant='danger' ><FontAwesomeIcon icon={faTrashCan} size='xl' /></Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Delete {student.name} from your class</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(student?._id)}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default DeleteStudent
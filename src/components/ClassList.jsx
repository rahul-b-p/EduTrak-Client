import React, { useContext, useEffect, useState } from 'react'
import ClassItem from './ClassItem'
import { getClassApi } from '../services/allApi'
import { addClassResponseContext, classCountContext, deleteClassResponseContext, editClassResponseContext } from '../context/DataShare'

function ClassList() {
    const [allClass, setALLClass] = useState([])

    const {addClassResponse,setAddClassResponse} = useContext(addClassResponseContext)
    const {editClassResponse,setEditClassResponse} = useContext(editClassResponseContext)
    const { deleteClassResponse, setDeleteClassResponse } = useContext(deleteClassResponseContext)
    const {setClassCount} =useContext(classCountContext)

    const getClass = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authentication": `Bearer ${token}`
        }
        const result = await getClassApi(reqHeader)
        setALLClass(result.data)
        setClassCount(result.data.length)
    }


    useEffect(() => {
        getClass()
        setAddClassResponse(false)
        setEditClassResponse(false)
        setDeleteClassResponse(false)
    }, [addClassResponse,editClassResponse,deleteClassResponse])
    return (
        <>
            <div className=" w-100 border border-2 border-dark flex-column rounded-0 p-3 d-flex justify-content-center">
                <h3 className='text-center fw-bold'> Your Classes </h3>
                <hr className='mb-5' />

                {allClass?.length > 0 ?
                    allClass?.map((item) => (
                        <div className="w-100 px-4  py-3">
                            <ClassItem classData={item} />
                        </div>
                    ))
                    :
                    <p className='my-3 text-danger text-center'>No classes are added yet</p>
                }
            </div>
        </>
    )
}

export default ClassList
import React, { createContext, useState } from 'react'

export const addStudentResponseContext = createContext({})
export const editStudentResponseContext = createContext({})
export const deleteStudentResponseContext = createContext({})

function StudentDataShare({ children }) {
    const [addStudentResponse, setAddStudentResponse] = useState(false)
    const [editStudentResponse, setEditStudentResponse] = useState(false)
    const [deleteStudentResponse, setDeleteStudentResponse] = useState(false)
    return (
        <deleteStudentResponseContext.Provider value={{ deleteStudentResponse, setDeleteStudentResponse }}>
            <editStudentResponseContext.Provider value={{ editStudentResponse, setEditStudentResponse }}>
                <addStudentResponseContext.Provider value={{ addStudentResponse, setAddStudentResponse }}>
                    {children}
                </addStudentResponseContext.Provider>
            </editStudentResponseContext.Provider>
        </deleteStudentResponseContext.Provider>
    )
}

export default StudentDataShare
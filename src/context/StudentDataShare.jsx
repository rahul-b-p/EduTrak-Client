import React, { createContext, useState } from 'react'

export const addStudentResponseContext = createContext({})
export const editStudentResponseContext = createContext({})

function StudentDataShare({ children }) {
    const [addStudentResponse, setAddStudentResponse] = useState(false)
    const [editStudentResponse, setEditStudentResponse] =useState(false)
    return (
        <editStudentResponseContext.Provider value={{editStudentResponse, setEditStudentResponse}}>
            <addStudentResponseContext.Provider value={{ addStudentResponse, setAddStudentResponse }}>
                {children}
            </addStudentResponseContext.Provider>
        </editStudentResponseContext.Provider>
    )
}

export default StudentDataShare
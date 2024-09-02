import React, { createContext, useState } from 'react'

export const addClassResponseContext = createContext({})
export const editClassResponseContext = createContext({})
export const deleteClassResponseContext = createContext({})
export const classCountContext = createContext({})

function DataShare({ children }) {
    const [addClassResponse, setAddClassResponse] = useState(false)
    const [editClassResponse, setEditClassResponse] = useState(false)
    const [deleteClassResponse, setDeleteClassResponse] = useState(false)
    const [classCount, setClassCount] = useState(0)
   
    return (
            <classCountContext.Provider value={{ classCount, setClassCount }}>
                <deleteClassResponseContext.Provider value={{ deleteClassResponse, setDeleteClassResponse }}>
                    <editClassResponseContext.Provider value={{ editClassResponse, setEditClassResponse }}>
                        <addClassResponseContext.Provider value={{ addClassResponse, setAddClassResponse }}>
                            {children}
                        </addClassResponseContext.Provider>
                    </editClassResponseContext.Provider>
                </deleteClassResponseContext.Provider>
            </classCountContext.Provider>
    )
}

export default DataShare
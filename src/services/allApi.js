import { Await } from "react-router-dom"
import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


// teacher-Authentication
export const generateOtpApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/send-otp`, reqBody, "")
}
export const regTeacherApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/teacherreg`, reqBody, "")
}
export const loginTeacherApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/tchrlogin`, reqBody, "")
}

// class
export const addClassApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-class`, reqBody, reqHeader)
}
export const getClassApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/get-class`, "", reqHeader)
}
export const editClassApi = async (reqBody, reqHeader, id) => {
    return await commonApi('PUT', `${serverUrl}/edit-class/${id}`, reqBody, reqHeader)
}
export const deleteClassApi = async (id, reqHeader) => {
    return await commonApi('DELETE', `${serverUrl}/delete-class/${id}`, {}, reqHeader)
}

// student
export const addStudentApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-student`, reqBody, reqHeader)
}
export const getAllStudentsApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/get-student`, "",reqHeader)
}
export const deleteStudentApi = async (id) =>{
    return await commonApi('DELETE', `${serverUrl}/delete-student/${id}`,{},"")
}
export const editStudentApi= async (id,reqBody) =>{
    return await commonApi('PUT',`${serverUrl}/edit-student/${id}`,reqBody,"")
}
export const addMarksApi= async(id,reqBody) =>{
    return await commonApi('PUT',`${serverUrl}/add-mark/${id}`,reqBody,"")
}
export const addAttendanceApi=async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/add-attendance/${id}`,reqBody,"")
}

// student Module
export const studentLoginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/student-login`,reqBody,"")
}
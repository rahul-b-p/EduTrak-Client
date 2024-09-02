import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { classCountContext } from '../context/DataShare'


function Profile() {
    const [open, setOpen] = useState(false)

    const {classCount} = useContext(classCountContext)

    const userData = JSON.parse(sessionStorage.getItem("useData"))
    // console.log(userData);

    return (
        <>
            <div className="dash-box w-100 ms-auto  ">
                <div className='d-flex justify-content-center p-1'>
                    <h5 className='mt-2 text-light  fw-bold' >{userData ? userData.username : <Link to={'/loginteacher'}>Please Login</Link>}</h5>
                    {userData && <button onClick={() => setOpen(!open)} className='ms-3 bg-transparent border-0 text-light'>
                        {!open ? <FontAwesomeIcon icon={faChevronDown} />
                            : <FontAwesomeIcon icon={faChevronUp} />}
                    </button>}
                </div>
                <Collapse in={open}>
                    <div className='pb-2'>
                        <hr style={{ color: 'white' }} />
                        <p className="mt-4 text-light text-center">{userData ? userData.institution : 'No Institution data'}</p>
                        <p className="mt-4 text-light text-center ">Total No of Classes : {classCount}</p>
                    </div>
                </Collapse>
            </div>


        </>
    )
}

export default Profile
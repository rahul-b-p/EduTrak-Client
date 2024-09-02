import React from 'react'
import { Button } from 'react-bootstrap'
import Error from '../assets/pagenotfound.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function PageNotAvailable() {
  return (
    <div style={{backgroundColor:'rgb(234,233,232)'}} className='p-3 w-100 d-flex flex-column align-items-center justify-content-center'>     
        <img src={Error} alt="404 Error" width={'600px'} />
        <Link to={'/'}><Button variant='success'><FontAwesomeIcon icon={faArrowLeft} className='me-2'/>Back to Home</Button></Link>
    </div>
  )
}

export default PageNotAvailable
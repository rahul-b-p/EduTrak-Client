import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import { Link, useNavigate } from 'react-router-dom';
import LogoIMg from '../assets/edutrak.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../context/DataShare';

function Header({ landing }) {
    useEffect(() => {
        AOS.init();
    }, [])

    const {setAuth} = useContext(authContext)

    const navigate = useNavigate()

    const logout=()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('useData')
        sessionStorage.removeItem('studentData')
        setAuth(false)
        navigate('/')
        toast.info('You are now logged out')
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-vlt shadow w-100" sticky='top'>
                <Container fluid>
                    <Navbar.Brand>
                        <Link to={'/'}>
                            <div data-aos="fade-down"
                                data-aos-offset="300"
                                data-aos-easing="ease-in-sine">
                                <img src={LogoIMg} alt="no logo" height={'50px'} />
                            </div>

                        </Link>
                    </Navbar.Brand>
                    {landing ?
                        <>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">

                                <Nav className='ms-auto'>
                                    <Nav.Link href='#home' className='hover ms-3 ms-md-0 mt-3  fw-bold text-light'>Home</Nav.Link>
                                    <Nav.Link href='#about' className='hover ms-3 fw-bold text-light mt-md-3'>About</Nav.Link>
                                    <Nav.Link href='#features' className='hover ms-3 fw-bold text-light mt-md-3'>Features</Nav.Link>
                                    <Nav.Link href='#vlogs' className='hover ms-3 fw-bold text-light mt-md-3'>Vlogs</Nav.Link>
                                    <Nav.Link href='#subscribe' className='hover ms-3 me-5 fw-bold text-light mt-md-3'>Subscribe</Nav.Link>
                                </Nav>


                            </Navbar.Collapse>
                        </>
                        : <Nav className='ms-auto'>
                            <Button onClick={logout} variant='outline-light' className=' me-4'>Logout</Button>

                        </Nav>
                    }
                </Container>
            </Navbar>
            <ToastContainer theme='colored' autoClose={3000} position='top-center' />
        </>
    )
}

export default Header
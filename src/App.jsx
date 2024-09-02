import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Class from './pages/Class'
import Student from './pages/Student'
import PageNotAvailable from './pages/PageNotAvailable'
import Footer from './components/Footer'


function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/loginteacher' element={<Login teacher />} />
        <Route path='/loginstudent' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/class' element={<Class teacher />} />
        <Route path='/student-class' element={<Class />} />
        <Route path='/student' element={<Student />} />
        <Route path='*' element={<PageNotAvailable />} />
      </Routes>
      <ConditionalCommonComponent />
    </>
  )
}

function ConditionalCommonComponent() {
  const location = useLocation();

  // Conditionally set the prop based on the current path
  const shouldSendProp = location.pathname === '/';
  const propValue = shouldSendProp ? 'special value' : null;

  return <Footer landing={propValue} />;
}

export default App

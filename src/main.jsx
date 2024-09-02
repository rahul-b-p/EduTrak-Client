import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import DataShare from './context/DataShare.jsx'
import StudentDataShare from './context/StudentDataShare.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>

      <StudentDataShare><DataShare><App /></DataShare></StudentDataShare>

    </BrowserRouter>

  </React.StrictMode>,
)

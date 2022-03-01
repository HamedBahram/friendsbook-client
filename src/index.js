import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import SessionProvider from './context/SessionContext'

import App from './components/App'
import './index.css'

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <SessionProvider>
                <App />
            </SessionProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import TodoApp from './TodoApp.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
)
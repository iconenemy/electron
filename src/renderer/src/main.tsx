import './assets/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Main } from '@renderer/pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)

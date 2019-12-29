import React from 'react'
import { HashRouter } from 'react-router-dom'

import Routes from './Routes'
import './style/App.scss'
import MainHeader from './containers/MainHeader'

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header" />
        <MainHeader />

        <div>
          <Routes />
        </div>
      </div>
    </HashRouter>
  )
}

export default App

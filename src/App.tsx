import React from "react"
import { BrowserRouter } from "react-router-dom"

import Routes from "./Routes"
import "./style/App.scss"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Haddock Head Studios</h1>
      </header>
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App

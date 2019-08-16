import React from "react"
import { BrowserRouter } from "react-router-dom"

import Routes from "./Routes"
import "./style/App.scss"

function App() {
  return (
    <div className="App">
      <header className="App-header" />
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App

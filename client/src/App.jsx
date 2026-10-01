import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={ <MainPage /> } />
      </Routes>
    </>
  )
}

export default App

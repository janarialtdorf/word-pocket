import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/admin/words" element={ <ManageWords /> } />
        <Route path="/admin/words/:wordId" element={ <EditWords /> } />
      </Routes>
    </>
  )
}

export default App

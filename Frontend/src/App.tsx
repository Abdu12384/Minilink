import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { UserRoute } from './routes/UserRoute'
import { Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter> 
      <Toaster
        position='bottom-right' reverseOrder={false} toastOptions={{duration:4000, style:{  background: '#333',color: '#fff',borderRadius: '8px'}}}/>
      <Routes>
         <Route path="/*" element={<UserRoute/>}/>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App

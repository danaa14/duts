import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import './App.css'
import {Route, Routes} from 'react-router-dom'


function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/service' element={<ServicePage />} />
    </Routes>
  )
}

export default App;

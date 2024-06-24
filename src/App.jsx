import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import View from './components/View'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <>
    <Router>
      <Navbar/> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/view' element={<View/>}/>
        </Routes>     
    </Router>
    </>
  )
}

export default App

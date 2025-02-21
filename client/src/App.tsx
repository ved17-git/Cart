import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./Utils/ProtectedRoutes"
import AuthRoutes from "./Utils/AuthRoutes"
import Home from './Components/Home'
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import Navbar from "./Components/Navbar"
import Profile from "./Components/Profile"
import Scan from "./Components/Scan"
import UserContext from "./Context/UserContext"
import PaymentGateway from "./Components/PaymentGateway"




function App() {

  return (
    <>
  
  <UserContext> 
    <BrowserRouter>
      <Navbar/>
        <Routes>

          <Route path="/" element= {<Home/>} />
           
      <Route element={<AuthRoutes/>}>  
          <Route path="/signUp" element= {<SignUp/>} />
          <Route path="/login" element= {<Login/>} />
      </Route>
    

   {/* auth se protect karo */}
      <Route element={<ProtectedRoutes/>}>  
         <Route path="/profile" element= {<Profile/>} />
         <Route path="/scan" element= {<Scan/>} />
          <Route path="/paymentGateway" element={<PaymentGateway/>}></Route>
      </Route>

        

        </Routes>
    </BrowserRouter>
    
    </UserContext>



    </>
  )
}

export default App

import { Button } from "@heroui/button";
import { useNavigate, NavLink } from "react-router-dom";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@heroui/react";
import axios from "axios";
import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';

function Navbar() {

    const [token, setToken] = useState(localStorage.getItem("token")); 


    const navigate=useNavigate()

    const Token=localStorage.getItem('token')

    

    
    useEffect(() => {
        setToken(localStorage.getItem("token")); 
      }, []);

    const handleLogout = async () => {
        try {
        await axios.post("http://localhost:3000/api/logout");
        localStorage.removeItem("token");
        console.log(token);      
       toast.success('Logged Out Succesfully')
        navigate('/')              
        } catch (error) {
          toast.error('Something went Wrong')
          console.error("Logout failed", error);

        }
      };



  return (
    <>


<Toaster
position="bottom-left"
  toastOptions={{
    success: {
      style: {
        color:'white',
        background: 'green',
      },
    },
    error: {
      style: {
        color: 'white',
        background: 'red',
      },
    },
  }}
/>

<motion.div    initial={{opacity:0}}
   animate={{opacity:1}}
   exit={{opacity:0}}
   transition={{duration:1.3}}>

        <div className="flex justify-between items-center px-[12vh] py-5 md:px-[4vh] sm:px-[1vh]">
           <div className="">
            <NavLink to='/' className="text-3xl font-semibold md:text-[3vh]">Scan <span className="text-3xl text-[#B2FD47]"> Cart </span></NavLink>
           </div>
 
        {
            Token?   <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src="https://media.istockphoto.com/id/1320815200/photo/wall-black-background-for-design-stone-black-texture-background.jpg?s=612x612&w=0&k=20&c=hqcH1pKLCLn_ZQ5vUPUfi3BOqMWoBzbk5-61Xq7UMsU="
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">

                <DropdownItem key="settings" onPress={()=>navigate('/profile')} >Profile</DropdownItem>
                <DropdownItem key="team_settings" onPress={()=>navigate('/scan')}>Orders</DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          
          </div> : 
     <div className="flex justify-center gap-3 md:gap-1">
     <Button className="" onPress={()=>navigate('/login')} >Login</Button>
    <Button className="bg-[#9FFD19]" onPress={()=>navigate('/signUp')}>Sign Up</Button>
    </div>
}
      

           
      </div>

      


      </motion.div>
        

    </>
  );
}

export default Navbar;

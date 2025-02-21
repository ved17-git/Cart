import {useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';



interface User{
  FirstName:string,
  LastName:string,
  email:string
  role:string
}


function Profile() {
const navigate=useNavigate()


const [user,setUser]=useState<User>()       
 
useEffect(() => { 
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data)
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUserData();
  }, []);



const handleLogout = async () => {
  try {
    await axios.post("http://localhost:3000/api/logout");
    localStorage.removeItem("token");
    toast.success('Logged Out Succesfully')
    navigate('/')               
    
  } catch (error) {
    toast.error('Something Went wrong')
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

    <motion.div    
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
transition={{duration:1.3}}>


<div className="bg-[#F9F9F9] w-fit mx-auto px-20 py-7 rounded-xl space-y-4 text-center">
<p>Name: {user?.FirstName} {user?.LastName}</p>
<p>Email: {user?.email}</p>
<p>Role: {user?.role}</p>
<Button className="bg-red-500 text-white" onPress={handleLogout}>Logout </Button>

</div>
      


  </motion.div>
</>
);
}

export default Profile;

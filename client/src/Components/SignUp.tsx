import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Form, Input, Button} from "@heroui/react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';


function SignUp() {

    
    const navigate=useNavigate()


    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const data = Object.fromEntries(new FormData(e.currentTarget));
  
      try {
        const response = await axios.post('http://localhost:3000/api/signUp', data);
      
        const token=response.data.token
        localStorage.setItem('token',token)
        if (response.status==200){
            toast.success('Account Created Succesfully')
            navigate('/')
         }
      } 
      
      catch (error) {
        toast.error('Email Already Exists')
        console.error('Error during signup:', error);
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

  <div className="mx-auto w-fit bg-[#F9F9F9] rounded-lg px-[10vh] py-10 relative top-[8vh]">  
      
      <h1 className="text-2xl font-semibold text-center">Welcome Back </h1>

    <Form className="w-full max-w-xs mt-10" validationBehavior="native" onSubmit={onSubmit} >
 
    <div className="flex gap-4">   
      <Input
        isRequired
        errorMessage="Enter First Name"
        label="FirstName"
        labelPlacement="outside"
        name="FirstName"
        placeholder="First Name"
        type="text"
      />

       <Input
        isRequired
        errorMessage="Enter First Name"
        label="LastName"
        labelPlacement="outside"
        name="LastName"
        placeholder="Last Name"
        type="text"
      />
     </div>
   
       <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />


       <Input
        isRequired
        errorMessage="Please enter Password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your Password"
        type="password"
      />



      <Button type="submit" variant="bordered" className="w-full bg-[#B2FD47] mt-5">
        Submit
      </Button>

      
    </Form>

    <div className="text-center mt-4 text-gray-400">
      Already have account? <button  onClick={()=>navigate('/login')} className="text-black">  Login </button> 
    </div>


  </div>


  </motion.div>
  
    </>

  );
}

export default SignUp;

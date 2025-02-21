import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";





function Home() {

const navigate=useNavigate()
const token=localStorage.getItem('token')

  return (
    <>
   
  
  <motion.div   
   initial={{opacity:0}}
   animate={{opacity:1}}
   exit={{opacity:0}}
   transition={{duration:1.3}}> 

    <div className="text-center mx-auto space-y-8 relative top-[18vh]" >
  
   <div className="text-xl bg-[#F0FFD4] w-fit mx-auto rounded-lg px-12 py-4"> 
   Trusted by Thousands Every Month    </div>
 


    <h1 className="text-5xl font-bold">Instant Product Lookup with Barcode Entry</h1> 

    <div className="text-gray-500">
    Skip the guesswork! Simply enter a product’s barcode, and instantly view all relevant details Whether you’re analyzing inventory or making a purchase, <br />get accurate insights in seconds.
    </div>

   {
     token? <Button className="bg-[#B2FD47]"  onPress={()=>navigate('/scan')} >Try it now </Button> : <Button className="bg-[#B2FD47]"  onPress={()=>navigate('/signUp')} >Get Started</Button>
   }
    
    


    </div>


    </motion.div>

    </>
  );
}

export default Home;

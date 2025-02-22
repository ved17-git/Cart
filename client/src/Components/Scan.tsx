import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerFooter 
} from "./ui/drawer";
import {Form, Input} from "@heroui/react";
import { ButtonShad } from "./ui/button";
import {Button} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


interface Products{
  name:string,
  price:number,
  barcode:string,
  image:string,
  quantity:number
}


interface ProductApiResponse {
  product: {
    title: string;
    images: string[];
    online_stores?: { price: string }[];
  };
}



function Scan() {

  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductApiResponse | null>(null);
  const [openDrawer,setOpenDrawer]=useState(false)
  const [postProduct,setPostProduct]=useState({})

  const [addCart,setaddCart]=useState([])
  const [showCart,setShowCart]=useState<Products[]>([])

  const [plusCart,setPlusCart]=useState()
  const [minusCart,setMinusCart]=useState()

  const [removeProduct, setRemoveProduct]=useState()
  




const navigate=useNavigate()

const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
setIsLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget)); 
    console.log(data);
    try {
      const options = {
        method: "GET",
        url: "https://barcodes-lookup.p.rapidapi.com/",
        params: { barcode: data.barcode }, 
        headers: {
          "x-rapidapi-key":"2f0ce65293msh16d264a262517a1p157d53jsn4fb6ef4954c6",
          "x-rapidapi-host": "barcodes-lookup.p.rapidapi.com",
        },
      };
      
      const response = await axios.request(options);
      console.log(response.data);
        if (response.data) {
          const Product:Products = {
          name: response.data.product.title || "Unknown Product",
          price: parseFloat(response.data.product.online_stores?.[0]?.price.replace(/[^0-9.]/g, "")) || 0,
          image: response.data.product.images?.[0] || "",
          quantity: 1,
          barcode: data.barcode as string
        };
        console.log(Product);
        setPostProduct(Product)
      }
      setProductData(response.data)
      
      

    } catch (error) {
      console.log(error,"Could not find the product");
    } 

  setIsLoading(false);
  setOpenDrawer(true)
}


useEffect(()=>{
  const getAllProducts=async()=>{
    const response= await axios.get('http://localhost:3000/api/allProducts')
    console.log(response.data);
    setShowCart(response.data.data)
  }
  getAllProducts()

},[addCart, plusCart, minusCart,removeProduct])

const handlePost=async()=>{
  const response= await axios.post('http://localhost:3000/api/addProduct', postProduct)
  console.log(response.data);
  setaddCart(response.data.data)
}


async function plusQuantity (barcode:string){
  const response=await axios.patch(`http://localhost:3000/api/quantityPlus/${barcode}`)
  console.log(response.data);
  setPlusCart(response.data)
}

async function minusQuantity(barcode:string){
  try {
  const response=await axios.patch(`http://localhost:3000/api/quantityMinus/${barcode}`)
  console.log(response.data);
  setMinusCart(response.data)

  } 
  catch (error) {
    toast.error('Error')
  console.log("something from minus quantity",error);  
  }

}


async function removeProductCart(barcode:string){
  const response=await axios.delete(`http://localhost:3000/api/${barcode}`)
  console.log(response.data);
  setRemoveProduct(response.data)
}


  return (<> 



<Toaster
position="bottom-left"
  toastOptions={{
    success: {
      style: {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className=""
    >

    
<Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="w-[50%] mx-auto md:w-full">
          <DrawerHeader>
            <DrawerTitle>Add to Cart</DrawerTitle>
            <DrawerDescription>Confirm product details</DrawerDescription>
             {productData ? (
        <div className= " space-y-6">
          <div className="w-[40%]"> 
          <img src={productData.product?.images?.[0]} alt='' className="w-full rounded-md" />
          </div>
          <div> 
            <p>{productData.product?.title}</p>
          <p className="text-lg font-semibold"></p>
          <p className="font-bold">Price: {productData.product?.online_stores?.[0]?.price ?? "Not Available"}</p>
          </div>
        </div>
      ) : (
        <p className="font-bold text-red-600">Could Not Find the Barcode, Try Different Barcode</p>
      )}
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose className="w-full">
              <ButtonShad className="w-full" onClick={handlePost}>
                Add to Cart
              </ButtonShad>
            </DrawerClose>
            <DrawerClose>
              <ButtonShad variant="outline">Cancel</ButtonShad>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      
      <div className="flex justify-center items-center md:px-[4vh] md:mt-8">
      <Form className="w-full max-w-xs" validationBehavior="native" onSubmit={onSubmit}>
      <Input
        isRequired 
        isDisabled={isLoading}
        errorMessage={({validationDetails, validationErrors}) => {
          if (validationDetails.typeMismatch) {
            return "Please enter a valid email address";
          }

          return validationErrors;
        }}
        label="Barcode"
        labelPlacement="outside"
        name="barcode"
        placeholder="Barcode"
        type="barcode"
      />
      <Button color="primary" className="w-full" isLoading={isLoading} type="submit">
        Find
      </Button>

    </Form>
      </div>




    <div className="flex w-full mt-10 px-[8vh] justify-between gap-10 md:flex-col sm:flex-col-reverse md:px-[3vh] sm:px-[1vh]">

       <div className="w-[80%] md:w-[100%] space-y-3">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

        {
          showCart ?  showCart.map((item,idx)=>(
            <div key={idx} className="flex">

              <div className="flex gap-10 items-center md:gap-2 ">
                <div className="w-[30%] p-4 md:w-[50%] sm:w-[80%] h-full" >
                <img src={item.image} alt="" className="w-full" />
                </div>
              

                <div>
                <p className="md:text-xs">{item.name}</p>
                <p className="font-bold">${item.price}</p>
                
                <div className="flex items-center gap-3 mt-5">
                  <button className="border-[1px] p-2 rounded-sm" onClick={()=>minusQuantity(item.barcode)}>-</button>
                   <p>{item.quantity}  </p>
                  <button className="border-[1px] p-2" onClick={()=>plusQuantity(item.barcode)}>+</button> 
              
                </div>

                <button className="text-red-600 mt-2" onClick={()=>removeProductCart(item.barcode)}>Remove</button>
                
                </div>
                
              </div>
                            
            </div>

          )) : <div>Loading...</div> 
        }
        
      </div>

  
  <div className="w-[20%] border-[2px] h-60 rounded-md flex flex-col justify-between py-5 px-5 md:w-full md:text-center">
   {
    showCart.length!==0 ? <div className="space-y-3">
    <p>Total ({showCart ? showCart.length  : <div>No items Scanned</div> } items)</p>
    <p>Delivery Charges: Free</p>
    <p>Total Amount:   {showCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
    </p>
   </div> :  <p>Add Products</p>
   }


   <ButtonShad onClick={()=>navigate('/paymentGateway')}> Proceed to Chekout</ButtonShad>
</div>
            
                   
          
</div>
     

  
</motion.div>



</>);
}
  

export default Scan;













// try {
//   const res= await axios.post('http://localhost:3000/api/addProduct',postProduct)
//   console.log(res);
// } catch (error) {
//   console.log(error, "could not post the products");
  
// }
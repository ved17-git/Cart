import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createProduct = async (req, res) => {
    try {
      const data=req.jwtPayload
      const { name, price, image, quantity, barcode } = req.body;
  
      const alreadyExists = await prisma.product.findUnique({
        where: {
          barcode: barcode,
        },
      });
  
      // If the product already exists, update the quantity
      if (alreadyExists) {
        const updatedQuantity = alreadyExists.quantity + 1; // Increment the quantity
        const updatedPrice = (alreadyExists.price / alreadyExists.quantity) * updatedQuantity; // Adjust price per item
        const product = await prisma.product.update({
          where: {
            barcode: barcode, // Find the product by barcode
          },
          data: {
            quantity: updatedQuantity,
            price: updatedPrice, 
          },
        });
  
        return res.status(200).json({
          message: "Product quantity updated",
          data: product,
        });
      }
  
      // If the product doesn't exist, create a new product
      const product = await prisma.product.create({
        data: {
          name: name,
          price: price * quantity,
          quantity: 1,
          barcode: barcode,
          image: image, // Assuming you're passing the image as well
          
          user:{
            connect:{
              id:data.id
            }
          }

        },
      });
  
      return res.status(200).json({
        message: "Product created",
        data: product,
      });
    } catch (error) {
      console.log("Product Creation Error");
      console.log(error);
      return res.status(400).json({
        message: "Product Creation Error",
      });
    }
  };
  



export const getProduct=async(req,res)=>{

 try {
    const barcode=req.params.barcode
    const product=await prisma.product.findUnique({
       where:{
           barcode:barcode
       }
    })
   
    if(!product){
       return res.status(400).json({
           message:"Could not Find the Product, Correct the Barcode",
       })
    }

    return res.status(200).json({
        message:"Product Found",
        data:product
    })
    
 } catch (error) {
    console.log("Get Product Error");
    console.log(error);
    return res.status(400).json({
        message:"Getting Product By barcode API Error "
    })  
 }
  
}

export const allProducts = async(req,res)=>{
try {

    const products=await prisma.product.findMany()
    res.status(200).json({
        message:"All products",
        data:products
    })
    
} catch (error) {
    console.log("Getting All Products Error");
    console.log(error);
    return res.status(400).json({
        message:"Getting ALL Products API Error "
    }) 
}
}


export const handlePlusQuantity = async (req, res) => {
  try {
    const { barcode } = req.params;

    const alreadyExists = await prisma.product.findUnique({
      where: { barcode },
    });

    if (!alreadyExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedQuantity = alreadyExists.quantity + 1;
    const updatedPrice = (alreadyExists.price / alreadyExists.quantity) * updatedQuantity;

    const product = await prisma.product.update({
      where: { barcode },
      data: {
        quantity: updatedQuantity,
        price: updatedPrice,
      },
    });

    return res.status(200).json({
      message: "Quantity increased",
      data: product,
    });
  } catch (error) {
    console.error("Error in handlePlusQuantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const handleMinusQuantity = async (req, res) => {
  try {
    const { barcode } = req.params;

    const alreadyExists = await prisma.product.findUnique({
      where: { barcode },
    });

    if (!alreadyExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (alreadyExists.quantity === 1) {
      return res.status(400).json({ message: "Cannot decrease quantity below 1" });
    }

    const updatedQuantity = alreadyExists.quantity - 1;
    const updatedPrice = (alreadyExists.price / alreadyExists.quantity) * updatedQuantity;

    const product = await prisma.product.update({
      where: { barcode },
      data: {
        quantity: updatedQuantity,
        price: updatedPrice,
      },
    });

    return res.status(200).json({
      message: "Quantity decreased",
      data: product,
    });
  } catch (error) {
    console.error("Error in handleMinusQuantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





export const deleteById = async (req, res) => {
  try {
    const { barcode } = req.params;

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { barcode },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await prisma.product.delete({
      where: { barcode },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteAllProducts=async(req,res)=>{

    try {

        const DeleteAllProducts=await prisma.product.deleteMany({})
        if(DeleteAllProducts){
            return res.json({
                message:"deleted all Products"
            })
        }
        
    } catch (error) {
        console.log("deleting All Products Error");
        console.log(error);
        return res.status(400).json({
            message:"deleting ALL Products API Error "
        }) 
    }
}
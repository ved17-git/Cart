import express from 'express'
import { getUsers, login, signUp,getUserProfile, logout,deleteUsers } from '../Controller/controller.js'
import { authMiddleware,checkAdmin } from '../middleware.js'
import { createProduct,getProduct, allProducts, deleteAllProducts, deleteById, handlePlusQuantity,handleMinusQuantity } from '../Controller/productController.js'


const router=express.Router()

router.post('/signUp', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile',authMiddleware, getUserProfile)
router.get('/users', authMiddleware, checkAdmin, getUsers)

// router.delete('/delete',deleteUsers) //FOR CLEARING THE DB


router.post('/addProduct', createProduct)
router.get('/allProducts', allProducts)
router.patch('/quantityPlus/:barcode', handlePlusQuantity)
router.patch('/quantityMinus/:barcode', handleMinusQuantity)

router.get('/:barcode',  getProduct)

// router.delete('/delete',deleteAllProducts) 

router.delete('/:barcode', deleteById)

//test 
router.get('/test/json', (req,res)=>{
    res.json({
        id:"1",
        FirstName:"abc",
        LastName:"pqr"
    })
})





export default router;


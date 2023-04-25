
const express=require('express')


const router= express.Router();
const authMiddleware=require('../../middleware/auth')
const signUpUserController=require('../../controllers/user/singnUpUserController');
const infoUserController=require('../../controllers/user/infoUserController');
const signInUserController= require('../../controllers/user/signInUserController');
const infoRequestUserController = require('../../controllers/user/infoRequestUserController');
const recoverPasswordUserLogController=require('../../controllers/user/recoverPasswordUserLogController');
const forgotPasswordController=require('../../controllers/user/forgotPasswordController');
const resetPasswordController=require('../../controllers/user/resetPasswordController');
const changePasswordUserController=require('../../controllers/user/changePasswordController');
const updateUserController=require('../../controllers/user/updateUserController');
const restoreUserController=require('../../controllers/user/restoreUserController')
const deleteUserController=require('../../controllers/user/deleteUserController')



router.post('/signUp',signUpUserController.signUp)
router.post('/signIn',signInUserController.signIn)

router.put('/restoreuser/:id',restoreUserController.restoreUser)
router.delete('/deleteuser/:id',deleteUserController.deleteUser)

router.put('/recoverPassword/:id',recoverPasswordUserLogController.recoverPasswordUserLog)
router.get('/info',infoUserController.infoUser)
router.get('/infoRequestUser/',infoRequestUserController.infoRequestUser)
router.post('/forgot-password',forgotPasswordController.forgotPassword)
router.get('/reset-password',resetPasswordController.resetPassword)
router.post('/changePassword',changePasswordUserController.changePasswordUser)
router.put('/UpdateUser/:id',updateUserController.updateUser)

module.exports=router
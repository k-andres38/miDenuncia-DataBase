const modelsUser=require("../../models").user;

exports.deleteUser=async(req,res)=>{

    try {
        await modelsUser.findByPk(req.params.id).then(user=>{
            if(!user){
                res.status(400).json({message: "User no existe"})

            }else{
                user.destroy()
                res.status(200).json({message: "User deleted"})
            }
          
        })
        
    } catch (error) {
        res.status(500).json({message:"servidor fallo",error})
        
    }

}
const modelsuser=require("../../models").user
const modelsRole=require("../../models").role

exports.infoUserRol=async(req,res)=>{


    try {
        
        await modelsuser.findAll({
            
            where:{role_id:req.params.rol}
        }).then(user=>{
            if(!user){
                return res.status(401).json({message: "User no encontrado."});
            }else{
               
                res.status(200).json(user)
                
        }})

    } catch (error) {
        res.status(500).json({message:error})
        
    }


}
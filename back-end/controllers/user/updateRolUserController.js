const modelsuser=require("../../models").user

exports.rolUser=async(req,res)=>{


    try {
        
        await modelsuser.findByPk(req.params.user).then(user=>{
            if(!user){
                return res.status(401).json({message: "User no encontrado."});
            }else{
                user.update({where: {rol_id: req.params.rol}}).then(user=>{
                    res.status(200).json({message:'cambio de rol exitoso'})
                })
            }
        })

    } catch (error) {
        res.status(500).json({message:error})
        
    }


}
const modelsRole=require("../../models").role

exports.infoRoles=async(req,res)=>{


    try {
        await modelsRole.findAll({
            attributes: ["id", "name"]
        }).then(rol=>{
            res.status(200).json(rol)
        }).catch(err=>  {
            res.status(400).json({message:err})
        });

        
    } catch (error) {
        
    }


}
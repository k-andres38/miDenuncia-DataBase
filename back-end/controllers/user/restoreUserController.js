const modelsUser=require("../../models").user;

exports.restoreUser=async(req,res)=>{

    try {
      
           
       await modelsUser.restore({where: {id:req.params.id }}).then(user=>{
        console.log(user)
        res.status(200).json({message:"user restaurado con éxito"})
       }).catch(err=>res.status(400).json({message:err.message}))
                
                   
                
               
              
           
      
        
    } catch (error) {
        
    }

}
const modelRatings= require('../../models').rating
const modelsUser= require('../../models').user

exports.rating=async(req,res)=>{

    let {score,suggestion,user_id}=req.body

    try {
      
       await modelsUser.findByPk(req.params.id)
       .then(user=>{
            modelRatings.create({
                score,
                suggestion,
                user_id:user.id
            }).then(response=>{
                res.status(201).json({message:'success'})
            }).catch(msg=>{res.status(401).json({message:'no se pudo',msg})

        })
        
        
         }).catch(msg=>{res.status(401).json({message:'no se pudo',msg})})
    }catch( error) {
        res.status(500).json({message:error})
        
      
        
    }

}



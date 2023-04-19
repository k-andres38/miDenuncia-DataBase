const { errorMonitor } = require('connect-mongo');

const modelsSupports = require('../../models').support;
const modelsUser= require('../../models').user;
const modelsRequest=require('../../models').request;

exports.support=async(req,res)=>{

    try {
        const user= await modelsUser.findByPk(req.query.user);
        const request= await modelsRequest.findByPk(req.query.request);

        if(user && request){
            await modelsSupports.findOne({where:{request_id:req.query.request,user_id:req.query.user}})
            .then(info=>{
               
               if(info){
                info.destroy()
                res.status(201).json({message:'destroy'})
              
               }else{
              //  console.log(info)
                modelsSupports.create({request_id:req.query.request,user_id:req.query.user}).then(support =>{
                    res.status(201).json({message:'Success'})
                    
                }).catch(error=>{
                    res.status(400).json({message:error})
                })
              
               }
            })
            
        }else{

            res.status(404).json({message:'user o request Not Found'})

        }

       
        
        
    } catch (error) {
        res.status(500).json({message:error})
        
    }

}
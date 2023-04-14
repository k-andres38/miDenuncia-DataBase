const modelsRequest = require('../../models').request;

exports.count = async (req,res,next)=>{
    try {
       const count =await modelsRequest.max('id');
       res.status(202).json({count})
    } catch (error) {
        res.send(error)
    }
}
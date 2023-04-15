const modelsTypeReport = require('../../models').types_report; // --> creado por farit

exports.inforeport = async(req,res,next)=>{
    try{
        await modelsTypeReport.findAll({
            attributes:[
                "id",
                "name"
            ]
        })
        .then(typeReports =>{
            res.status(200).json({message: typeReports})
        })
        .catch(err =>{
            res
            .status(400)
            .json({ message:err});
        });

    }catch(error){
        res.json(error)
    }
}



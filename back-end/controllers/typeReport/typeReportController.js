const modelsTypeReport = require('../../models').types_report; // --> creado por farit

exports.typeReport = async(req,res,next)=>{
    try{
        let {name} = req.body;

        await modelsTypeReport.create({name})
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


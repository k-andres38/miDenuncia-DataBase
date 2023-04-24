
const modelUser=require('../../models').user

exports.updateUser=async(req,res)=>{

    try{

        const user= await modelUser.findByPk(req.params.id)

        //const {nickname,name, last_name, password }=req.body

        if (!user) {

            res.json({
                mensaje: "El user no existe"
            })

            return
        }

        await modelUser.update(req.body, {

            where: {
                id: req.params.id
            }

        })


        res.json({
            mensaje: "usuario actualizado"
        })






    }

    catch(error){


        res.send(error)

    }



}
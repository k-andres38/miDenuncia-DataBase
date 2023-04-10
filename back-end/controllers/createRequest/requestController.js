const { request } = require('express');
const { find, findOne } = require('../../modeloMongo/sessionMongodb');
const modelsTypeRequest = require('../../models').types_request;
const modelsDocument = require('../../models').document;
const modelsUser = require('../../models').user;
const modelsRequest = require('../../models').request;
const modelsPhoto = require('../../models').photo;

exports.request = async (req, res, next) => {

    try {
        let { name,
            type,
            number_document,
            place_dispatch,
            address,
            contact_phone,
            location,
            neighborhood, 
            subject, 
            problem, 
            solution, 
            url, 
            type_request_id } = req.body;


        await modelsUser.findByPk(req.params.id).then(user => {

            modelsTypeRequest.create({ name })

            modelsDocument.create({ id: number_document, type, place_dispatch })

            user.update({ where: { address, contact_phone, document_id: number_document }, address, contact_phone, document_id: number_document })

            modelsRequest.create({ location, neighborhood, subject, problem, solution, type_request_id, user_id:req.params.id})

            const requesPhotos = modelsRequest.findOne({where:{user_id:req.params.id}})
            if(requesPhotos){
                modelsPhoto.create({
                    url,
                    request_id:requesPhotos.id,
                    

                })
            }



            modelsPhoto.create({ url,  })
            res.status(200).json({ user })
        }).catch(error => {
            res.status(400).json({ message: 'no se pudo completrar la soliciud' })
        })


    } catch (error) {
        res.send(error)
    }
}
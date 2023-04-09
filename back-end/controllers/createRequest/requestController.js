const { request } = require('express');
const modelsTypeRequest = require('../../models').types_request;
const modelsDocument = require('../../models').document;
const modelsUser = require('../../models').user;
const modelsRequest = require('../../models').request;
const modelsPhoto = require('../../models').photo;

exports.request = async (req, res, next) => {

    try {
        let { name, type, number_document, place_dispatch, address, contact_phone, location, neighborhood, subject, problem, solution, url, document_id} = req.body;
    /*  await models.create({ name, type, number_document, place_dispatch, address, contact_phone, location, neighborhood, subject, problem, solution, url })
            .then(request => {
                res.status(200).json({message: request})
            }).catch(error => {
                res.status(500).json({message: error});
            }) */
        // await modelsTypeRequest.create({ name }).then(() => {
        //     modelsDocument.create({ type, number_document, place_dispatch })
        //     // modelsUser.update({ address, contact_phone })
        //     modelsRequest.create({ location, neighborhood, subject, problem, solution })
        //     modelsPhoto.create({ url })
        // }).catch(error => {
        //     res.json({ message: error.message })
        // })
       // console.log(req.params.id)

        await modelsUser.findByPk(req.params.id).then(user => {
            
            modelsTypeRequest.create({ name })

            modelsDocument.create({id:number_document, type, place_dispatch })

            user.update({where:{ address, contact_phone, document_id:number_document }, address, contact_phone, document_id:number_document })

            modelsRequest.create({ location, neighborhood, subject, problem, solution })

            modelsPhoto.create({ url })
        })

        /* --> Actualizacion de documento usuario
        const updateDocument = await modelsUser.findByPk(req.params.id);
        updateDocument.update({document_id})
        */
    } catch (error) {
        res.send(error)
    }
}
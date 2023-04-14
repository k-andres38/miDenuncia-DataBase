const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

const modelsComment = require("../../models").comment;

const modelsTypeRequest = require("../../models").types_request;

const modelsPhoto = require("../../models").photo;

exports.infoRequestUser = async (req, res, next) => {
  try {

    await modelsRequest.findAll(
      {attributes: [
                "id",
                "location",
                "neighborhood",
                "subject",
                "problem",
                "solution",
                "support",
                "status",
                "tag",
               
               
              ],
        include: [{
          model: modelsTypeRequest,
          attributes: ["id", "name"]
        },{
          model: modelUser,
          attributes: ["id", "nickname","name",]
        },{
          model: modelsComment,
          attributes: ["id", "description"]
        }, {
          model: modelsPhoto,
          attributes: ["id", "url"]
        }, 
        
        ]
      }

    ).then(news => {
      res.status(200).json({news})
     // console.log(publicaciones);
    });


    // await modelsRequest
    //   .findByPk(
    //     req.params.id,
        
    //         {
    //       attributes: [
    //         "id",
    //         "location",
    //         "neighborhood",
    //         "subject",
    //         "problem",
    //         "solution",
    //         "support",
    //         "status",
    //         "tag",
           
           
    //       ],
      
    //      include:[{model:modelsTypeRequest,  attributes: ["id", "name"]},{model:modelUser, attributes: ["id", "nickname","name","last_name","staff_neighborhood"]}]}
    //   )
    //   .then((request) => {
    //     if (!request) {
    //       res.status(400).json({ message: 'post eliminado' });
    //        return 
    //     }
       
    //     modelsComment
    //       .findAll(
    //         { attributes: ["id", "description"] ,
          
    //          where: { request_id: req.params.id } },
          
    //       )
    //       .then((comment) => {
    //         modelsPhoto
    //           .findAll(
    //             { attributes: ["id", "url"] ,
    //              where: { request_id: req.params.id } }
    //           )

    //           .then((photo) => {
    //             res
    //               .status(200)
    //               .json({ news: { request, comment, photo }} );
    //               //return
    //           });
    //       });

    
    //   })
    //   .catch((err) => {
    //     res.status(400).json({ message: err.message });
    //   });

  } catch (error) {
    res.status(500).json({message:error});
  }
};

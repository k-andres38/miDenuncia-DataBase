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
               include: [modelsTypeRequest,modelUser,{
          model: modelsComment,
          attributes: ["id", "description"]
        }, {
          model: modelsPhoto,
          attributes: ["id", "url"]
        }, 

      //  {
      //   include:[
      //     {modelsTypeRequest,
      //       attributes: ["id", "name"]}
      //   ,
      //  {   model: modelUser,
      //   attributes: ["id", "nickname","name",]}
      //   ]
      //  }
    ]
        
        
        // include: [{
        //   model: modelsTypeRequest,
        //   attributes: ["id", "name"]
        // },{
        //   model: modelUser,
        //   attributes: ["id", "nickname","name",]
        // },{
        //   model: modelsComment,
        //   attributes: ["id", "description"]
        // }, {
        //   model: modelsPhoto,
        //   attributes: ["id", "url"]
        // }, 
        
        // ]
      }

    ).then(news => {
      res.status(200).json({news})
     // console.log(publicaciones);
    });



  } catch (error) {
    res.status(500).json({message:error});
  }
};

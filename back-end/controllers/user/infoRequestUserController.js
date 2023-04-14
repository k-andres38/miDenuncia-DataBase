const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

const modelsComment = require("../../models").comment;

const modelsTypeRequest = require("../../models").types_request;

const modelsPhoto = require("../../models").photo;

exports.infoRequestUser = async (req, res, next) => {
  try {
    //const [offset,limit]=req.query
   // console.log(limit)

    await modelsRequest.findAll( 
      {
     // limit: limit,  offset:0,
        attributes: [
                "id",
                "location",
                "neighborhood",
                "subject",
                "problem",
                "solution",
                "support",
                "status",
                "tag",
                "createdAt"
                
               
               
              ],
        include: [{
          model: modelsTypeRequest,
          attributes: ["id", "name"]
        },{
          model: modelUser,
          attributes: ["id", "nickname","name",]
        },{
          model: modelsComment,
         attributes: ["id", "description"],
            include:[{model:modelUser,attributes: ["id", "nickname","name"]}]
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



  } catch (error) {
    res.status(500).json({message:error});
  }
};

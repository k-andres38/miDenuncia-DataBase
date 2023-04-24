const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

const modelsComment = require("../../models").comment;

const modelsTypeRequest = require("../../models").types_request;

const modelsSupport = require("../../models").support;

const modelsPhoto = require("../../models").photo;
const Sequelize = require("sequelize");


exports.infoRequest = async(req,res,next)=>{
    try {
     
        await modelUser.findByPk(req.params.id).then((user)=>{
            modelsRequest
            .findAll({

                where:{user_id:user.id},
              
              order: [["id", "DESC"]],
              attributes: [
                "id",
                "location",
                "neighborhood",
                "subject",
                "problem",
                "solution",
               
                "status",
                "tag",
                "createdAt",
               
                [
                  Sequelize.literal(
                    `(SELECT COUNT(*) FROM comments WHERE comments.request_id = request.id AND comments.deletedAt IS NULL)`
                  ),
                  "comment_count",
                ],[
                  Sequelize.literal(
                    `(SELECT COUNT(*) FROM supports WHERE supports.request_id = request.id)`
                  ),
                  "support",
                ],
              ],
      
              include: [
                {
                  model: modelsTypeRequest,
                  attributes: ["id", "name"],
                },
                {
                  model: modelUser,
                  attributes: ["id", "nickname", "name"],
                },
                {
                  model: modelsComment,
                  attributes: ["id", "description"],
                  include: [
                    { model: modelUser, attributes: ["id", "nickname", "name"] },
                  ],
                },
                {
                  model: modelsPhoto,
                  attributes: ["id", "url"],
                },
              ],
            })
            .then((requestUser) => {
              res.status(200).json( {requestUser} );
              // console.log(publicaciones);
            });
        }).catch((err)=> next(err));
        
    } catch (error) {
        res.send(error)
    }
}
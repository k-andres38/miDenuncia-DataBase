const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

const modelsComment = require("../../models").comment;

const modelsTypeRequest = require("../../models").types_request;

const modelsSupport = require("../../models").support;

const modelsPhoto = require("../../models").photo;
const Sequelize = require("sequelize");

exports.infoRequestUser = async (req, res, next) => {
  try {
  //   //const [offset,limit]=req.query
  //   // console.log(limit)

    let currentPage = parseInt( req.query.offset) || 0;
    let limit = parseInt( req.query.limit) || 1000;
    let offset = currentPage * 5;

      await modelsRequest
      .findAll({
        // limit: 5,
        // offset: 0,
         limit,
        offset,
        
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
      .then((news) => {
        res.status(200).json({ news });
        // console.log(publicaciones);
      });

    //}

  
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

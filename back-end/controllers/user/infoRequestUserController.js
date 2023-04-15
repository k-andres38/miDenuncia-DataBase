const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

const modelsComment = require("../../models").comment;

const modelsTypeRequest = require("../../models").types_request;

const modelsPhoto = require("../../models").photo;
const Sequelize = require("sequelize");

exports.infoRequestUser = async (req, res, next) => {
  try {
    //const [offset,limit]=req.query
    // console.log(limit)

    const currentPage = req.query.page || 1;
    const offset = (currentPage  ) * 5;

    await modelsRequest
      .findAll({
        // limit: 5,
        // offset: 0,
        offset,
        limit: 5,
        order: [["createdAt", "DESC"]],
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
          "createdAt",
         
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM comments WHERE comments.request_id = request.id AND comments.deletedAt IS NULL)`
            ),
            "comment_count",
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

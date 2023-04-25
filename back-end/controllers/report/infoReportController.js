const modelsReport = require("../../models").report;
const modelstypeReport = require("../../models").types_report;
const modelsRequest = require("../../models").request;
const modelsUser = require("../../models").user;

const Sequelize = require("sequelize");

exports.inforeport = async (req, res) => {
  try {
    await modelsReport
      .findAll({
        attributes: ["id", "description", "status"],
        include: [
          {
            model: modelstypeReport,
            attributes: ["id", "name"],
          },
          {
            model: modelsRequest,
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
              ],
              [
                Sequelize.literal(
                  `(SELECT COUNT(*) FROM supports WHERE supports.request_id = request.id)`
                ),
                "support",
              ],
            ],
          },
          {
            model: modelsUser,
            attributes: [
              "id",
              "name",
              "last_name",
              "email",
              "contact_phone",
       
            ],
          },
       
        ],
      })
      .then((report) => {
        if (!report) {
          return res.status(404).json({ message: "no hay report" });
        } else {
          res.status(200).json(report);
        }
      });
  } catch (error) {}
};

let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, db) => {
  let bearer = req.headers["authorization"];
  if (bearer !== "undefined" && bearer != null) {
    bearer = bearer.split(" ");
    bearer = bearer[1];
    try {
      const decoded = await jwt.verify(bearer, "secretkey");
      req.token = bearer;
      res.userId = decoded.userId;
      res.method = req.method;
      res.url = req.url;
      const result = await getLoggedInUser({ ...decoded, db });
      return { statusCode: 200, status: true, err: null, result, decoded };
    } catch (err) {
      return { statusCode: 401, status: false, err, result: false };
    }
  } else {
    return {
      statusCode: 401,
      status: false,
      err: "Token missing",
      result: false,
    };
  }
};

const getLoggedInUser = async ({ userId, db }) => {
  const { users, roles, sequelize } = db;
  try {
    const response = await sequelize.query(
      `
        SELECT
            u.name as userName, r.name as roleName, r.is_superadmin
        FROM
            users as u
        LEFT JOIN
            roles as r
            ON
            u.role_id = r.id
        WHERE
            u.id = ${userId}
    `,
      { logging: false }
    );
    return Array.isArray(response) && response.length && !!response[0]
      ? response[0] && Array.isArray(response[0]) && response[0].length
        ? response[0][0]
        : response[0]
      : false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

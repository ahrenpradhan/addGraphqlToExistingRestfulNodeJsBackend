const { Op } = require("sequelize");
const parseFields = require("graphql-parse-fields");
const merge = require("lodash/merge");

const columnsToIncludeInSqlCall = ["id", "role_id"];

const findAllResolver = async (
  parent,
  args,
  { db },
  info,
  dbName = null,
  whereFromParent = {}
) => {
  if (!dbName) {
    return "Table is not configured";
  }
  const columnsInTable = Object.keys(db[dbName].rawAttributes);
  const requireFields = [
    ...new Set(
      [...Object.keys(parseFields(info)), ...columnsToIncludeInSqlCall].filter(
        (_) => columnsInTable.includes(_)
      )
    ),
  ];
  // const requireFields = Object.keys(parseFields(info));
  let whereConditions = { ...whereFromParent };
  if ("where" in args && typeof args.where === "object") {
    for (const [key, value] of Object.entries(args.where)) {
      whereConditions[key] = {
        [Op.like]: value,
      };
    }
  }
  return await db[dbName].findAll({
    attributes: requireFields,
    where: whereConditions,
  });
};

const findOneResolver = async (
  parent,
  args,
  { db },
  info,
  dbName = null,
  whereFromParent = {}
) => {
  if (!dbName) {
    return "Table is not configured";
  }
  const columnsInTable = Object.keys(db[dbName].rawAttributes);
  const requireFields = [
    ...new Set(
      [...Object.keys(parseFields(info)), ...columnsToIncludeInSqlCall].filter(
        (_) => columnsInTable.includes(_)
      )
    ),
  ];
  const whereConditions = {
    ...whereFromParent,
    ...("where" in args && typeof args.where === "object" ? args.where : {}),
  };
  return Object.keys(whereConditions).length
    ? await db[dbName].findOne({
        attributes: requireFields,
        where: whereConditions,
      })
    : { dataValues: { error: "Atleast one argument required" } };
};

module.exports = { findAllResolver, findOneResolver };

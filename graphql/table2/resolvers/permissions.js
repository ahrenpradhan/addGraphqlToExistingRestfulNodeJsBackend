const { findAllResolver } = require("../../../sequelize/helper/resolvers");

const resolvers = {
  Query: {
    permissions: async (parent, args, context, info) => {
      try {
        return await findAllResolver(
          parent,
          args,
          context,
          info,
          "permissions"
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;

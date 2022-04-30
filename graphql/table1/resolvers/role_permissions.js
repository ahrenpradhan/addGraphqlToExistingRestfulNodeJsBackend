const { findAllResolver } = require("../../../sequelize/helper/resolvers");

const resolvers = {
  Query: {
    hello: () => "Hello ahren world!",
    role_permissions: async (parent, args, context, info) => {
      try {
        return await findAllResolver(
          parent,
          args,
          context,
          info,
          "role_permissions"
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;

const {
  findAllResolver,
  findOneResolver,
} = require("../../../sequelize/helper/resolvers");

const resolvers = {
  Query: {
    hello: () => "Hello ahren world!",
    users: async (parent, args, context, info) => {
      try {
        return await findAllResolver(parent, args, context, info, "users");
      } catch (err) {
        console.log(err);
      }
    },
    user: async (parent, args, context, info) => {
      try {
        const response = await findOneResolver(
          parent,
          args,
          context,
          info,
          "users"
        );
        return response;
      } catch (err) {
        console.log(err);
      }
    },
  },
  User: {
    role: async (parent, args, context, info) => {
      try {
        if (!parent.dataValues.role_id) {
          throw new "role_id absent";
        }
        const response = await findOneResolver(
          parent,
          args,
          context,
          info,
          "roles",
          {
            id: parent.dataValues.role_id,
          }
        );
        return response;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
